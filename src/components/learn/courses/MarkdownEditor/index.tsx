import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { MarkdownEditorProps } from '../../../../types/learning';
import { Card } from '@rneui/themed';
import colors from '../../../../styles/variables/colors';
import ConfirmationOverlay from '../../../ConfirmationOverlay';



const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ title, placeholder, numberOfLines, value, maxLength, onChangeText }) => {
    const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);

    const prevValueLength = useRef(value.length);

    useEffect(() => {
        // Renders the overlay only if value.length is increasing
        if (value.length > maxLength && value.length > prevValueLength.current) {
            setConfirmationOverlayVisible(true);
        }
        prevValueLength.current = value.length;
    }, [value, maxLength]);

    return (
        <Card>
            <Card.Title>{title}</Card.Title>
            {value.length > 0 && (
                <View>
                    <Text style={{ fontSize: 12 }}>Characters: {value.length} / {maxLength}</Text>
                </View>
            )}
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                multiline={true}
                numberOfLines={numberOfLines}
                value={value}
                onChangeText={onChangeText}
            />
            <View
                // contentInsetAdjustmentBehavior="automatic"
                style={{ backgroundColor: colors.primaryLight }}
            >
                <Markdown>
                    {value}
                </Markdown>
            </View>
            <ConfirmationOverlay
                warning={`Please make sure the text is maximum ${maxLength} characters`}
                isVisible={confirmationOverlayVisible}
                onBackdropPress={() => setConfirmationOverlayVisible(false)}
                onConfirm={() => setConfirmationOverlayVisible(false)}
                consfirmButtonTitle='OK'
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: colors.primaryLight,
        padding: 8,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default MarkdownEditor