import React, { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-av';
import { View, TextInput, Animated, Easing, DimensionValue } from "react-native"
import { Button, Icon, Text } from '@rneui/themed';
import { sizes } from "../../../styles/variables/measures";
import { ChatInputProps } from "../../../types/chat";
import colors from '../../../styles/variables/colors';
import { styles } from './styles';
import { useStopWatch } from '../../../functions/hooks';



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
    const { secondary, secondaryFont, tertiary } = colors
    const inputRef = useRef<TextInput | null>(null);
    const [recording, setRecording] = useState<Audio.Recording | undefined>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState<{ soundObject: Audio.Sound | undefined, duration: number }>({
        soundObject: undefined,
        duration: 0
    });
    const [progress, setProgress] = useState(0)




    useEffect(() => {

        console.log({
            progress
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
                    progressUpdateIntervalMillis: 1000
                }
            );
            ;
            console.log('Recording stopped and stored at', recording.getURI(), 'Duration:', status);

            setSound({
                soundObject: newSound,
                duration: Math.ceil(status.durationMillis / 100) as number
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

                    const position = Math.round(status.positionMillis / 100);



                    if (position !== prevPosition) {
                        setProgress(Math.ceil((position / sound.duration) * 100))



                        prevPosition = position;
                    }
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
        <>{sound.duration &&
            <View style={[styles.container, { justifyContent: 'flex-start', backgroundColor: 'blue', height: sizes.M }]}>

                <View
                    style={{ position: 'absolute', backgroundColor: 'lightgreen', top: 0, right: 0, bottom: 0, left: 0, }}>
                    {/* <Text>
                        {sound.duration.toString()}
                    </Text> */}
                </View>

                <View
                    style={{
                        flexBasis: `${progress}%` as DimensionValue,
                        justifyContent: 'flex-start',
                        backgroundColor: 'red',
                        height: 12,
                    }}                        >
                    {/* <Text>
                        audioCountdown {progress}
                    </Text> */}
                </View>
            </View>
        }
            {sound.soundObject && <View
                style={styles.container}>
                <Icon
                    name='delete-outline'
                    size={30}
                    color={secondaryFont}
                    containerStyle={[styles.buttonContainer, { marginRight: sizes.S }]}
                    onPress={() => setSound({
                        soundObject: undefined,
                        duration: 0
                    })}
                />
                <Icon
                    name='play-circle-outline'
                    size={30}
                    color={secondaryFont}
                    containerStyle={[styles.buttonContainer, { marginRight: sizes.S }]}
                    onPress={() => playSound()}
                />

                <Icon
                    name='send'
                    size={30}
                    color={secondaryFont}
                    containerStyle={styles.buttonContainer}
                    onPress={() => sendAudioToBackend()}
                />
            </View>}
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
                        name={recording ? 'stop-circle' : 'mic'}
                        size={24}
                        color={secondaryFont}
                        containerStyle={styles.buttonContainer}
                        onPress={recording ? stopRecording : startRecording}
                    />}
            </View>
        </>
    )
}

export default ChatInput