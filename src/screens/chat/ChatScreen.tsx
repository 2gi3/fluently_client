import { View, FlatList, SafeAreaView, Text } from "react-native"
import Message from "../../components/chat/Message"
// import { ChatMessageT } from "../../types"
import chatData from "../../../mock_data/chatsData.json"
import { sizes } from "../../styles/variables/measures";
import ChatInput from "../../components/chat/ChatInput";
import { useState, useEffect, useRef } from "react";
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


const messagesDB = chatData.map((chat, i) => ({
    userId: 765,
    id: i,
    text: 'kjhkhj',
    createdAt: `2023-09-27 14:36:${i}`,
}));
const ChatScreen = () => {
    const flatListRef = useRef<any>(null);
    const route: any = useRoute()
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user.user);

    const [messages, setMessages] = useState(messagesDB);


    console.log({ user: user })


    const [inputValue, setInputValue] = useState("");

    const handleSend = async () => {

        const { newMessage } = await createMessage({
            chatId: route.params!.id,
            userId: `${user.id}`,
            text: inputValue,
            status: 'sent',
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            newMessage
        ]);

        if (flatListRef.current) {
            const newIndex = messages.length - 1;
            flatListRef.current.scrollToItem({
                animated: true,
                item: messages[newIndex],
                viewPosition: 1,
            });
        }

    }



    const renderItem = ({ item }: { item: any }) => (
        <Message message={item} />
    );



    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ title: route.params?.name, headerTitleAlign: 'center' })
        console.log({ messages: messages })

    }, [route.params, messages])
    if (messages) {
        return (
            // <SafeAreaView style={{ paddingBottom: sizes.L }}>
            <>
                <FlatList
                    ref={flatListRef}
                    style={{
                        backgroundColor: '#dddddd'
                    }}
                    data={messages}
                    renderItem={renderItem}
                    // inverted
                    keyExtractor={(item) => (item.id ? item.id.toString() : item.createdAt)}
                    onContentSizeChange={() => {
                        flatListRef.current?.scrollToEnd({ animated: true });
                    }}
                />
                <ChatInput
                    onSend={handleSend}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </>
            // </SafeAreaView>
        )
    } else {
        return (
            <View>
                <Text>
                    {`Say hello to ${route.params?.name} to start a language exchange`}
                </Text>
            </View>
        )
    }
}
export default ChatScreen