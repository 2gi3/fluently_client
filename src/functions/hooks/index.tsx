import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

export const useImagePicker = () => {
    const [image, setImage] = useState<undefined | string>(undefined);

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
                setImage(manipResult.uri);
            }
        }
    };



    // useEffect(() => {
    //     console.log(image)
    //     return () => {
    //     };
    // }, [visible, image]); 

    return { image, pickImage };
};

export default useImagePicker;
