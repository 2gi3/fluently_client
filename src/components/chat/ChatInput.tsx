import React from 'react'
import { View, TextInput } from "react-native"
import { Button } from '@rneui/themed';
import { sizes } from "../../styles/variables/measures";
import { ChatInputProps } from "../../types/chat";
import colors from '../../styles/variables/colors';



const ChatInput = ({ onSend, inputValue, setInputValue }: ChatInputProps) => {
    const { primary, secondary, tertiary } = colors

    const handleSend = async () => {
        if (inputValue.trim() !== "") {
            onSend(inputValue);
            setInputValue("");
        }
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: sizes.S }}>

            <Button
                loading={false}
                loadingProps={{ size: 'small', color: 'black' }}
                icon={{
                    name: 'plus',
                    type: 'ant-design',
                    size: sizes.M,
                    color: tertiary,
                }}
                buttonStyle={{
                    backgroundColor: 'transparent',
                    // borderRadius: 5,
                    padding: 0,
                    paddingHorizontal: 0
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                containerStyle={{
                    // marginHorizontal: sizes.S,
                    // height: 50,
                    // width: 200,
                    marginVertical: 10,
                }}
                onPress={() => console.log('aye')}
            />
            <TextInput
                placeholder="Type away..."
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderRadius: 5, height: 32,
                    alignSelf: 'center',
                    marginRight: sizes.S,
                    marginLeft: 4,
                    paddingHorizontal: sizes.S
                }} />

            <Button
                // title=""
                loading={false}
                loadingProps={{ size: 'small', color: secondary }}
                icon={{
                    name: 'send',
                    type: 'material-ui-icins',
                    size: 15,
                    color: secondary,
                }}
                buttonStyle={{
                    backgroundColor: tertiary,
                    borderRadius: 5,
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                containerStyle={{
                    marginVertical: 10,
                }}
                onPress={() => handleSend()}
            />
        </View>
    )
}

export default ChatInput