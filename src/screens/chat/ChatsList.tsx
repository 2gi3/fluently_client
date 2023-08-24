import React from 'react';
import { FlatList, TouchableOpacity, Pressable } from 'react-native';
// import { ChatT } from '../../types';
import ChatCard from '../../components/chat/ChatCard';
import { Divider } from '@rneui/themed';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation } from '@react-navigation/native'
import { ChatT, MockChatType } from '../../types/chat';



const ChatsList = (
    // { chats }: { chats: ChatT[] }
) => {
    // console.log(chats);
    const navigation = useNavigation()


    const renderItem = ({ item }: { item: MockChatType }) => (
        <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate('Chat', { id: item.id.toString(), name: item.user.name })}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        >
            <ChatCard user={item} />
        </Pressable>
    );

    return (
        <FlatList
            data={chatsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ChatsList;
