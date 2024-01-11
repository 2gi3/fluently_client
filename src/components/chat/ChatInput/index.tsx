import React, { useState, useRef, useEffect } from 'react'
import { Audio } from 'expo-av';
import { View, TextInput } from "react-native"
import { Button, Icon } from '@rneui/themed';
import { sizes } from "../../../styles/variables/measures";
import { ChatInputProps } from "../../../types/chat";
import colors from '../../../styles/variables/colors';
import { styles } from './styles';



const ChatInput = ({ onSend, inputValue, setInputValue }: ChatInputProps) => {
    const { secondary, secondaryFont, tertiary } = colors
    const inputRef = useRef<TextInput | null>(null);
    const [recording, setRecording] = useState<Audio.Recording | undefined>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [sound, setSound] = useState<Audio.Sound | undefined | any>();


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

    // async function stopRecording() {
    //     console.log('Stopping recording..');
    //     if (recording) {
    //         setRecording(undefined);
    //         await recording.stopAndUnloadAsync();
    //         await Audio.setAudioModeAsync({
    //             allowsRecordingIOS: false,
    //         });
    //         const uri = recording.getURI()
    //         console.log('Recording stopped and stored at', uri);
    //         setSound(uri!);
    //     }
    // }
    async function stopRecording() {
        console.log('Stopping recording..');
        if (recording) {
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            // Create a new sound instance from the recorded URI
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: recording.getURI()! },
                { shouldPlay: false }
            );

            const status = await newSound.getStatusAsync();
            console.log('Recording stopped and stored at', recording.getURI(), 'Duration:', status);

            setSound(newSound);
        }
    }

    async function playSound() {
        try {
            if (sound) {
                console.log('Playing Sound', sound);
                await sound.playAsync();
            } else if (recording) {
                console.log('Loading Sound');
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: recording.getURI()! },
                    { shouldPlay: true }
                );
                setSound(newSound);  // Update to set the correct sound object
                console.log('Playing Sound');
                await newSound.playAsync();
            }
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }


    useEffect(() => {
        return () => {
            if (sound instanceof Audio.Sound) {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
        };
    }, [sound]);


    return (
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
    )
}

export default ChatInput