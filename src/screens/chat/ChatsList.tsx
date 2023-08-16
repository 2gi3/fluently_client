import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ChatT } from '../../types';
import ChatCard from '../../components/chat/ChatCard';
import { Divider } from '@rneui/themed';



const ChatsList = ({ chats }: { chats: ChatT[] }) => {
    // console.log(chats);

    const renderItem = ({ item }: { item: ChatT }) => (
        // <TouchableOpacity
        //     onPress={() => console.log(item.user.name)}
        //     style={{ maxWidth: 440, maxHeight: 108, minWidth: 300 }}
        // >
        <ChatCard user={item} />
        // </TouchableOpacity>
    );

    return (
        <FlatList
            data={chats}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default ChatsList;
