import { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export const useImagePicker = () => {
    const [image, setImage] = useState<undefined | string>(undefined);

    const convertToBase64 = async (uri: string) => {
        try {
            const base64String = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64String}`;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return undefined;
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                const manipResult = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 150 } }],
                    { compress: 1 }
                );
                if (Platform.OS === 'android') {
                    console.log('converting')
                    const base64Image = await convertToBase64(manipResult.uri);
                    console.log('converted')
                    setImage(base64Image);
                } else {
                    setImage(manipResult.uri);
                }
            }
        }
    };

    return { image, pickImage };
};

interface StopWatchHookProps {
    initialTimeLength?: number;
}

export const useStopWatch = () => {
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const stopWatchRef = useRef<NodeJS.Timeout | null>(null);

    const startStopWatch = () => {
        if (!isRunning) {
            setIsRunning(true);
            stopWatchRef.current = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        }
    };

    const stopStopWatch = () => {
        if (isRunning) {
            setIsRunning(false);
            if (stopWatchRef.current) {
                clearInterval(stopWatchRef.current);
            }
        }
    };

    const resetStopWatch = () => {
        stopStopWatch();
        setTimeElapsed(0);
    };

    const startCountdown = (seconds: number) => {
        if (!isRunning) {
            setTimeElapsed(seconds);
            setIsRunning(true);
            stopWatchRef.current = setInterval(() => {
                setTimeElapsed((prevTime) => {
                    if (prevTime <= 1) {
                        stopStopWatch();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
    };

    const pauseCountdown = () => {
        stopStopWatch();
    };

    const resetCountdown = (seconds: number) => {
        pauseCountdown();
        setTimeElapsed(seconds);
    };

    useEffect(() => {
        return () => {
            if (stopWatchRef.current) {
                clearInterval(stopWatchRef.current);
            }
        };
    }, []);

    return {
        startStopWatch,
        stopStopWatch,
        resetStopWatch,
        startCountdown,
        pauseCountdown,
        resetCountdown,
        timeElapsed,
    };
};

// export const useVideoLoad = () => {
//     const [aspectRatio, setAspectRatio] = useState(16 / 9)

//     const handleVideoLoad = (status: any) => {
//         if (status && status.naturalSize) {
//             const { naturalSize } = status;
//             const ratio = naturalSize.width / naturalSize.height;
//             setAspectRatio(ratio);
//         }
//     };
//     return {
//         aspectRatio,
//         handleVideoLoad
//     }

// };

export default useImagePicker;
