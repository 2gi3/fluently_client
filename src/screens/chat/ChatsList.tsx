import React from 'react';
import { FlatList, View, Pressable } from 'react-native';
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



const ChatsList = (
    // { chats }: { chats: ChatT[] }
) => {
    // console.log(chats);
    const navigation = useNavigation()
    const user = useSelector((state: RootState) => state.user.user);


    const { loading, error, cahtrooms, refreshData, isValidating } = useGetChats();





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
    } else {
        return (
            <FlatList
                data={cahtrooms}
                renderItem={renderItem}
                keyExtractor={(item) => item.id!.toString()}
            />
        );
    }
};

export default ChatsList;
