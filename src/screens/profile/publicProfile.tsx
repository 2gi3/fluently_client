import { Avatar, Button, Icon, ListItem, Skeleton, Text } from "@rneui/base"
import { ScrollView, View } from "react-native"
import { sizes } from "../../styles/variables/measures"
import { useGetUsers, useUserData } from "../../functions/hooks/user"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect } from "react"
import { createNewChatroom } from "../../functions/chat"

const PublicProfile = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { user: user1, loading: loading1 } = useUserData();


    const { XS, S, M, L, XL } = sizes
    const studentId = (route.params as { id?: string })?.id;

    if (!studentId) {
        console.log('waiting for id')
    }

    //@ts-ignore
    const url = process.env.SERVER_URL

    // const url = `${process.env.SERVER_URL}/api/user/${studentId}`

    const { loading, error, users, refreshData, isValidating } = useGetUsers(`${url}/api/user/${studentId}`);



    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ title: route.params?.name, headerTitleAlign: 'center' })

    }, [route.params])


    return (
        loading || loading1 ?
            <View style={{ flexDirection: 'column', gap: sizes.S }} >
                <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            </View> :
            <ScrollView>
                <ListItem containerStyle={{ marginBottom: M }}>
                    <ListItem.Content style={{
                        alignItems: 'center',
                        paddingVertical: S
                    }}>
                        <Avatar
                            size={XL}
                            rounded
                            source={{ uri: users.image }}
                            title="Hi"
                            containerStyle={{ backgroundColor: 'grey' }}
                        />


                        <View>
                            <View>
                                <Text h3 style={{ marginTop: S }}>{users.name}</Text>

                            </View>
                            <Text>{users.country}</Text>
                        </View>

                    </ListItem.Content>
                </ListItem>

                <ListItem containerStyle={{ marginBottom: M }}>
                    <ListItem.Content style={{ paddingBottom: S }}>
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
                    // icon={
                    //     <Icon
                    //         name="chat-bubble-outline"
                    //         color="#ffffff"
                    //         iconStyle={{ marginLeft: 10, marginBottom: -1 }}
                    //     />
                    // }
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: sizes.M,
                        marginTop: 0
                    }}
                    title="Exchange language"
                    onPress={async () => {
                        //@ts-ignore
                        const newChatroom = await createNewChatroom(`${url}/api/chat`, user1?.id, users.id);
                        // @ts-ignore
                        navigation.navigate('Chat', {
                            id: newChatroom.newChatroom.id!.toString(),
                            user2id: newChatroom.newChatroom.user2Id,
                            user2name: users.name
                        })
                    }}
                />


            </ScrollView>

    )
}
export default PublicProfile