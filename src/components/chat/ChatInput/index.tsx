import React, { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-av';
import { View, TextInput, DimensionValue, Platform, ActivityIndicator, FlatList, Alert } from "react-native"
import { Button, Icon, Image, Slider, Text } from '@rneui/themed';
import { sizes } from "../../../styles/variables/measures";
import { ChatInputProps } from "../../../types/chat";
import colors from '../../../styles/variables/colors';
import { styles } from './styles';
import { useStopWatch } from '../../../functions/hooks';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SaveFormat, manipulateAsync } from "expo-image-manipulator";
import ConfirmationOverlay from '../../user/ConfirmationOverlay';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


interface AudioFileT {
    id: number;
    userId: number | string;
    audioUrl: string;
    duration: number;
    created_at?: Date;
}

const ChatInput = ({
    onSend,
    inputValue,
    setInputValue,
    messageType,
    setMessageType,
    audio,
    setAudio,
    imageUrls,
    audioRef

}: ChatInputProps) => {
    const baseUrl = process.env.SERVER_URL

    const {
        startStopWatch,
        stopStopWatch,
        resetStopWatch,
        startCountdown,
        pauseCountdown,
        resetCountdown,
        timeElapsed
    } = useStopWatch();
    const user = useSelector((state: RootState) => state.user);

    const { primary, secondary, secondaryFont, tertiary, danger } = colors
    const inputRef = useRef<TextInput | null>(null);
    const [recording, setRecording] = useState<Audio.Recording | undefined>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState<{ soundObject: Audio.Sound | undefined, duration: number }>({
        soundObject: undefined,
        duration: 0
    });
    const [deleteSound, setDeleteSound] = useState(1)
    const [sendSound, setSendSound] = useState(0)
    const [progress, setProgress] = useState(0)

    const [visible, setVisible] = useState(false);
    const [images, setImages] = useState<any[] | null>(null);
    // const [imageUrls, setImageUrls] = useState<string[] | null>(null);
    const [deleteImages, setDeleteImages] = useState(1)
    const [sendImages, setSendImages] = useState(0)
    let manipulatedImages: any[] = [];
    const [manipulatingImages, setManipulatingImages] = useState(false)

    const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
            selectionLimit: 6,

        });


        if (!result.canceled) {
            setManipulatingImages(true)
            setMessageType('image')
            if (result.assets && result.assets.length > 0) {
                console.log({ len: result.assets.length })
                setVisible(true)
                for (let i = 0; i < result.assets.length && i < 6; i++) {
                    const asset = result.assets[i];
                    const manipResult = await manipulateAsync(
                        asset.uri,
                        [{ resize: { width: 360 } }],
                        { compress: 1, format: SaveFormat.WEBP }
                    );
                    manipulatedImages.push(manipResult);

                }
                setImages(manipulatedImages);
                if (result.assets && result.assets.length > 6) {
                    setConfirmationOverlayVisible(true)
                }
            }
        }
        setManipulatingImages(false)

    };




    const randomWidth = useSharedValue(0);

    const config = {
        duration: 500,
        easing: Easing.linear,
    };

    const testStyle = useAnimatedStyle(() => {
        return {
            //   width: withTiming(randomWidth.value, config),
            flexBasis: withTiming(`${progress}%`, config) as DimensionValue,
            justifyContent: 'flex-start',
            backgroundColor: secondaryFont,
            height: 8,
        };
    });


    const handleSend = async () => {
        if (inputValue.trim() !== "") {
            onSend();
            setInputValue("");
            inputRef.current?.focus();

        }
    };

    async function startRecording() {
        try {
            if (permissionResponse && permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }


    async function stopRecording() {
        console.log('Stopping recording..');
        if (recording) {
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const status = await recording.getStatusAsync()
            // const pcmData = status.isLoaded ? status.data : null;

            // Create a new sound instance from the recorded URI
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: recording.getURI()! },
                {
                    shouldPlay: false,
                    // progressUpdateIntervalMillis: 100
                }
            );
            setMessageType('audio')



            console.log('Recording stopped and stored at', recording.getURI(), newSound);

            setSound({
                soundObject: newSound,
                duration: status.durationMillis as number
            });
        }
    }

    async function playSound() {
        console.log('Sound:', sound);

        try {
            if (sound.soundObject && sound.duration) {
                const asyncStatus = await sound.soundObject.getStatusAsync()
                console.log({ asyncStatus })

                await sound.soundObject.playAsync();
                console.log('Playing Sound', sound);

                let prevDuration: number | null = null;
                let prevPosition: number | null = null;

                sound.soundObject.setOnPlaybackStatusUpdate(async (status: any) => {

                    const position = status.positionMillis;


                    // if (position !== prevPosition) {
                    setProgress((position / sound.duration) * 100)
                    randomWidth.value = (position / sound.duration) * 100


                    prevPosition = position;
                    // }
                });



            } else if (recording) {
                console.log('Recording Sound still in progress');

            }
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }


    useEffect(() => {
        return () => {
            if (sound.soundObject instanceof Audio.Sound) {
                console.log('Unloading Sound');
                sound.soundObject.unloadAsync();
            }
        };
    }, [sound.soundObject]);




    const sendImagesToBackend = async (images: any[]) => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token');

        try {
            const formData = new FormData();
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const currentDate = new Date();
                const timestamp = currentDate.getTime();
                const filename = `image${i}_u${user.id}_${timestamp}.webp`
                if (Platform.OS === 'web') {
                    // For web, use fetch directly
                    const response = await fetch(image.uri);
                    const imgBlob = await response.blob();
                    formData.append(`images`, imgBlob, filename);
                } else {
                    // For native, use Expo FileSystem
                    const downloadResult = await FileSystem.downloadAsync(
                        image.uri,
                        FileSystem.documentDirectory + 'image.webp'
                    );

                    if (downloadResult.status === 200) {
                        const imgBlob = await fetch(downloadResult.uri).then((response) => response.blob());
                        formData.append(`images`, imgBlob, filename);
                    } else {
                        console.error('Failed to download image file');
                        return;
                    }
                }
            }

            const backendApiUrl = `${baseUrl}/api/chat/imageFile`;
            const response = await fetch(backendApiUrl, {
                method: 'POST',
                headers: {
                    Authorization: JSON.parse(accessToken!),
                },
                body: formData,
            });

            const data = await response.json()
            console.log({ data })
            imageUrls.current = data.imageUrls

            if (response.ok) {
                console.log('Images successfully uploaded to the backend');
            } else {
                console.error('Failed to upload images to the backend');
            }
        } catch (error) {
            console.error('Error while uploading images:', error);
        } finally {
            onSend()
            setImages(null)
            setSendImages(0)
        }
    };


    const sendAudioToBackend = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')

        if (sound.soundObject) {
            try {
                const status = await sound.soundObject.getStatusAsync();

                let audioBlob;

                if (Platform.OS === 'web') {
                    // For web, use fetch directly
                    // @ts-ignore
                    const response = await fetch(status.uri);
                    audioBlob = await response.blob();
                } else {
                    // For native, use Expo FileSystem
                    const downloadResult = await FileSystem.downloadAsync(
                        // @ts-ignore
                        status.uri,
                        FileSystem.documentDirectory + 'audiofile.wav'
                    );

                    if (downloadResult.status === 200) {
                        audioBlob = await fetch(downloadResult.uri).then((response) => response.blob());

                    } else {
                        console.error('Failed to download audio file');
                        return;
                    }
                }


                const formData = new FormData();
                formData.append('audio', audioBlob, 'audiofile.wav');
                // @ts-ignore
                // formData.append('audio', audioBlob, status.uri.split('/').pop()); // Use original file name
                const backendApiUrl = `${baseUrl}/api/chat/audioFile`;
                const response = await fetch(backendApiUrl, {
                    method: 'POST',
                    headers: {
                        // Multer middleware in the backend will not work if the 'Content-Type' header is set explicitly
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': JSON.parse(accessToken!),
                    },
                    body: formData,
                });
                const data = await response.json()
                setAudio(prev => prev = {
                    url: data.audioFileUrl,
                    duration: sound.duration
                })
                audioRef.current = {
                    url: data.audioFileUrl,
                    duration: sound.duration
                }

                if (response.ok) {

                    console.log('Audio file successfully sent to the backend');
                } else {
                    console.error('Failed to send audio file to the backend');
                }
            } catch (error) {
                console.error('Error while processing audio file:', error);
            } finally {
                onSend()
                setSendSound(0)
                setSound({
                    soundObject: undefined,
                    duration: 0
                })
                setMessageType(null)
            }
        } else {
            console.error('No audio file available to send');
        }
    };



    return (
        <View>
            {confirmationOverlayVisible && <ConfirmationOverlay
                warning={`You can send maximum 6 images at the time`}
                isVisible={confirmationOverlayVisible}
                onBackdropPress={() => setConfirmationOverlayVisible(false)}
                onConfirm={() => setConfirmationOverlayVisible(false)}
                // onCancel={() => {
                //     setConfirmationOverlayVisible(false);
                //     setInputError(undefined);
                //     setConfirmationInput('');
                // }}
                consfirmButtonTitle='OK'
            />

            }
            {recording && (
                <Icon
                    // type='outline'
                    name={recording ? 'stop' : 'mic'}
                    size={sizes.M}
                    color={recording ? danger : secondaryFont}
                    containerStyle={{
                        margin: 'auto',
                        marginVertical: sizes.S,
                        justifyContent: 'center',
                        padding: sizes.XS,
                        backgroundColor: secondary,
                        width: sizes.L,
                        height: sizes.L,
                        borderRadius: sizes.M,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: danger

                    }}
                    onPress={recording ? stopRecording : startRecording}
                />
            )
            }
            {sound.soundObject &&
                <View style={{
                    margin: 'auto',
                    marginVertical: sizes.S,
                    padding: sizes.XS,
                    backgroundColor: 'transparent',
                    width: sizes.XXL,
                    borderRadius: sizes.S

                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: sizes.XS,
                        alignItems: 'center'

                    }}>
                        <Icon
                            name='play'
                            type="font-awesome"
                            size={15}
                            color={secondaryFont}
                            iconStyle={{
                                top: 8, left: 1
                            }}
                            containerStyle={[styles.buttonContainer, { marginHorizontal: sizes.S, width: sizes.M, height: sizes.M, borderRadius: sizes.S, backgroundColor: secondary }]}
                            onPress={() => playSound()}
                        />






                        <View style={[styles.container, { paddingHorizontal: 0, flex: 1, justifyContent: 'flex-start', marginRight: sizes.S }]}>

                            <View
                                style={{ position: 'absolute', backgroundColor: secondary, top: 0, right: 0, bottom: 0, left: 0, }}>
                                {/* <Text>
{sound.duration.toString()}
</Text> */}
                            </View>

                            <Animated.View
                                style={testStyle}
                            >
                                {/* <Text>
audioCountdown {progress}
</Text> */}
                            </Animated.View>
                        </View>




                        {/* <Slider
                            value={progress}
                            // onValueChange={setValue}
                            style={{
                                flex: 1,
                                marginRight: sizes.S
                            }}
                            maximumValue={100}
                            minimumValue={0}
                            step={1}
                            allowTouchTrack
                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            thumbStyle={{ height: 10, width: 10, backgroundColor: 'red' }}
                        /> */}

                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: sizes.S
                        }}>

                        <Slider
                            value={deleteSound}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={danger}
                            maximumValue={1}
                            minimumTrackTintColor={secondary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (deleteSound === 0) {
                                    setSound({
                                        soundObject: undefined,
                                        duration: 0
                                    })
                                    setSendSound(0)
                                } else {
                                    setDeleteSound(1)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setDeleteSound(value)
                            }
                            orientation="horizontal"
                            step={0}
                            style={{ width: 96 }}
                            thumbStyle={{
                                height: 32,
                                width: 40,
                                borderRadius: 8,
                                borderColor: danger,
                                borderStyle: 'solid',
                                borderWidth: 1
                            }}
                            thumbProps={{
                                children: (
                                    <Icon
                                        name="trash-o"
                                        type="font-awesome"
                                        size={18}
                                        containerStyle={{ top: 6 }}
                                        color={secondaryFont}
                                    />
                                )
                            }}
                            thumbTintColor={secondary}

                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 32, borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: danger }}
                        />


                        <Slider
                            value={sendSound}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={secondary}
                            maximumValue={1}
                            minimumTrackTintColor={tertiary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (sendSound === 1) {
                                    sendAudioToBackend()
                                } else {
                                    setSendSound(0)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setSendSound(value)
                            }
                            orientation="horizontal"
                            step={0}
                            style={{ width: 96 }}
                            thumbStyle={{
                                height: 32,
                                width: 40,
                                borderRadius: 8,
                                borderColor: tertiary,
                                borderStyle: 'solid',
                                borderWidth: 1
                            }}
                            thumbProps={{
                                children: (
                                    <Icon
                                        name="send-o"
                                        type="font-awesome"
                                        size={18}
                                        containerStyle={{ top: 6, right: 1 }}
                                        color={secondary}
                                    />
                                )
                            }}
                            thumbTintColor={tertiary}
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 32, borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: tertiary }}
                        />
                    </View>
                </View>
            }
            {/* <View style={{
                padding: 20,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'stretch',
            }}>

            </View> */}

            {images &&
                <View style={{
                    margin: 'auto',
                    marginTop: sizes.S,
                    marginBottom: sizes.M,
                    padding: sizes.XS,
                    backgroundColor: colors.primary,
                    width: sizes.XXL,
                    borderRadius: sizes.S

                }}>

                    <FlatList
                        data={images}
                        style={{
                            width: '100%',
                            backgroundColor: colors.secondary,
                            marginBottom: sizes.S

                        }}
                        numColumns={2}
                        keyExtractor={(item, index) => `${item.uri}_${index}`}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item.uri }}
                                containerStyle={{
                                    aspectRatio: 1,
                                    width: '100%',
                                    flex: 1,
                                    margin: 1,
                                    maxHeight: sizes.XL
                                }}
                                style={{ borderRadius: sizes.XS, maxHeight: sizes.XL }}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        )}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: sizes.S
                        }}>

                        <Slider
                            value={deleteImages}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={danger}
                            maximumValue={1}
                            minimumTrackTintColor={secondary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (deleteImages === 0) {
                                    setImages(null)
                                    setDeleteImages(1)
                                } else {
                                    setDeleteImages(1)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setDeleteImages(value)
                            }
                            orientation="horizontal"
                            step={0}
                            style={{ width: 96 }}
                            thumbStyle={{
                                height: 32,
                                width: 40,
                                borderRadius: 8,
                                borderColor: danger,
                                borderStyle: 'solid',
                                borderWidth: 1
                            }}
                            thumbProps={{
                                children: (
                                    <Icon
                                        name="trash-o"
                                        type="font-awesome"
                                        size={18}
                                        containerStyle={{ top: 6 }}
                                        color={secondaryFont}
                                    />
                                )
                            }}
                            thumbTintColor={secondary}

                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 32, borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: danger }}
                        />


                        <Slider
                            value={sendImages}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={secondary}
                            maximumValue={1}
                            minimumTrackTintColor={tertiary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (sendImages === 1) {
                                    sendImagesToBackend(images)
                                } else {
                                    setSendImages(0)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setSendImages(value)
                            }
                            orientation="horizontal"
                            step={0}
                            style={{ width: 96 }}
                            thumbStyle={{
                                height: 32,
                                width: 40,
                                borderRadius: 8,
                                borderColor: tertiary,
                                borderStyle: 'solid',
                                borderWidth: 1
                            }}
                            thumbProps={{
                                children: (
                                    <Icon
                                        name="send-o"
                                        type="font-awesome"
                                        size={18}
                                        containerStyle={{ top: 6, right: 1 }}
                                        color={secondary}
                                    />
                                )
                            }}
                            thumbTintColor={tertiary}
                            thumbTouchSize={{ width: 40, height: 40 }}
                            trackStyle={{ height: 32, borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: tertiary }}
                        />
                    </View>
                </View>
            }
            {manipulatingImages && (
                <View style={{
                    margin: 'auto',
                    marginTop: sizes.S,
                    marginBottom: sizes.M,
                    padding: sizes.XS,
                    backgroundColor: 'transparent',
                    width: sizes.XXL,
                    borderRadius: sizes.S

                }}>

                    <ActivityIndicator />
                </View>
            )}
            {!images && !manipulatingImages && <View style={styles.container}>
                {inputValue.length === 0 &&
                    <Icon
                        name='image'
                        type="font-awesome"
                        size={24}
                        color={secondaryFont}
                        containerStyle={styles.buttonContainer}
                        onPress={() => pickImage()}
                    />
                }

                <TextInput
                    autoFocus
                    ref={inputRef}
                    placeholder="Type away..."
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    style={styles.input}
                />
                {inputValue.length > 0
                    ? <Button
                        loading={false}
                        loadingProps={{ size: 'small', color: secondary }}
                        icon={{
                            name: 'send',
                            type: 'material-ui-icons',
                            size: 15,
                            color: secondary,
                        }}
                        buttonStyle={styles.sendButton}
                        titleStyle={styles.buttonTitle}
                        containerStyle={styles.buttonContainer}
                        onPress={() => handleSend()}
                    />
                    : <Icon
                        // type='outline'
                        name={recording ? 'stop' : 'mic'}
                        size={24}
                        color={recording ? danger : secondaryFont}
                        containerStyle={styles.buttonContainer}
                        onPress={recording ? stopRecording : startRecording}
                    />
                }
            </View>}
        </View>
    )
}

export default ChatInput



