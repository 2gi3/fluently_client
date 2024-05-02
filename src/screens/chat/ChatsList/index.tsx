import React from 'react';
import { FlatList, View, Pressable, Text, SafeAreaView, ScrollView } from 'react-native';
// import { ChatT } from '../../types';
import ChatCard from '../../../components/chat/ChatCard';
import { Divider } from '@rneui/themed';
import chatsData from '../../../../mock_data/chatsData.json'
import { useNavigation } from '@react-navigation/native'
import { ChatMessageT, ChatroomT, MockChatType } from '../../../types/chat';
import { useGetChats } from '../../../functions/hooks/chat';
import { useUserData } from '../../../functions/hooks/user';
import { Skeleton } from '@rneui/base';
import { sizes } from '../../../styles/variables/measures';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react'
import colors from '../../../styles/variables/colors';
import ChatsListSkeleton from './skeleton';
import { styles } from './styles';

const ChatsList = ({ loading, error, chatrooms, refreshData, isValidating }: { loading, error, chatrooms, refreshData, isValidating }) => {
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user);
    const activeChat = useSelector((state: RootState) => state.chat.activeChat);
    const [sortedChatrooms, setSortedChatrooms] = useState<ChatroomT[] | null>(null)
    const pendingChats = useSelector((state: RootState) => state.chat.pendingChats);



    useEffect(() => {
        refreshData();
        if (chatrooms) {

            const filteredChatrooms = chatrooms.chatrooms
                .slice()
                .sort((a: ChatroomT, b: ChatroomT) => {
                    const aLastMessageId = a.last_message_id ?? Number.MAX_SAFE_INTEGER;
                    const bLastMessageId = b.last_message_id ?? Number.MAX_SAFE_INTEGER;
                    return bLastMessageId - aLastMessageId;
                }).filter((chatroom: ChatroomT) => {
                    // this will eliminate chatrooms opened by another user that hasn't sent a message yet
                    return chatroom.user1Id === user.id || chatroom.last_message_id !== null;
                });

            setSortedChatrooms(filteredChatrooms);
        }
    }, [chatrooms, activeChat, pendingChats]);


    const renderItem = ({ item }: { item: ChatroomT }) => (
        <View>
            <Pressable
                // @ts-ignore
                onPress={() => navigation.navigate('Chat', {
                    id: item.id!.toString(),
                    user2id: user.id == item.user2Id ? item.user1Id : item.user2Id,
                })}
                style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
            >
                <ChatCard
                    chatroom={item}
                    lastMessages={chatrooms!.lastMessages}
                />
            </Pressable>
        </View>
    );

    if (loading) {
        return (
            <View>
                <ChatsListSkeleton />
            </View>
        )
    } else if (chatrooms && sortedChatrooms && sortedChatrooms.length > 0) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.primaryLight }}>
                {/* <ScrollView> */}
                <FlatList
                    data={sortedChatrooms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id!.toString()}
                />
                {/* </ScrollView> */}
            </SafeAreaView>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.triangle} />
                <View style={styles.contentContainer}>
                    <Text>{`Practice your ${user.learning_language} language skills by having conversations your fellow students`}</Text>
                    <Text style={{ marginTop: sizes.XS }}>{`Click the button above to get started!`} </Text>
                </View>
            </View>
        )
    }
};

export default ChatsList;
