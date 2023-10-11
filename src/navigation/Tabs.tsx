import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsList from "../screens/chat/ChatsList"
import DeleteMe from "../screens/deleteMe"
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCustomTabIcon } from "../functions/hooks/navigation";
import { sizes } from "../styles/variables/measures";
import Profile from "../screens/profile";
import LogoutButton from "../components/user/logOutButton";
import { useUserData } from "../functions/hooks/user";
import { Text, View, } from "react-native"
import { Button } from "@rneui/base";
import TopTabButton from "../components/navigation/TopTabButton";





const Tabs = () => {
    const Tabs = createBottomTabNavigator()
    const user = useUserData()

    // const renderIcon = useCustomTabIcon()

    return (
        <Tabs.Navigator
            initialRouteName="Profile"
        // screenOptions={{
        //     headerStyle:{

        //     },
        //     tabBarStyle:{

        //     }
        // }}
        >
            <Tabs.Screen
                name="Chats" component={ChatsList} options={({ navigation }) => ({
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'chat-bubble-outline'),
                    headerRight: () => (
                        <TopTabButton
                            onPress={() => navigation.navigate('Students')}
                            iconName="handshake-outline"
                            label="Find a partner"
                        />
                    )
                })}

            />
            <Tabs.Screen
                name="Community" component={DeleteMe} options={{
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'people-outline')
                }}
            />
            <Tabs.Screen
                name="Profile" component={Profile} options={({ navigation }) => ({
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'person-outline'),
                    headerRight: () => (
                        user.user?.id ? <LogoutButton style={{ marginRight: sizes.S }} />
                            : null
                        //  (<Button onPress={() => navigation.navigate('Login')}
                        // ><Text>Log in
                        //         <Entypo
                        //             name="login"
                        //             size={24}
                        //             color={'#8e8e8f'}
                        //             style={{ marginRight: sizes.S }} />
                        //     </Text>
                        // </Button>)
                    )
                })}
            />
        </Tabs.Navigator>
    )
}
export default Tabs