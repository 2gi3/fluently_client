import React from 'react';
import { Avatar, ListItem, Divider, Badge } from "@rneui/base"
import { View } from "react-native"
import { UserT } from '../../../types/user';
import { styles } from './styles';



const StudentCard = ({ user, isConnected }: { user: UserT, isConnected: boolean }) => {

    return (

        <View key={String(`${user.id}#User`)} style={styles.container}>
            <ListItem>
                <View style={styles.avatarContainer}>
                    {isConnected && (
                        <View style={styles.badgeContainer}>
                            <Badge status="success" />
                        </View>
                    )}
                    <Avatar
                        rounded
                        source={{
                            uri: user.image || 'https://res.cloudinary.com/gippolito/image/upload/v1697039397/profilePlaceholder_ytrsld.webp',
                        }}
                        size="large"
                    />
                    <Avatar
                        rounded
                        source={require('../../../../assets/images/flags/FlagItalian.webp')}
                        size={24}
                        containerStyle={{ position: 'absolute', bottom: 0 }}
                        avatarStyle={styles.avatar}
                    />
                </View>
                <ListItem.Content style={styles.subtitleContainer}>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.description ? user.description : ''}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content style={styles.metadataContainer}>{/* Add your metadata content here */}</ListItem.Content>
            </ListItem>
            <Divider style={styles.divider} />
        </View>
    );
};

export default StudentCard;
