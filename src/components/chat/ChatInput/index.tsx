import React, { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-av';
import { View, TextInput, DimensionValue } from "react-native"
import { Button, Icon, Slider, Text } from '@rneui/themed';
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



const ChatInput = ({ onSend, inputValue, setInputValue }: ChatInputProps) => {
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
    const [progress, setProgress] = useState(0)

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
            onSend(inputValue);
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
            // Create a new sound instance from the recorded URI
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: recording.getURI()! },
                {
                    shouldPlay: false,
                    // progressUpdateIntervalMillis: 100
                }
            );
            ;
            console.log('Recording stopped and stored at', recording.getURI(), 'Duration:', status);

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
        if (sound.soundObject) {
            try {
                // Print the type of the audio file
                const status = await sound.soundObject.getStatusAsync();
                console.log('Audio file type:', status);
                console.log('sound object:', sound.soundObject);

                // Convert the audio data to a Blob


                // const audioBlob = await fetch(sound.soundObject.getURI()).then((response) => response.blob());

                // Assuming you have a backend API endpoint to handle audio file upload
                const formData = new FormData();
                // formData.append('audio', audioBlob, 'audiofile.wav');

                // Example: Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
                const backendApiUrl = 'YOUR_BACKEND_API_URL';
                const response = await fetch(backendApiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Audio file successfully sent to the backend');
                } else {
                    console.error('Failed to send audio file to the backend');
                }
            } catch (error) {
                console.error('Error while processing audio file:', error);
            }
        } else {
            console.error('No audio file available to send');
        }
    };


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
                        {/* <Icon
                            name='delete-outline'
                            size={30}
                            color={danger}
                            containerStyle={[styles.buttonContainer, { flex: 1, borderColor: colors.danger, borderStyle: 'solid', borderWidth: 1, paddingVertical: 6, borderRadius: 6 }]}
                            onPress={() => setSound({
                                soundObject: undefined,
                                duration: 0
                            })}
                        /> */}
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
                            value={0}
                            animateTransitions
                            animationType="spring"
                            maximumTrackTintColor={secondary}
                            maximumValue={1}
                            minimumTrackTintColor={tertiary}
                            minimumValue={0}
                            onSlidingComplete={() =>
                                console.log("onSlidingComplete()")
                            }
                            onSlidingStart={() =>
                                console.log("onSlidingStart()")
                            }
                            onValueChange={value =>
                                console.log("onValueChange()", value)
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
            <View style={styles.container}>

                <Icon
                    name='add'
                    size={30}
                    color={secondaryFont}
                    containerStyle={styles.buttonContainer}
                    onPress={() => playSound()}
                />
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
            </View>
        </>
    )
}

export default ChatInput



