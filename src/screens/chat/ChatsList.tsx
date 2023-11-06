import React from 'react';
import { FlatList, View, Pressable, Text } from 'react-native';
// import { ChatT } from '../../types';
import ChatCard from '../../components/chat/ChatCard';
import { Divider } from '@rneui/themed';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation } from '@react-navigation/native'
import { ChatroomT, MockChatType } from '../../types/chat';
import { useGetChats } from '../../functions/hooks/chat';
import { useUserData } from '../../functions/hooks/user';
import { Skeleton } from '@rneui/base';
import { sizes } from '../../styles/variables/measures';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react'
import { ConnectionManagerButtons } from '../../components/ConnectionManagerButtons';



const ChatsList = (
    // { chats }: { chats: ChatT[] }
) => {
    // console.log(chats);
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const pendingChats = useSelector((state: RootState) => state.chat.pendingChats);
    const { loading, error, chatrooms, refreshData, isValidating } = useGetChats();
    const [sortedChatrooms, setSortedChatrooms] = useState<ChatroomT[] | null>(null)


    useEffect(() => {
        refreshData();
        if (chatrooms) {
            const filteredChatrooms = chatrooms
                .slice()
                .sort((a: any, b: any) => b.last_message_id - a.last_message_id)
                .filter((chatroom: ChatroomT) => {
                    // this will eliminate chatrooms opened by another user that hasn't sent a message yet
                    return chatroom.user1Id === user.id || chatroom.last_message_id !== null;
                });

            setSortedChatrooms(filteredChatrooms);
            console.log(chatrooms);
        }
    }, [chatrooms, activeChat, pendingChats]);




    const renderItem = ({ item }: { item: ChatroomT }) => (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Chat', {
                id: item.id!.toString(),
                user2id: user.id == item.user2Id ? item.user1Id : item.user2Id,
            })}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        >
            <ChatCard chatroom={item} />
        </Pressable>
    );

    if (loading) {
        <View style={{ display: 'flex', gap: sizes.S, padding: sizes.S }} >
            <Skeleton circle={true} animation="wave" width={80} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.S }} />
            <Skeleton animation="wave" width={200} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
        </View>
    } else if (sortedChatrooms) {
        return (
            <FlatList
                data={sortedChatrooms}
                renderItem={renderItem}
                keyExtractor={(item) => item.id!.toString()}
            />
        );
    } else {
        return (
            <View>
                <Text>hello there</Text>
            </View>
        )
    }
};

export default ChatsList;
