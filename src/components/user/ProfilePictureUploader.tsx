import { Button, Dialog } from "@rneui/base"
import { useState } from "react";
import { Text } from "react-native"
import ImagePickerExample from "./ImagePicker";

const ProfilePictureUploader = () => {
    const [visible, setVisible] = useState(false);


    const toggleDialog = () => {
        setVisible(!visible);
    };

    return (
        <>
            <Button
                title="Update"
                onPress={toggleDialog}
            // buttonStyle={styles.button}
            />
            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Select an image" />
                <ImagePickerExample />


            </Dialog>
        </>
    )
}
export default ProfilePictureUploader