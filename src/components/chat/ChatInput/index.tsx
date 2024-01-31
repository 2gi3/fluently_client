import React, { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-av';
import { View, TextInput, DimensionValue, Platform, ActivityIndicator } from "react-native"
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
import { manipulateAsync } from "expo-image-manipulator";


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
    const [image, setImage] = useState<string | null>(null);
    const [deleteImage, setDeleteImage] = useState(1)
    const [sendImage, setSendImage] = useState(0)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setVisible(true)
                // The Back-End accepts images ok max 100KB ( Back-End can be modified )
                const manipResult = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 150 } }],
                    { compress: 1 }
                )
                setImage(manipResult.uri);
            }
        }

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

    useEffect(() => {

        console.log({
            progress,
            val: randomWidth.value
        })
    }, [progress])





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
                    console.log({ response })
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
                console.log({ audioBlob })
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
                // console.log({ audioRef: audioRef.current, messageType })
                onSend()
                setSendSound(0)
                setSound({
                    soundObject: undefined,
                    duration: 0
                })
            }
        } else {
            console.error('No audio file available to send');
        }
    };
    // useEffect(() => {
    //     audioRef.current = audio;
    // }, [audio]);
    // useEffect(() => {
    //     console.log({ audio, messageType })
    // }, [audio, messageType])


    // const sendAudioToBackend = async () => {
    //     if (sound.soundObject) {
    //         try {
    //             console.log('sound object:', sound.soundObject);
    //             // Print the type of the audio file
    //             const status = await sound.soundObject.getStatusAsync();
    //             console.log('Audio file type:', status);

    //             // Convert the audio data to a Blob


    //             const audioBlob = await fetch(status.uri).then((response) => response.blob());
    //             console.log({ audioBlob })
    //             // Assuming you have a backend API endpoint to handle audio file upload
    //             const formData = new FormData();
    //             // formData.append('audio', audioBlob, 'audiofile.wav');

    //             // Example: Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
    //             const backendApiUrl = `${baseUrl}/`;
    //             const response = await fetch(backendApiUrl, {
    //                 method: 'POST',
    //                 body: formData,
    //             });

    //             if (response.ok) {
    //                 console.log('Audio file successfully sent to the backend');
    //             } else {
    //                 console.error('Failed to send audio file to the backend');
    //             }
    //         } catch (error) {
    //             console.error('Error while processing audio file:', error);
    //         }
    //     } else {
    //         console.error('No audio file available to send');
    //     }
    // };


    // const courseProgress = startedCourses?.[course.id]?.length ?? 0;
    // const progressPercentage = Math.ceil((courseProgress / course.sessionsLength!) * 100);
    return (
        <>
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
            {image &&
                <View style={{
                    margin: 'auto',
                    marginVertical: sizes.S,
                    padding: sizes.XS,
                    backgroundColor: 'transparent',
                    width: sizes.XXL,
                    borderRadius: sizes.S

                }}>
                    <Image
                        source={{ uri: image }}
                        containerStyle={{
                            aspectRatio: 1,
                            width: '100%',
                            flex: 1,
                            marginBottom: sizes.S
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: sizes.S
                        }}>

                        <Slider
                            value={deleteImage}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={danger}
                            maximumValue={1}
                            minimumTrackTintColor={secondary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (deleteImage === 0) {
                                    setImage(null)
                                    setDeleteImage(1)
                                } else {
                                    setDeleteImage(1)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setDeleteImage(value)
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
                            value={sendImage}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={secondary}
                            maximumValue={1}
                            minimumTrackTintColor={tertiary}
                            minimumValue={0}
                            onSlidingComplete={() => {
                                if (sendImage === 1) {
                                    console.log('send image ')
                                } else {
                                    setSendImage(0)
                                }
                            }
                            }
                            // onSlidingStart={() =>
                            //     console.log("onSlidingStart()")
                            // }
                            onValueChange={value =>
                                setSendImage(value)
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
            {!image && <View style={styles.container}>
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
        </>
    )
}

export default ChatInput



