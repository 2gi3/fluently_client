import { View, FlatList, SafeAreaView, Text } from "react-native"
import Message from "../../components/chat/Message"
// import { ChatMessageT } from "../../types"
import chatData from "../../../mock_data/chatsData.json"
import { sizes } from "../../styles/variables/measures";
import ChatInput from "../../components/chat/ChatInput";
import { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { createMessage } from "../../functions/chat";
import { useGetMessages } from "../../functions/hooks/chat";
import { setOutgoingMessage } from "../../redux/slices/webSocketSlice";
import { useGetUsers } from "../../functions/hooks/user";
import { addMessage, clearActiveChats, clearChatMessages, removeFromPendingChats, setActiveChat } from "../../redux/slices/chatSlice";




const ChatScreen = () => {
    const route: any = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, error, messages: messagesDB, refreshData, isValidating } = useGetMessages(route.params.id);
    const flatListRef = useRef<any>(null);

    const user = useSelector((state: RootState) => state.user.user);

    const [messages, setMessages] = useState(messagesDB || []);

    const isConnected = useSelector((state: RootState) => state.status.connected);
    const localMessages = useSelector((state: RootState) => state.chat.chatMessages);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat)


    //@ts-ignore
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/user/${route.params.user2id}`
    const { users: user2 } = useGetUsers(url);

    const [inputValue, setInputValue] = useState("");

    const handleSend = async () => {

        const { newMessage } = await createMessage({
            chatId: route.params!.id,
            userId: `${user.id}`,
            text: inputValue,
            status: 'sent',
        });
        dispatch(addMessage(newMessage))

        setMessages((prevMessages: any) => [
            ...prevMessages,
            newMessage
        ]);

        if (isConnected) {
            dispatch(setOutgoingMessage(JSON.stringify({
                type: 'chatMessage',
                recipient: route.params.user2id,
                content: newMessage,
            }))
            )
        }

        if (flatListRef.current) {
            const newIndex = messages.length - 1;
            flatListRef.current.scrollToItem({
                animated: true,
                item: messages[newIndex],
                viewPosition: 1,
            });
        }

    }



    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const isLastMessage = index === messages.length - 1;

        return (
            <Message message={item} messageRead={true} isLastMessage={isLastMessage} />
        );
    };



    useEffect(() => {
        console.log({ chatId: route.params!.id })
        if (user2) {// @ts-ignore
            navigation.setOptions({ title: user2.name, headerTitleAlign: 'center' })
            dispatch(setActiveChat(route.params.id))
            setMessages(messagesDB)
            dispatch(removeFromPendingChats(route.params.id))
        }


        return () => {
            dispatch(clearChatMessages());
            dispatch(clearActiveChats())
        };
    }, [route.params, messagesDB, user2])

    useEffect(() => {

        if (localMessages.length > 0) {
            setMessages((prevMessages: any) => [
                ...messagesDB,
                ...localMessages
            ]);
        }

    }, [localMessages])

    if (messages) {
        // setMessages(messagesDB)



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
                    keyExtractor={(item) => (item.id ? item.id.toString() : item.created_at)}
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