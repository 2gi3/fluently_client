import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import ChatScreen from "../screens/chat/ChatScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ChatsList from "../screens/chat/ChatsList"
import StudentsList from "../screens/chat/StudentsList"
import chatsData from '../../mock_data/chatsData.json'
import { RootStackParamList } from "../types/navigation"
import Tabs from "./Tabs"
import Login from "../components/user/LoginForm"
import PublicProfile from '../screens/profile/publicProfile'
import colors from '../styles/variables/colors'



const Stack = createNativeStackNavigator<RootStackParamList>()


const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleStyle: {
                    color: colors.secondaryFont
                }
            }}>
                <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='Students' component={StudentsList} />
                <Stack.Screen name='Student' component={PublicProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigator