import { Button, Card, Icon, Input, Overlay } from "@rneui/base"
import { sizes } from "../../styles/variables/measures"
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from "react-native"
import { useLogIn } from "../../functions/hooks/user"
import { useState } from 'react'
import { clearNewUser } from "../../redux/slices/newUserSlice"
import { useDispatch, useSelector } from 'react-redux';
import { emailRegex, passwordRegex } from "../../regex"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AuthInput from "./AuthInput"






const LoginForm = ({ toggleLoginState }: { toggleLoginState: (newLoginState: boolean) => void }) => {
    const dispatch = useDispatch();

    const logIn = useLogIn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>()
    const [hideText, setHideText] = useState(true)
    const [displeyEmailErrors, setDispleyEmailErrors] = useState(false)
    const [displeyPasswordErrors, setDispleyPasswordErrors] = useState(false)
    const toggleOverlay = () => {
        setErrorMessage(null)
        setVisible(!visible);

    };


    const handleLogin = async () => {
        if (!passwordRegex.test(password) || !emailRegex.test(email)) {
            setErrorMessage('Please make sure all inputs are filled correctly')
            setVisible(true)
        } else {

            try {

                const response = await fetch('http://192.168.43.235:3000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim()
                    }),
                });
                const user = await response.json()
                console.log(user)


                if (response.ok) {

                    console.log('Logged in successfully');
                    logIn(user)
                    dispatch(clearNewUser());

                } else {
                    console.error('Failed to Log in');
                    setErrorMessage(user.error)
                    setVisible(true)

                }


            } catch (error) {
                console.error('An error occurred while creating the user:', error);
                setErrorMessage('Sorry, there is a problem with the server, please try again later')
                setVisible(true)
            } finally {

            }
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

                    <AuthInput
                        autoFocus={true}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onBlur={() => setDispleyEmailErrors(true)}
                        errorMessage={emailRegex.test(email) || email === '' || !displeyEmailErrors ? undefined : 'Please provide a valid email'}
                    />
                    <AuthInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={() => setDispleyPasswordErrors(true)}
                        errorMessage={passwordRegex.test(password) || password === '' || !displeyPasswordErrors ? undefined : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}
                        secureTextEntry={true}
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
                            marginTop: 0
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

                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                        overlayStyle={{ backgroundColor: 'white', padding: sizes.M }}>
                        <Text style={{ marginVertical: sizes.M }} >{errorMessage}</Text>


                        <Button
                            icon={
                                <Icon
                                    name="close"
                                    type="material-icons"
                                    color="white"
                                    size={25}
                                // iconStyle={}
                                />
                            }
                            // title="Try again"
                            onPress={toggleOverlay}
                            buttonStyle={{ width: 'auto', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        />
                    </Overlay>
                </View>

            </Card>
        </ScrollView>
    )
}

export default LoginForm