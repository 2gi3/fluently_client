import React, { useEffect, useState } from 'react';
import { Avatar, ListItem, Divider, Skeleton, Badge } from "@rneui/base"
import { TouchableOpacity, View, Text } from "react-native"
import moment from 'moment';
import { ChatMessageT, ChatroomT } from '../../../types/chat';
import { useGetUsers } from '../../../functions/hooks/user';
import { sizes } from '../../../styles/variables/measures';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToPendingChats } from '../../../redux/slices/chatSlice';
import colors from '../../../styles/variables/colors';
import ChatCardSkeleton from './skeleton';
import { styles } from './styles';
// import { useNavigation } from '@react-navigation/native'



const ChatCard = ({ chatroom, lastMessages }: { chatroom: ChatroomT, lastMessages?: ChatMessageT[] }) => {
    const { secondary, primary, tertiary } = colors
    const connectedUsers = useSelector((state: RootState) => state.webSocket.connectedUsers)
    const activeChat = useSelector((state: RootState) => state.chat.activeChat)
    const pendingChats = useSelector((state: RootState) => state.chat.pendingChats)
    const user = useSelector((state: RootState) => state.user);
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/user/${user.id == chatroom.user1Id ?
        chatroom.user2Id
        : chatroom.user1Id
        }`


    const { loading, error, users: user2, refreshData, isValidating } = useGetUsers(url);
    // const { loading: loadingLastMessage, error: errorLastMessage, lastMessage, refreshData: refreshLastMessage, isValidating: isValidatingLastMessage } = useGetLastMessage(chatroom.id!);
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(false)
    const lastMessage = lastMessages!.find(
        (message) => Number(message.id) === Number(chatroom.last_message_id)
    )
    const [backgroundColor, setBackgroundColor] = useState(secondary)
    useEffect(() => {
        if (connectedUsers && user2) {
            setIsConnected(connectedUsers.includes(user2.id))
        }
        if (lastMessage && lastMessage.status !== 'read' && lastMessage.userId !== user.id) {
            setBackgroundColor(primary)
            if (!pendingChats.includes(chatroom.id!)) {
                dispatch(addToPendingChats(chatroom.id!))
            }
        } else (setBackgroundColor(secondary))
    }, [lastMessage, connectedUsers, user2])




    if (loading) {
        return (
            <ChatCardSkeleton />
        )
    } else {

        return (
            <View key={String(`${chatroom.id}-Chatroom`)} style={styles.container}>
                <ListItem containerStyle={styles.listItemContainer(backgroundColor)}>
                    <View style={styles.avatarContainer}>
                        {isConnected && (
                            <View style={styles.badgeContainer}>
                                <Badge status="success" />
                            </View>
                        )}
                        <Avatar
                            rounded
                            source={{
                                uri: user2.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp',
                            }}
                            size="large"
                        />
                    </View>
                    <ListItem.Content style={styles.listItemContent}>
                        <ListItem.Title>
                            <Text>{user2.name}</Text>
                        </ListItem.Title>
                        <ListItem.Subtitle numberOfLines={2}>
                            <Text>{lastMessage ? lastMessage.text : `Help ${user2.name} practice your native language`}</Text>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    {lastMessage && lastMessage.created_at !== null && (
                        <ListItem.Content style={styles.listItemContentSubtitle}>
                            <ListItem.Subtitle style={styles.subtitle}>
                                <Text>{moment(lastMessage.created_at).fromNow()}</Text>
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    )}
                </ListItem>
                <Divider style={{ marginLeft: 108 }} />
            </View>
        );
    }
};

export default ChatCard;
