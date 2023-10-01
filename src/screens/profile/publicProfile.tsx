import { Avatar, ListItem, Skeleton, Text } from "@rneui/base"
import { ScrollView, View } from "react-native"
import { sizes } from "../../styles/variables/measures"
import { useGetUsers } from "../../functions/hooks/user"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useEffect } from "react"

const PublicProfile = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const { XS, S, M, L, XL } = sizes
    const studentId = route.params?.id;

    if (!studentId) {
        console.log('waiting for id')
    }

    //@ts-ignore
    const url = `${process.env.SERVER_URL}/api/user/${studentId}`

    const { loading, error, users, refreshData, isValidating } = useGetUsers(url);
    console.log(loading)
    console.log(users)


    useEffect(() => {
        // @ts-ignore
        navigation.setOptions({ title: route.params?.name, headerTitleAlign: 'center' })

    }, [route.params])


    return (
        loading ?
            <View style={{ flexDirection: 'column', gap: sizes.S }} >
                <Skeleton animation="wave" width={220} height={80} style={{ marginTop: sizes.M, marginBottom: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
                <Skeleton animation="wave" width={220} height={80} style={{ marginVertical: sizes.XS, marginLeft: sizes.M }} />
            </View> :
            <ScrollView>
                <ListItem containerStyle={{ marginBottom: M, padding: 0 }}>
                    <ListItem.Content style={{
                        alignItems: 'center',
                        paddingVertical: M
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
                    <ListItem.Content style={{ paddingBottom: M }}>
                        {/* <ListItem.Title>About yourself</ListItem.Title> */}

                        {users.description ?
                            <ListItem.Subtitle style={{ marginTop: 5 }}>{users.description}</ListItem.Subtitle>
                            : <ListItem.Subtitle style={{ color: '#ff6666', marginTop: 5 }}>
                                {users.name} has not uploadet an introduction yet.

                            </ListItem.Subtitle>


                        }
                    </ListItem.Content>
                </ListItem>
            </ScrollView>

    )
}
export default PublicProfile