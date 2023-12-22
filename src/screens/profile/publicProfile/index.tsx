import { Avatar, Button, Icon, ListItem, Skeleton, Text } from "@rneui/themed"
import { ScrollView, View } from "react-native"
import { sizes } from "../../../styles/variables/measures"
import { useGetUsers, useUserData } from "../../../functions/hooks/user"
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect } from "react"
import { createNewChatroom } from "../../../functions/chat"
import { ChatroomT } from "../../../types/chat"
import colors from "../../../styles/variables/colors"
import styles from './styles'
import ProfileCardSkeleton from "./skeleton"

const PublicProfile = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { user: user1, loading: loading1 } = useUserData();
    const { XS, S, M, L, XL } = sizes
    const studentId = (route.params as { id?: string })?.id;

    if (!studentId) {
        console.log('waiting for id')
    }

    const url = process.env.SERVER_URL
    const { loading, error, users, refreshData, isValidating } = useGetUsers(`${url}/api/user/${studentId}`);



    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ title: route.params?.name, headerTitleAlign: 'center' })

    }, [route.params])


    return (
        loading || loading1 ?
            <ProfileCardSkeleton /> :
            (<ScrollView>
                <ListItem containerStyle={styles.listItemContainer}>
                    <ListItem.Content style={styles.avatarContainer}>
                        <Avatar
                            size={XL}
                            rounded
                            source={{ uri: users.image }}
                            title="Hi"
                            containerStyle={{ backgroundColor: colors.primary }}
                        />


                        <View>
                            <View>
                                <Text h3 style={{ margin: S }}>{users.name}</Text>

                            </View>
                            <Text>{users.country === 'null, null' ? 'Location not shared' : users.country}</Text>
                        </View>

                    </ListItem.Content>
                </ListItem>

                <ListItem>
                    <ListItem.Content style={{ padding: S }}>
                        {/* <ListItem.Title>About yourself</ListItem.Title> */}

                        {users.description ?
                            <ListItem.Subtitle style={{ marginTop: 5 }}>{users.description}</ListItem.Subtitle>
                            : <ListItem.Subtitle style={{ color: '#505050', marginTop: 5 }}>
                                {users.name} has no introduction yet.

                            </ListItem.Subtitle>


                        }
                    </ListItem.Content>
                </ListItem>


                <Button
                    iconRight
                    buttonStyle={styles.buttonStylePrimary}
                    title="Exchange language"
                    onPress={async () => {
                        //@ts-ignore
                        const newChatroom = await createNewChatroom(`${url}/api/chat`, user1?.id, users.id);
                        if (newChatroom.message === "Chatroom already exists") {
                            if (user1?.id === newChatroom?.chatroom?.user1Id) {
                                // @ts-ignore
                                navigation.navigate('Chat', {
                                    id: newChatroom?.chatroom?.id?.toString(),
                                    user2id: newChatroom?.chatroom?.user2Id
                                });
                            } else {
                                // @ts-ignore
                                navigation.navigate('Chat', {
                                    id: newChatroom?.chatroom?.id?.toString(),
                                    user2id: newChatroom?.chatroom?.user1Id
                                });
                            }


                        } else {
                            // @ts-ignore
                            navigation.navigate('Chat', {
                                id: newChatroom.newChatroom.id!.toString(),
                                user2id: newChatroom.newChatroom.user2Id,
                                // user2name: users.name
                            })
                        }
                    }}
                />


            </ScrollView>)

    )
}
export default PublicProfile