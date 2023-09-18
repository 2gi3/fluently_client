import { NavigationContainer } from "@react-navigation/native"
import ChatScreen from "../screens/chat/ChatScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ChatsList from "../screens/chat/ChatsList"
import StudentsList from "../screens/chat/StudentsList"
import chatsData from '../../mock_data/chatsData.json'
import { RootStackParamList } from "../types"
import Tabs from "./Tabs"
import Login from "../components/user/LoginForm"



const Stack = createNativeStackNavigator<RootStackParamList>()


const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                // headerStyle: {
                //     backgroundColor: 'lightblue'
                // },
                // headerTitleStyle: {
                // fontWeight: 'bold',
                // fontSize: 25,
                // color: 'tomato',
                // }
            }}>
                <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false }} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='Students' component={StudentsList} />
                {/* <Stack.Screen name='Login' component={Login} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigator