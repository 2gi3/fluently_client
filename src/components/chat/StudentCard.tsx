import React from 'react';
import { Avatar, ListItem, Divider, Badge } from "@rneui/base"
import { TouchableOpacity, View, Text } from "react-native"
// import { ChatT, UserT } from "../../types"
import moment from 'moment';
import { UserT } from '../../types/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';



const StudentCard = ({ user, isConnected }: { user: UserT, isConnected: boolean }) => {

    return (

        <View
            key={String(`${user.id}#User`)}
            // onPress={() => navigation.navigate('Chat')}
            style={{ maxWidth: 440, maxHeight: 108, minWidth: 260 }}
        >
            <ListItem
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
                            uri: user.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp',
                        }}
                        size="large"
                    />
                    <Avatar
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
                    />
                </View>
                <ListItem.Content style={{ height: '100%', gap: 8 }}>
                    <ListItem.Title>
                        {user.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{user.id}</ListItem.Subtitle>
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
                    {/* {isConnected && <Text><Badge status="success" /></Text>} */}

                </ListItem.Content>
            </ListItem>
            <Divider style={{ marginLeft: 108 }} />
        </View>
    );
};

export default StudentCard;
