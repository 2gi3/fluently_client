import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsList from "../screens/chat/ChatsList"
import DeleteMe from "../screens/deleteMe"
import Entypo from 'react-native-vector-icons/Entypo';
import { useCustomTabIcon } from "../functions/hooks/navigation";
import { sizes } from "../styles/variables/measures";
import Login from "../screens/Login";
import Profile from "../screens/profile";
import LogoutButton from "../components/user/logOutButton";
import { useUserData } from "../functions/hooks/user";




const Tabs = () => {
    const Tabs = createBottomTabNavigator()
    const user = useUserData()

    // const renderIcon = useCustomTabIcon()

    return (
        <Tabs.Navigator
            initialRouteName="Chats"
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
                        <Entypo
                            onPress={() => navigation.navigate('Students')}
                            name="new-message"
                            size={24}
                            color={'#8e8e8f'}
                            style={{ marginRight: sizes.S }} />)
                })}

            />
            <Tabs.Screen
                name="Community" component={DeleteMe} options={{
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'group-add')
                }}
            />
            <Tabs.Screen
                name="Profile" component={Profile} options={({ navigation }) => ({
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'person'),
                    headerRight: () => (
                        user ? <LogoutButton style={{ marginRight: sizes.S }} /> : null
                    )
                })}
            />
        </Tabs.Navigator>
    )
}
export default Tabs