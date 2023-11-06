import React, { useEffect } from 'react';
import { Avatar, ListItem, Divider, Skeleton, Badge } from "@rneui/base"
import { TouchableOpacity, View, Pressable } from "react-native"
import moment from 'moment';
import { ChatroomT } from '../../types/chat';
import { useGetUsers, useUserData } from '../../functions/hooks/user';
import { sizes } from '../../styles/variables/measures';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLastMessage } from '../../functions/hooks/chat';
import { addToPendingChats } from '../../redux/slices/chatSlice';
// import { useNavigation } from '@react-navigation/native'



const ChatCard = ({ chatroom }: { chatroom: ChatroomT }) => {
    const activeChat = useSelector((state: RootState) => state.chat.activeChat)
    const user = useSelector((state: RootState) => state.user.user);
    // @ts-ignore
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/user/${user.id == chatroom.user1Id ?
        chatroom.user2Id
        : chatroom.user1Id
        }`


    const { loading, error, users: user2, refreshData, isValidating } = useGetUsers(url);
    const { loading: loadingLastMessage, error: errorLastMessage, lastMessage, refreshData: refreshLastMessage, isValidating: isValidatingLastMessage } = useGetLastMessage(chatroom.id!);
    const dispatch = useDispatch()

    useEffect(() => {
        if (lastMessage && lastMessage.status !== 'read') {
            dispatch(addToPendingChats(chatroom.id!))
        }
    }, [lastMessage])

    useEffect(() => {
        //updates the unread badge in the chatsList
        refreshLastMessage()
    }, [activeChat])


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
            >
                <ListItem
                >
                    <View style={{ position: 'relative' }}>
                        <Avatar
                            rounded
                            source={{
                                uri: user2.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp'
                            }}
                            size="large"
                        />
                        {/* <Avatar
                        rounded
                        source={require('../../../assets/images/flags/FlagItalian.webp')}
                        size={24}
                        containerStyle={{ position: 'absolute', bottom: 0 }}
                        avatarStyle={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    /> */}
                    </View>
                    <ListItem.Content style={{ height: '100%', gap: 8 }}>
                        <ListItem.Title>
                            {user2.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>{lastMessage ? lastMessage.text : `${user2.name} wants to chat with you`}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content
                        style={{
                            maxWidth: 74,
                            marginTop: 7,
                            display: 'flex',
                            flexWrap: 'nowrap',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end',
                            gap: 17,
                        }}
                    >                    {lastMessage && lastMessage.status === 'sent' && <Badge status="success" />}

                        {lastMessage && <ListItem.Subtitle style={{
                            fontSize: 12,
                            color: '8e8e8f'
                        }}>{moment(lastMessage.created_at).fromNow()}</ListItem.Subtitle>}

                    </ListItem.Content>
                </ListItem>
                <Divider style={{ marginLeft: 108 }} />
            </View>
        );
    }
};

export default ChatCard;
