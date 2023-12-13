import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsList from "../screens/chat/ChatsList"
import DeleteMe from "../screens/deleteMe"
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCustomTabIcon } from "../functions/hooks/navigation";
import { sizes } from "../styles/variables/measures";
import Profile from "../screens/profile";
import LogoutButton from "../components/user/Authentication/logOutButton";
import { useUserData } from "../functions/hooks/user";
import { ActivityIndicator, Text, View, } from "react-native"
import { Button } from "@rneui/base";
import TopTabButton from "../components/navigation/TopTabButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import colors from '../styles/variables/colors';
import PostsGallery from '../screens/community/postsGallery';

const CustomTabLabel = ({ label, position }) => {
    const margin = position === 'beside-icon' ? sizes.S : null
    return (
        <Text style={{ color: colors.secondaryFont, fontSize: 12, marginLeft: margin }}>{label}</Text>
    );
}



const Tabs = () => {
    const Tabs = createBottomTabNavigator()
    const user = useUserData()
    const pendingChats = useSelector((state: RootState) => state.chat.pendingChats);


    // const renderIcon = useCustomTabIcon()
    if (user.loading) {
        return <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 200 }} />
    }


    return (
        <Tabs.Navigator
            initialRouteName={user.user ? "Community" : "Profile"}
            screenOptions={{
                tabBarLabel: (route) => <CustomTabLabel label={route.children} position={route.position} />,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                    color: colors.secondaryFont
                },
                tabBarStyle: {
                    backgroundColor: colors.primary,
                }
            }}
        >
            {user.user && (
                <Tabs.Screen
                    name="Chats" component={ChatsList} options={({ navigation }) => ({
                        tabBarIcon: useCustomTabIcon('MaterialIcons', 'chat-bubble'),
                        tabBarBadge: pendingChats.length > 0 ? pendingChats.length : undefined,
                        headerRight: () => (
                            <TopTabButton
                                onPress={() => navigation.navigate('Students')}
                                iconName="handshake-outline"
                                label="Find a partner"
                            />
                        )
                    })}

                />
            )}
            {user.user && (
                <Tabs.Screen
                    name="Community" component={PostsGallery} options={{
                        tabBarIcon: useCustomTabIcon('MaterialIcons', 'people'),
                    }}
                />
            )}
            <Tabs.Screen
                name="Profile" component={Profile} options={({ navigation }) => ({
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'person'),
                    headerRight: () => (
                        user.user?.id ? <LogoutButton style={{ marginRight: sizes.S }} />
                            : null

                    )
                })}
            />
        </Tabs.Navigator>
    )
}
export default Tabs