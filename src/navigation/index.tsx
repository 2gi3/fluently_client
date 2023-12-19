import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import ChatScreen from "../screens/chat/ChatScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ChatsList from "../screens/chat/ChatsList"
import StudentsList from "../screens/chat/StudentsList"
import chatsData from '../../mock_data/chatsData.json'
import { RootStackParamList } from "../types/navigation"
import Tabs from "./Tabs"
import PublicProfile from '../screens/profile/publicProfile'
import colors from '../styles/variables/colors'
import PostsGallery from '../screens/community/postsGallery'
import CreatePost from '../screens/community/CreatePost'
import Post from '../screens/community/Post'



const Stack = createNativeStackNavigator<RootStackParamList>()


const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                    color: colors.secondaryFont,
                    fontSize: 14,
                },
            }}>
                <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='Students' component={StudentsList} />
                <Stack.Screen name='Student' component={PublicProfile} />
                <Stack.Screen name='Create-post' component={CreatePost} />
                <Stack.Screen name='Post' component={Post} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigator