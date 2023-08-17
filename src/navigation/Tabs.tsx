import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsList from "../screens/chat/ChatsList"
import DeleteMe from "../screens/deleteMe"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




const Tabs = () => {
    const Tabs = createBottomTabNavigator()

    const renderIcon = (iconName: string) => ({ focused }: { focused: boolean }) => (
        <MaterialIcons name={iconName} size={25} color={focused ? '#007aff' : '#8e8e8f'} />
    );

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
                name="Chats" component={ChatsList} options={{ tabBarIcon: renderIcon('chat-bubble-outline') }}
            />
            <Tabs.Screen
                name="Community" component={DeleteMe} options={{ tabBarIcon: renderIcon('group-add') }}
            />
        </Tabs.Navigator>
    )
}
export default Tabs