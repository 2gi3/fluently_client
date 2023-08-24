import React from 'react';
import { FlatList, TouchableOpacity, Pressable } from 'react-native';
import chatsData from '../../../mock_data/chatsData.json'
import { useNavigation } from '@react-navigation/native'
import StudentCard from '../../components/chat/StudentCard';
import { ChatT, MockChatType } from '../../types/chat';



const ChatsList = (
    // { chats }: { chats: ChatT[] }
) => {
    // console.log(chats);
    const navigation = useNavigation()


    const renderItem = ({ item }: { item: MockChatType }) => (
        <Pressable
            // @ts-ignore
            onPress={() => console.warn(item.user.name)}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        >
            <StudentCard user={item.user} />
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
