import React from 'react';
import { Avatar, ListItem, Divider, Skeleton } from "@rneui/base"
import { TouchableOpacity, View, Pressable } from "react-native"
import moment from 'moment';
import { ChatroomT } from '../../types/chat';
import { useGetUsers } from '../../functions/hooks/user';
import { sizes } from '../../styles/variables/measures';
// import { useNavigation } from '@react-navigation/native'



const ChatCard = ({ chatroom }: { chatroom: ChatroomT }) => {
    // const navigation = useNavigation()
    // @ts-ignore
    const url = `${process.env.SERVER_URL}/api/user/${chatroom.user2Id}`


    const { loading, error, users: user2, refreshData, isValidating } = useGetUsers(url);

    const lastMessage = 'hello last message :)'



    if (loading) {
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
                        <ListItem.Subtitle>{lastMessage}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content
                        style={{
                            maxWidth: 74,
                            // marginTop: -27,
                            display: 'flex',
                            flexWrap: 'nowrap',
                            flexDirection: 'row',
                            alignItems: 'baseline',
                            justifyContent: 'flex-end',
                            gap: 8,
                        }}
                    >
                        {/* <ListItem.Subtitle right>{moment(lastMessage.createdAt).fromNow()}</ListItem.Subtitle> */}

                    </ListItem.Content>
                </ListItem>
                <Divider style={{ marginLeft: 108 }} />
            </View>
        );
    }
};

export default ChatCard;
