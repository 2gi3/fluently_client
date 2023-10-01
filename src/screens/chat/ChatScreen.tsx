import { View, FlatList, SafeAreaView, Text } from "react-native"
import Message from "../../components/chat/Message"
// import { ChatMessageT } from "../../types"
import chatData from "../../../mock_data/chatsData.json"
import { sizes } from "../../styles/variables/measures";
import ChatInput from "../../components/chat/ChatInput";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'


const messages = chatData.map(chat => ({
    user: {
        id: chat.user.id,
        name: chat.user.name
    },
    id: chat.lastMessage.id,
    text: chat.lastMessage.text,
    createdAt: chat.lastMessage.createdAt,
}));

const ChatScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()

    console.log(route)


    const [inputValue, setInputValue] = useState("");

    const handleSend = (message: string) => {
        console.log("Sending message:", message);
    };



    const renderItem = ({ item }: { item: any }) => (
        <Message message={item} />
    );

    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ title: route.params?.name, headerTitleAlign: 'center' })

    }, [route.params])
    return (
        // <SafeAreaView style={{ paddingBottom: sizes.L }}>
        <>
            <FlatList
                style={{
                    backgroundColor: '#dddddd'
                }}
                data={messages}
                renderItem={renderItem}
                inverted
                keyExtractor={(item) => item.id.toString()}
            />
            <ChatInput
                onSend={handleSend}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        </>
        // </SafeAreaView>
    )
}
export default ChatScreen