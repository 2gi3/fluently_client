import { Avatar, Button, Dialog, Divider, Icon, Input, ListItem, Overlay, Text, } from "@rneui/themed"
import { View } from "react-native"

import React, { useEffect, useState } from "react";
import { styles } from "./styles";

const ConfirmationOverlay = ({
    isVisible,
    warning,
    onBackdropPress,
    onConfirm,
    onCancel,
    confirmationSentence,
    consfirmButtonTitle
}: {
    isVisible: boolean
    warning: string
    onBackdropPress: () => void
    onConfirm: () => void
    onCancel: () => void
    confirmationSentence?: string
    consfirmButtonTitle: string

}) => {
    const [confirmationInput, setConfirmationInput] = useState('');
    const [inputError, setInputError] = useState<string | undefined>(undefined);

    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress} overlayStyle={styles.overlay}>
            <Text style={styles.warningText}>⚠️ {warning}</Text>
            {confirmationSentence && (
                <>
                    <Text style={styles.warningText}>
                        If you want to proceed, type{' '}
                        <Text style={{ fontWeight: 'bold' }}>&apos;&nbsp;{confirmationSentence}&nbsp;&apos; </Text>
                        in the input below:
                    </Text>
                    <Input
                        autoFocus={true}
                        placeholder="Type here"
                        value={confirmationInput}
                        onChangeText={(text) => {
                            setConfirmationInput(text);
                            if (confirmationSentence === confirmationInput.toLowerCase()) {
                                setInputError(undefined);
                            }
                        }}
                        onBlur={() => {
                            if (confirmationSentence !== confirmationInput.toLowerCase()) {
                                setInputError(`Type the word: '${confirmationSentence}' in the input above`);
                            } else {
                                setInputError(undefined);
                            }
                        }}
                        errorMessage={inputError}
                        style={styles.input}
                        containerStyle={styles.inputContainer}
                    />
                </>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    type="outline"
                    icon={<Icon name="close" type="material-icons" />}
                    onPress={() => {
                        onCancel();
                        setInputError(undefined);
                        setConfirmationInput('');
                    }}
                />
                <Button
                    title={consfirmButtonTitle}
                    onPress={() => {
                        onConfirm();
                    }}
                />
            </View>
        </Overlay>
    );
};

export default ConfirmationOverlay;
