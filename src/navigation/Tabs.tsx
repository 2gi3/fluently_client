import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsList from "../screens/chat/ChatsList"
import Courses from "../screens/learn/courses"
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
import { useGetChats } from '../functions/hooks/chat';

const CustomTabLabel = ({ label, position }) => {
    const margin = position === 'beside-icon' ? sizes.S : null
    return (
        <Text style={{ color: colors.secondaryFont, fontSize: 12, marginLeft: margin }}>{label}</Text>
    );
}



const Tabs = () => {
    const Tabs = createBottomTabNavigator()
    const user = useUserData()
    const { loading, error, chatrooms, refreshData, isValidating } = useGetChats();
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
                    backgroundColor: colors.secondary,
                },
                headerTitleStyle: {
                    color: colors.secondaryFont,
                    fontSize: 14,
                },
                tabBarStyle: {
                    backgroundColor: colors.secondary,
                },
                tabBarLabelStyle: {
                    color: colors.secondaryFont
                }
            }}
        >
            {user.user && (
                <Tabs.Screen
                    name="Chats"
                    options={({ navigation }) => ({
                        tabBarIcon: useCustomTabIcon('MaterialIcons', 'chat-bubble'),
                        tabBarLabel: 'Chats',
                        title: 'Use what you learn',
                        tabBarBadge: pendingChats.length > 0 ? pendingChats.length : undefined,
                        headerRight: () => (
                            <TopTabButton
                                onPress={() => navigation.navigate('Students')}
                                iconName="handshake-outline"
                                label="Find a partner"
                                type={chatrooms && chatrooms?.chatrooms.length > 0 ? "outline" : "solid"}
                            />
                        )
                    })}
                >
                    {(props) => {
                        return (
                            <ChatsList
                                {...props}
                                loading={loading}
                                error={error}
                                chatrooms={chatrooms}
                                refreshData={refreshData}
                                isValidating={isValidating}
                            />
                        );
                    }}
                </Tabs.Screen>

            )}




            {user.user && (
                <Tabs.Screen
                    name="Learn" component={Courses} options={({ navigation }) => ({
                        tabBarIcon: useCustomTabIcon('Ionicons', 'school'),
                        tabBarLabel: 'Learn',
                        title: 'A clear path towards your goals',
                        headerTitleAlign: 'center'
                    })}
                />
            )}



            {user.user && (
                <Tabs.Screen
                    name="Community" component={PostsGallery} options={({ navigation }) => ({
                        tabBarIcon: useCustomTabIcon('MaterialIcons', 'people'),
                        tabBarLabel: 'Community',
                        title: 'You are one of Us',
                        // tabBarBadge: pendingChats.length > 0 ? pendingChats.length : undefined,
                        headerRight: () => (
                            <TopTabButton
                                onPress={() => navigation.navigate('Create-post')}
                                iconName="pencil-plus-outline"
                                label="Create a post"
                            />
                        )
                    })}
                />
            )}
            <Tabs.Screen
                name="Profile" component={Profile} options={({ navigation }) => ({
                    tabBarIcon: useCustomTabIcon('MaterialIcons', 'person'),
                    tabBarLabel: 'Profile',
                    title: 'Let you true rself shine!',
                    headerTitleStyle: {
                        color: colors.secondaryFont,
                        fontSize: 14,
                    },
                    headerTitleAlign: 'left',
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