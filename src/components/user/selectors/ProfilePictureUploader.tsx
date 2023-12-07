import { Button, Dialog } from "@rneui/base"
import React, { useState } from "react";
import { Text } from "react-native"
import ImageSelector from "./ImageSelector";

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
            />
            <Dialog
                isVisible={visible}
                onBackdropPress={toggleDialog}
            >
                <Dialog.Title title="Select an image" />
                <ImageSelector />


            </Dialog>
        </>
    )
}
export default ProfilePictureUploader