import { View, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import Message from "../../../components/chat/Message"
import chatData from "../../../../mock_data/chatsData.json"
import { sizes } from "../../../styles/variables/measures";
import ChatInput from "../../../components/chat/ChatInput";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createMessage } from "../../../functions/chat";
import { useGetMessages } from "../../../functions/hooks/chat";
import { setOutgoingMessage } from "../../../redux/slices/webSocketSlice";
import { useGetUsers } from "../../../functions/hooks/user";
import { addMessage, clearActiveChats, clearChatMessages, removeFromPendingChats, setActiveChat } from "../../../redux/slices/chatSlice";
import { MessageT } from "../../../types/chat";
import colors from "../../../styles/variables/colors";

type ChatScreenRouteProp = {
    params: {
        id: string; // Assuming id is a string, adjust accordingly
        user2id: string;
        name: string;
    };
};


const ChatScreen = () => {
    const route = useRoute() as ChatScreenRouteProp;
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { loading, error, messages: messagesDB, refreshData, isValidating } = useGetMessages(route.params.id);
    const flatListRef = useRef<FlatList<MessageT> | null>(null);
    const scrollViewRef = useRef<any | null>(null);


    const user = useSelector((state: RootState) => state.user);

    const [messages, setMessages] = useState<MessageT[] | []>(messagesDB || []);

    const isConnected = useSelector((state: RootState) => state.status.connected);
    const localMessages = useSelector((state: RootState) => state.chat.chatMessages);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat)

    const url = `/api/user/${route.params.user2id}`
    const { users: user2 } = useGetUsers(url);
    const [inputValue, setInputValue] = useState("");
    const [messageType, setMessageType] = useState<"text" | "audio" | "image" | null>(null);
    const [audio, setAudio] = useState<{ url: string; duration: number } | null>(null);
    const audioRef = useRef<{ url: string; duration: number } | null>()
    // const [imageUrls, setImageUrls] = useState<string[] | null>(null)
    const imageUrls = useRef<string[] | null>(null)

    const handleSend = async () => {


        const { newMessage } = await createMessage({
            chatId: route.params!.id,
            userId: `${user.id}`,
            text: inputValue,
            status: 'sent',
            type: inputValue.length > 0 ? 'text' : messageType,
            audioUrl: audioRef.current?.url,
            audioDuration: audioRef.current?.duration,
            imageUrls: imageUrls.current
        });
        if (imageUrls.current && imageUrls.current?.length > 0) {
            newMessage.imageUrls = imageUrls.current
        }
        dispatch(addMessage(newMessage))

        setMessages((prevMessages: MessageT[]) => [
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
        setMessageType(null)
        audioRef.current = null
        imageUrls.current = null

    }

    // useEffect(() => {
    //     console.log({ audio, messageType })
    // }, [audio, messageType])

    // const renderItem = ({ item, index }: { item: MessageT, index: number }) => {
    //     const isLastMessage = index === messages.length - 1;

    //     return (
    //         <View>
    //             <Message message={item} messageRead={true} isLastMessage={isLastMessage} />
    //         </View>
    //     );
    // };



    useEffect(() => {
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
            setMessages((prevMessages: MessageT[]) => [
                ...messagesDB,
                ...localMessages
            ]);
        }
        console.log({ messages })

        if (flatListRef.current) {
            flatListRef.current?.scrollToEnd({ animated: true })
        }

    }, [localMessages])

    if (messages) {

        return (
            <KeyboardAvoidingView
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={{ backgroundColor: colors.primaryLight }}
                    // onScrollToTop={}
                    onLayout={() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }}
                    onContentSizeChange={() => {
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                    }}
                >
                    <View
                    // style={{ flex: 1 }}
                    >
                        {messages.map((message, index) => {
                            const isLastMessage = index === messages.length - 1;

                            return (
                                <View key={`${message.id}-${index}`}>
                                    <Message message={message} messageRead={true} isLastMessage={isLastMessage} />
                                </View>
                            )
                        })}

                    </View>
                </ScrollView>
                <SafeAreaView >

                    <ChatInput
                        onSend={handleSend}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        messageType={messageType}
                        setMessageType={setMessageType}
                        audio={audio}
                        setAudio={setAudio}
                        imageUrls={imageUrls}
                        audioRef={audioRef}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    } else {
        return (
            <KeyboardAvoidingView
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <View>
                    <Text>
                        {`Say hello to ${user2.name} to start a language exchange`}
                    </Text>
                </View>
                <SafeAreaView
                >

                    <ChatInput
                        onSend={handleSend}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        messageType={messageType}
                        setMessageType={setMessageType}
                        audio={audio}
                        setAudio={setAudio}
                        imageUrls={imageUrls}
                        audioRef={audioRef}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}
export default ChatScreen