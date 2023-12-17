import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

export const useImagePicker = () => {
    const [image, setImage] = useState<undefined | string>(undefined);
    const [visible, setVisible] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setVisible(true);
                const manipResult = await manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 150 } }],
                    { compress: 1 }
                );
                setImage(manipResult.uri);
            }
        }
    };

    const confirmImage = async (updateUser, updateUserEndpoint, logIn) => {
        if (visible) {
            const data = await updateUser({ image: image }, updateUserEndpoint);
            logIn(data.updatedUser);
            setVisible(false);
        }
    };

    useEffect(() => {
        // Additional cleanup or side effects can be added here
        // This will run when the component using the hook unmounts
        console.log(image)
        return () => {
            // Cleanup logic (if needed)
        };
    }, [visible, image]); // Only re-run the effect if 'visible' changes

    return { image, visible, pickImage, confirmImage };
};

export default useImagePicker;
