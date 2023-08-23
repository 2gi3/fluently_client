import { Avatar, Divider, ListItem, Text, color } from "@rneui/base"
import { ScrollView, View } from "react-native"
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';
import { UserT } from "../../types/user";
import { sizes } from "../../styles/variables/measures";

const Dashboard = ({ user }: { user: UserT }) => {
    // const user = useSelector((state: RootState) => state.user.user);
    // console.log(user)
    const { XS, S, M, L, XL } = sizes

    return (
        <ScrollView>
            <ListItem>
                <ListItem.Content style={{
                    alignItems: 'center',
                    paddingVertical: M
                }}>
                    <Avatar
                        size={XL}
                        rounded
                        source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                        title="Bj"
                        containerStyle={{ backgroundColor: 'grey' }}
                    >
                        <Avatar.Accessory size={23} />
                    </Avatar>
                    <View>
                        <Text h3 style={{ marginTop: S }}>{user.name}</Text>
                        <Text>{user.country}</Text>
                    </View>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <View style={{ marginVertical: M }}>
                <ListItem >
                    <ListItem.Content style={{ paddingTop: M }}>
                        <ListItem.Title>You are learning</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>{user.learning_language}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>


                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>You are helping with</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>{user.teaching_language}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>

                <ListItem>
                    <ListItem.Content style={{ paddingBottom: M }}>
                        <ListItem.Title>About yourself</ListItem.Title>
                        <Avatar.Accessory size={23} />
                        {user.description ?
                            <ListItem.Subtitle style={{ marginTop: 5 }}>{user.description}</ListItem.Subtitle>
                            : <ListItem.Subtitle style={{ color: '#666666', marginTop: 5 }}>Tell us about yourself, how can you help people improve their language, and how would you like to be helped</ListItem.Subtitle>

                        }
                    </ListItem.Content>
                </ListItem>
                <Divider />
            </View>
            <ListItem>
                <ListItem.Content style={{ paddingVertical: M }}>
                    <ListItem.Title>Personal details:</ListItem.Title>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Email: <Text style={{ color: '#666666' }}>{user.email}</Text> </ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Nationality: <Text style={{ color: '#666666' }}>{user.nationality}</Text></ListItem.Subtitle>
                    <ListItem.Subtitle style={{ marginTop: 5 }}>Native Language: <Text style={{ color: '#666666' }}>{user.native_language}</Text></ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </ScrollView>
    )
}

export default Dashboard;
