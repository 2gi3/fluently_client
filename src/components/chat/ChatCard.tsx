import React from 'react';
import { Avatar, ListItem, Divider } from "@rneui/base"
import { TouchableOpacity, View, Pressable } from "react-native"
import { ChatT } from "../../types"
import moment from 'moment';
// import { useNavigation } from '@react-navigation/native'



const ChatCard = ({ user }: { user: ChatT }) => {
    // const navigation = useNavigation()

    return (

        <View
            key={String(user.id)}
            // onPress={() => navigation.navigate('Chat')}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 260 }}
        >
            <ListItem
            >
                <View style={{ position: 'relative' }}>
                    <Avatar
                        rounded
                        source={{
                            uri: user.user.image,
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
                        {user.user.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{user.lastMessage.text}</ListItem.Subtitle>
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
                    <ListItem.Subtitle right>{moment(user.lastMessage.createdAt).fromNow()}</ListItem.Subtitle>

                </ListItem.Content>
            </ListItem>
            <Divider style={{ marginLeft: 108 }} />
        </View>
    );
};

export default ChatCard;
