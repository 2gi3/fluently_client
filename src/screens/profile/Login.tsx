import { Button, Card, Icon, Input } from "@rneui/base"
import { sizes } from "../../styles/variables/measures"
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from "react-native"
import { useLogIn } from "../../functions/hooks/user"
import { useState } from 'react'
import { clearNewUser } from "../../redux/slices/newUserSlice"
import { useDispatch, useSelector } from 'react-redux';





const Login = ({ toggleLoginState }: { toggleLoginState: (newLoginState: boolean) => void }) => {
    const dispatch = useDispatch();

    const logIn = useLogIn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        try {

            const response = await fetch('http://192.168.43.235:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const user = await response.json()
            console.log(user)
            logIn(user)
            dispatch(clearNewUser());

            if (response.ok) {

                console.log('Logged in successfully');

            } else {
                console.error('Failed to Log in');
            }


        } catch (error) {
            console.error('An error occurred while creating the user:', error);
        } finally {

        }

    }

    return (
        <ScrollView style={{
            marginHorizontal: sizes.S
        }}>
            <Card containerStyle={{
                maxWidth: 420,
                marginHorizontal: 'auto',
                marginVertical: sizes.L,
            }}>
                <Card.Title h3>Welcome back!</Card.Title>
                <Card.Divider />
                <View style={{
                    marginVertical: sizes.M,
                }}>

                    <Input
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        errorStyle={{ color: 'red' }}
                        // errorMessage='ENTER A VALID ERROR HERE'
                        style={{
                            paddingHorizontal: sizes.XS
                        }}
                        containerStyle={{
                            marginBottom: sizes.M,
                        }}
                    />

                    <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        errorStyle={{ color: 'red' }}
                        // errorMessage='ENTER A VALID ERROR HERE'
                        style={{
                            paddingHorizontal: sizes.XS
                        }}
                    />
                    <Button
                        iconRight
                        icon={
                            <Icon
                                name="navigate-next"
                                color="#ffffff"
                                iconStyle={{ marginLeft: 10, marginBottom: -1 }}
                            />
                        }
                        buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: sizes.M,
                            marginTop: sizes.M
                        }}
                        title="Log in"
                        onPress={handleLogin}
                    />
                    <Card.Divider style={{
                        marginBottom: sizes.M,
                    }} />
                    <Text style={{
                        marginBottom: sizes.S,
                    }} >You don't have an account yet?</Text>
                    <Button size="sm" type="outline" onPress={() => toggleLoginState(false)}>
                        Create an account
                    </Button>
                </View>

            </Card>
        </ScrollView>
    )
}

export default Login