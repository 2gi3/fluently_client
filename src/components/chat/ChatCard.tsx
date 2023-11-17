import React, { useEffect, useState } from 'react';
import { Avatar, ListItem, Divider, Skeleton, Badge } from "@rneui/base"
import { TouchableOpacity, View, Text } from "react-native"
import moment from 'moment';
import { ChatroomT } from '../../types/chat';
import { useGetUsers, useUserData } from '../../functions/hooks/user';
import { sizes } from '../../styles/variables/measures';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLastMessage } from '../../functions/hooks/chat';
import { addToPendingChats } from '../../redux/slices/chatSlice';
import colors from '../../styles/variables/colors';
// import { useNavigation } from '@react-navigation/native'



const ChatCard = ({ chatroom }: { chatroom: ChatroomT }) => {
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
    const { loading: loadingLastMessage, error: errorLastMessage, lastMessage, refreshData: refreshLastMessage, isValidating: isValidatingLastMessage } = useGetLastMessage(chatroom.id!);
    const dispatch = useDispatch()
    const [isConnected, setIsConnected] = useState(false)

    // const isLastMessageSent = lastMessage && lastMessage.status === 'sent';

    // Dynamic background color based on the condition
    const [backgroundColor, setBackgroundColor] = useState(secondary)
    // isLastMessageSent ? 'yellow' : 'wheat';

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

    useEffect(() => {
        //updates the unread badge in the chatsList
        refreshLastMessage()
    }, [activeChat, pendingChats])


    if (loading || loadingLastMessage) {
        return (
            <View style={{
                //  flexDirection: 'column',
                //   gap: sizes.S 
            }} >
                <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
            </View>

        )
    } else {

        return (

            <View
                key={String(`${chatroom.id}-Chatroom`)}
                // onPress={() => navigation.navigate('Chat')}
                style={{ maxWidth: 440, maxHeight: 108, minWidth: 260 }}
            // lastMessage && lastMessage.status === 'sent'
            >
                <ListItem
                    containerStyle={{
                        backgroundColor: backgroundColor,
                        // elevation: 5
                    }}
                >
                    <View style={{ position: 'relative' }}>
                        {isConnected && <View
                            style={{
                                position: 'absolute',
                                right: 0
                            }}>
                            <Badge status="success" />
                        </View>
                        }
                        <Avatar
                            rounded
                            source={{
                                uri: user2.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp'
                            }}
                            size="large"
                        />
                    </View>
                    <ListItem.Content style={{ height: '100%', gap: 8 }}>
                        <ListItem.Title>
                            <Text>{user2.name}</Text>
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            <Text>{lastMessage ? lastMessage.text : `Help ${user2.name} practice your native language`}</Text>
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    {lastMessage && lastMessage.created_at !== null && <ListItem.Content
                        style={{
                            maxWidth: 74,
                            marginTop: 7,
                            display: 'flex',
                            flexWrap: 'nowrap',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end',
                            gap: 17,
                        }}
                    >
                        <ListItem.Subtitle style={{
                            fontSize: 12,
                            color: '8e8e8f'
                        }}>
                            <Text>{moment(lastMessage.created_at).fromNow()}</Text>
                        </ListItem.Subtitle>

                    </ListItem.Content>
                    }
                </ListItem>
                <Divider style={{ marginLeft: 108 }} />
            </View>
        );
    }
};

export default ChatCard;
