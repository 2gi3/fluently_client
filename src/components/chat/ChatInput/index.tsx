import React from 'react'
import { View, TextInput } from "react-native"
import { Button } from '@rneui/themed';
import { sizes } from "../../../styles/variables/measures";
import { ChatInputProps } from "../../../types/chat";
import colors from '../../../styles/variables/colors';
import { styles } from './styles';



const ChatInput = ({ onSend, inputValue, setInputValue }: ChatInputProps) => {
    const { secondary, tertiary } = colors

    const handleSend = async () => {
        if (inputValue.trim() !== "") {
            onSend(inputValue);
            setInputValue("");
        }
    };

    return (
        <View style={styles.container}>
            <Button
                loading={false}
                loadingProps={{ size: 'small', color: 'black' }}
                icon={{
                    name: 'plus',
                    type: 'ant-design',
                    size: sizes.M,
                    color: tertiary,
                }}
                buttonStyle={styles.addButton}
                titleStyle={styles.buttonTitle}
                containerStyle={styles.buttonContainer}
                onPress={() => console.log('aye')}
            />
            <TextInput
                placeholder="Type away..."
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                style={styles.input}
            />
            <Button
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
        </View>
    )
}

export default ChatInput