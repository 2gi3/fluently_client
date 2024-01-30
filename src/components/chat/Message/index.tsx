import React, { useRef, useState } from 'react'
import { Text, View, DimensionValue } from "react-native"
import { chatStyles } from "../../../styles/chat"
import moment from "moment";
import { MessageT } from "../../../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { updateMessageStatus } from "../../../functions/chat";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../styles/variables/colors';
import { styles } from './styles';
import { sizes } from '../../../styles/variables/measures';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { Icon } from '@rneui/themed';
import { Audio } from 'expo-av';



const Message = ({ message, messageRead, isLastMessage }: { message: MessageT, messageRead: boolean, isLastMessage: boolean }) => {
    const user = useSelector((state: RootState) => state.user);
    const { secondary, primary, confirmation, secondaryFont, danger } = colors
    const [progress, setProgress] = useState(0)
    const [soundIsPlaying, setSoundIsPlaying] = useState(false)
    const soundRef = useRef<Audio.Sound | null>(null);



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


    async function playSound() {
        try {
            if (message.audioUrl && message.audioDuration) {
                if (soundRef.current) {
                    // Check if sound is already playing
                    if (soundIsPlaying) {
                        await soundRef.current.pauseAsync(); // Pause the sound
                        setSoundIsPlaying(false);
                    } else {
                        await soundRef.current.playAsync(); // Start playing the sound
                        setSoundIsPlaying(true);
                    }
                } else {
                    soundRef.current = new Audio.Sound();
                    await soundRef.current.loadAsync({ uri: message.audioUrl });
                    await soundRef.current.playAsync();
                    setSoundIsPlaying(true);
                    soundRef.current.setOnPlaybackStatusUpdate((status: any) => {
                        const position = status.positionMillis;
                        setProgress((position / message.audioDuration!) * 100);
                        setSoundIsPlaying(status.isPlaying);
                    });
                }
            }
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }

    // async function playSound() {
    //     try {
    //         if (message.audioUrl && message.audioDuration) {
    //             soundRef.current = new Audio.Sound();
    //             await soundRef.current.loadAsync({ uri: message.audioUrl });
    //             await soundRef.current.playAsync();
    //             soundRef.current.setOnPlaybackStatusUpdate((status: any) => {
    //                 const position = status.positionMillis;
    //                 setProgress((position / message.audioDuration!) * 100);
    //                 console.log({ status })
    //                 setSoundIsPlaying(status.isPlaying)

    //             });
    //         }
    //     } catch (error) {
    //         console.error('Failed to play sound', error);
    //     }
    // }
    // function stopSound() {
    //     if (soundRef.current) {
    //         soundRef.current.stopAsync();
    //     }
    // }

    // useEffect(() => {
    //     return () => {
    //         if (soundRef.current) {
    //             soundRef.current.unloadAsync();
    //         }
    //     };
    // }, []);

    const isMyMessage = () => {
        if (user.id) {
            const result = message.userId.toString() === user.id.toString();
            return result;
        } else {
            return false
        }
    }

    useEffect(() => {
        if (!isMyMessage() && message.status === 'sent' && messageRead === true) {
            updateMessageStatus(message.id!)
        }
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, [])

    return (
        <View
            key={`${message.id}_${message.text}`}
            style={[chatStyles.message,
            {
                backgroundColor: isMyMessage() ? primary : secondary,
                alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
            }]}
        >

            {message.text && <Text style={styles.messageText}>{message.text}</Text>}
            {message.audioUrl && <View style={{
                backgroundColor: 'transparent',
                width: sizes.XXL,
                borderRadius: sizes.S

            }}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: sizes.XS,
                    alignItems: 'center'

                }}>
                    {/* {soundIsPlaying ?
                        <Icon
                            name='pause'
                            type="font-awesome"
                            size={15}
                            color={danger}
                            iconStyle={{
                                top: 8, left: 1
                            }}
                            containerStyle={{ marginRight: sizes.S, width: sizes.M, height: sizes.M, borderRadius: sizes.S, backgroundColor: secondary }}
                            onPress={() => stopSound()}
                        /> */}
                    <Icon
                        name={soundIsPlaying ? 'pause' : 'play'}
                        type="font-awesome"
                        size={15}
                        color={soundIsPlaying ? danger : secondaryFont}
                        iconStyle={{
                            top: 8, left: 1
                        }}
                        containerStyle={{ marginRight: sizes.S, width: sizes.M, height: sizes.M, borderRadius: sizes.S, backgroundColor: secondary }}
                        onPress={() => playSound()}
                    />






                    <View style={[{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: sizes.S,
                        position: 'relative'
                    }, { paddingHorizontal: 0, flex: 1, justifyContent: 'flex-start', marginRight: sizes.S }]}>

                        <View
                            style={{ position: 'absolute', backgroundColor: secondary, top: 0, right: 0, bottom: 0, left: 0, }}>
                            {/* <Text>
                                {message.audioDuration ? message.audioDuration.toString() : 'helloworld'}
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


                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: sizes.S
                    }}>
                </View>
            </View>}

            <Text style={[styles.timestamp, isMyMessage() ? styles.myMessage : styles.otherMessage]}>
                {moment(message.created_at).fromNow()}
            </Text>

            {isMyMessage() && isLastMessage ? (
                <MaterialCommunityIcons
                    name={message.status === 'read' ? 'check-circle-outline' : 'dots-horizontal'}
                    size={14}
                    color={message.status === 'read' ? confirmation : secondaryFont}
                    style={styles.icon}
                />)
                : null
            }

        </View>
    )
}
export default Message


