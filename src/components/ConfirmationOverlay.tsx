import { Avatar, Button, Dialog, Divider, Icon, Input, ListItem, Overlay, Text, } from "@rneui/themed"
import { View } from "react-native"

import React, { useEffect, useState } from "react";
import { sizes } from "../styles/variables/measures";
import colors from "../styles/variables/colors";

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
    const { secondary, primary, tertiary, danger } = colors

    return (
        <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}
            overlayStyle={{ backgroundColor: secondary, padding: sizes.M }}
        >
            <Text style={{ marginBottom: sizes.M }}>
                ⚠️ {warning}
            </Text>
            {confirmationSentence && <>
                <Text style={{ marginBottom: sizes.M }}>
                    If you want to proceed, type{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                        &apos;&nbsp;{confirmationSentence}&nbsp;&apos;{' '}
                    </Text>
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
                            setInputError(
                                `Type the word: '${confirmationSentence}' in the input above`
                            );
                        } else {
                            setInputError(undefined);
                        }
                    }}
                    errorMessage={inputError}
                    style={{
                        paddingHorizontal: sizes.XS,
                    }}
                    containerStyle={{
                        marginBottom: sizes.M,
                    }}
                />
            </>}
            <View
            // style={{}}
            >
                <Button
                    type="outline"
                    icon={
                        <Icon
                            name="close"
                            type="material-icons"
                        /* your iconStyle here */
                        />
                    }
                    onPress={() => {
                        onCancel();
                        setInputError(undefined);
                        setConfirmationInput('');
                    }}
                    buttonStyle={{/* your button styles here */ }}
                />
                <Button
                    title={consfirmButtonTitle}
                    buttonStyle={{/* your button styles here */ }}
                    titleStyle={{/* your title styles here */ }}
                    onPress={() => {
                        onConfirm();
                    }}
                />
            </View>
        </Overlay>
    );
};

export default ConfirmationOverlay;
