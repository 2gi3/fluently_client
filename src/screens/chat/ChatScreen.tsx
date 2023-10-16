import { View, FlatList, SafeAreaView, Text } from "react-native"
import Message from "../../components/chat/Message"
// import { ChatMessageT } from "../../types"
import chatData from "../../../mock_data/chatsData.json"
import { sizes } from "../../styles/variables/measures";
import ChatInput from "../../components/chat/ChatInput";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createMessage } from "../../functions/chat";


// const messages = chatData.map(chat => ({
//     user: {
//         id: chat.user.id,
//         name: chat.user.name
//     },
//     id: chat.lastMessage.id,
//     text: chat.lastMessage.text,
//     createdAt: chat.lastMessage.createdAt,
// }));


const messages = chatData.map(chat => ({
    user: {
        id: chat.user2Id,
        name: chat.user1Id
    },
    id: chat.last_message_id,
    text: 'kjhkhj',
    createdAt: '2023-09-27 14:36:57 ',
}));
const ChatScreen = () => {

    const route: any = useRoute()
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user.user);


    console.log({ route: route })


    const [inputValue, setInputValue] = useState("");

    const handleSend = (messageText: string) => {
        createMessage({
            chatId: route.params!.id,
            userId: `${user.id}`,
            text: messageText,
            status: 'sent',
        });
    }



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