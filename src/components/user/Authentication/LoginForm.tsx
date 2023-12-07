import { Button, Card, Icon, Input, Overlay } from "@rneui/themed"
import { sizes } from "../../../styles/variables/measures"
import { SafeAreaView, ScrollView, StyleSheet, Text, View, } from "react-native"
import { useLogIn } from "../../../functions/hooks/user"
import React, { useEffect, useState } from 'react'
import { clearNewUser } from "../../../redux/slices/newUserSlice"
import { useDispatch, useSelector } from 'react-redux';
import { emailRegex, passwordRegex } from "../../../regex"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AuthInput from "./AuthInput"
import colors from "../../../styles/variables/colors"
import { RootState } from "../../../redux/store"
import { setAmount } from "../../../redux/slices/counterSlice"
import styles from "./styles"
import { globalStyles } from "../../../styles"
import AsyncStorage from "@react-native-async-storage/async-storage"






const LoginForm = ({ toggleLoginState }: { toggleLoginState: (newLoginState: boolean) => void }) => {
    const count = useSelector((state: RootState) => state.counter.value);

    const dispatch = useDispatch();
    const { primaryFont, secondary } = colors

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
    const baseUrl = process.env.SERVER_URL
    const [showCount, setShowCount] = useState(false)

    const handleLogin = async () => {
        if (!passwordRegex.test(password) || !emailRegex.test(email)) {
            setErrorMessage('Please make sure all inputs are filled correctly')
            setVisible(true)
        } else {

            try {
                const response = await fetch(`${baseUrl}/api/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim()
                    }),
                });
                dispatch(setAmount(Number(response.headers.get('Ratelimit-Remaining'))))

                const accessToken = response.headers.get('Authorization')

                const { user, refreshToken } = await response.json()
                await AsyncStorage.setItem('speaky-access-token', JSON.stringify(accessToken));
                await AsyncStorage.setItem('speaky-refresh-token', JSON.stringify(refreshToken));



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

    useEffect(() => {
        if (count && count < 5) {
            setShowCount(true)
        }
        console.log({ count })
    }, [count])

    return (
        <ScrollView style={styles.scrollView}>
            <Card containerStyle={styles.cardContainer}>
                <Card.Title h3>Welcome back!</Card.Title>
                <Card.Divider />
                <View style={{ marginVertical: sizes.M }}>

                    <AuthInput
                        autoFocus={true}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        onBlur={() => setDispleyEmailErrors(true)}
                        errorMessage={emailRegex.test(email) || email === '' || !displeyEmailErrors ? undefined : 'Please provide a valid email'}
                    />
                    {showCount && <View style={{ margin: 'auto' }}>
                        <Text style={{ color: colors.danger, fontSize: 14, fontWeight: '500' }}>Remaining attempts: {count}</Text>
                    </View>
                    }
                    <AuthInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text.trim())}
                        onBlur={() => setDispleyPasswordErrors(true)}
                        errorMessage={passwordRegex.test(password) || password === '' || !displeyPasswordErrors ? undefined : 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'}
                        secureTextEntry={true}
                    />
                    <Button
                        iconRight
                        icon={
                            <Icon
                                name="navigate-next"
                                color={primaryFont}
                                iconStyle={{ marginLeft: 10, marginBottom: -1 }}
                            />
                        }
                        buttonStyle={globalStyles.whideButton}
                        title="Log in"
                        onPress={handleLogin}
                    />
                    <Card.Divider style={{
                        marginBottom: sizes.M,
                    }} />
                    <Text style={{
                        marginBottom: sizes.S,
                    }} >You don't have an account yet?</Text>
                    <Button type="outline" onPress={() => toggleLoginState(false)}>
                        Create an account
                    </Button>

                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                        overlayStyle={{ backgroundColor: secondary, padding: sizes.M }}>
                        <Text style={{ marginVertical: sizes.M }} >{errorMessage}</Text>


                        <Button
                            icon={
                                <Icon
                                    name="close"
                                    type="material-icons"
                                    color={secondary}
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