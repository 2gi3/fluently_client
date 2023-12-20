import React, { useState, useEffect } from 'react';
import { Button, Card, Divider, Icon, Overlay, Skeleton, Text } from "@rneui/themed";
import { Input } from "@rneui/themed";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View, } from "react-native"
import { sizes } from "../../../styles/variables/measures";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { clearNewUser, setNewUser, updateNewUserField } from '../../../redux/slices/newUserSlice';
import { Gender, NewUserT } from '../../../types/user';
import { useLocation, useLogIn } from '../../../functions/hooks/user';
import { emailRegex, passwordRegex, studentName } from '../../../regex';
import AuthInput from './AuthInput';
import LearnLanguageSelector from '../selectors/LearnLanguageSelector';
import GenderSelector from '../selectors/GenderSelector';
import DateOfBirthSelector from '../selectors/DateOfBirthSelector';
import colors from '../../../styles/variables/colors';
import { setAmount } from '../../../redux/slices/counterSlice';
import LanguageSelector from '../selectors/LanguageSelector';
import NationalitySelector from '../selectors/NationalitySelector';
import styles from './styles'
import { globalStyles } from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccessToken } from '../../../functions/auth';
import ConfirmationOverlay from '../ConfirmationOverlay';





const SignupForm = ({ toggleLoginState }: { toggleLoginState: (newLoginState: boolean) => void }) => {
    const count = useSelector((state: RootState) => state.counter.value);

    const { primaryFont, secondary } = colors
    const [city, country, loading, error] = useLocation()
    const dispatch = useDispatch();
    const newUser = useSelector((state: RootState) => state.newUser.newUser);
    const logIn = useLogIn()
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender | null>(null)
    const [nationality, setNationality] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');
    const [header, setHeader] = useState('Start learning')
    const [checkingUserExistence, setCheckingUserExistence] = useState(false)
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>()
    const [hideText, setHideText] = useState(true)
    const [displeyEmailErrors, setDispleyEmailErrors] = useState(false)
    const [displeyPasswordErrors, setDispleyPasswordErrors] = useState(false)
    const [displeyNameErrors, setDispleyNameErrors] = useState(false)
    const [showCount, setShowCount] = useState(false)
    const toggleOverlay = () => {
        setErrorMessage(null)
        setVisible(!visible);

    };
    const url = process.env.SERVER_URL!

    const [confirmationOverlayVisible, setConfirmationOverlayVisible] = useState(false);
    const [inputError, setInputError] = useState<string | undefined>()
    const [confirmationInput, setConfirmationInput] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);
    const [authAdded, setAuthAdded] = useState(false)
    const email = newUser.email
    const setEmail = (email: string) => {
        dispatch(updateNewUserField({ key: 'email', value: email }));
    }

    const handleSetNewUser = async () => {
        if (emailRegex.test(email) && passwordRegex.test(password)) {
            setAuthAdded(true)
            const newUserData: NewUserT = {
                email,
                password,
                name,
                age,
                gender,
                nationality,
                country: `${city}, ${country}`,
                native_language: nativeLanguage,
                teaching_language: teachingLanguage,
                learning_language: learningLanguage,
            };

            dispatch(setNewUser(newUserData));
        } else {
            setDispleyEmailErrors(true)
        }

    };
    const createUser = async () => {
        try {
            const newUserData = {
                email: email.trim(),
                password: password.trim(),
                name,
                age: newUser.age,
                gender: newUser.gender,
                nationality: newUser.nationality,
                country: `${city}, ${country}`,
                native_language: newUser.native_language,
                teaching_language: teachingLanguage,
                learning_language: newUser.learning_language,
            };
            const response = await fetch(`${url}/api/user/signup`, {
                method: 'POST',
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });

            setAccessToken(response)
            const { user, refreshToken } = await response.json()
            await AsyncStorage.setItem('speaky-refresh-token', JSON.stringify(refreshToken));
            logIn(user)


            dispatch(clearNewUser());

            if (response.ok) {
                console.log('User created successfully');
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('An error occurred while creating the user:', error);
        } finally {

        }
    };

    useEffect(() => {
        if (newUser.email && newUser.password) {
            setHeader('About yourself')
        }

    }, [newUser.email, newUser.password]);

    useEffect(() => {
        if (count && count < 6) {
            setShowCount(true)
        }
        console.log({ count })
    }, [count])

    useEffect(() => {
        setEmailChecked(false);
    }, [email]);

    return (
        <ScrollView style={styles.scrollView}>
            {checkingUserExistence ?
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: sizes.L }}>
                    <ActivityIndicator size="large" color={colors.tertiary} />
                </View>
                : <Card containerStyle={styles.cardContainer}>
                    <Card.Title h3>{header}</Card.Title>
                    <Card.Divider />

                    {!authAdded ?
                        <View style={{
                            marginVertical: sizes.M,
                        }}>
                            {showCount && <View style={{ margin: 'auto' }}>
                                <Text style={{ color: colors.danger, fontSize: 14, fontWeight: '500' }}>Remaining attempts: {count}</Text>
                            </View>
                            }
                            <AuthInput
                                autoFocus={!emailRegex.test(email)}
                                placeholder="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text.trim())}
                                onBlur={async () => {
                                    if (emailRegex.test(email) && !checkingUserExistence && !confirmationOverlayVisible && !emailChecked) {
                                        setCheckingUserExistence(true)
                                        const response: any = await fetch(`${url}/api/user/exists/${email}`, {
                                            method: 'GET',
                                            // credentials: 'include',
                                        });
                                        setCheckingUserExistence(false)

                                        const userExists = await response.json();
                                        dispatch(setAmount(Number(response.headers.get('Ratelimit-Remaining'))))
                                        setEmailChecked(true)
                                        // if (!userExists.ok) {
                                        //     throw new Error('We are having server problems, please try again later');
                                        // }
                                        if (userExists.exists) {
                                            setConfirmationOverlayVisible(true)
                                            // setEmail('')
                                        } else {
                                            setConfirmationOverlayVisible(false)
                                        }
                                    }
                                    setDispleyEmailErrors(true)
                                }}
                                errorMessage={emailRegex.test(email) || email === '' || !displeyEmailErrors ? undefined : 'Please provide a valid email'}
                            />
                            <AuthInput
                                autoFocus={emailRegex.test(email)}
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
                                title="Create account"
                                onPress={handleSetNewUser}
                            />
                            <Card.Divider style={{
                                marginBottom: sizes.M,
                            }} />
                            <Text style={{
                                marginBottom: sizes.S,
                            }} >You already have an account?</Text>

                            <Button type="outline" onPress={() => toggleLoginState(true)}>
                                Log in
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
                        : loading ?
                            <View style={{ flexDirection: 'column', gap: sizes.S }} >
                                <Skeleton animation="wave" width={180} height={60} />
                                <Skeleton animation="wave" width={180} height={60} />
                                <Skeleton animation="wave" width={180} height={60} />
                            </View> :
                            <View style={{ paddingTop: sizes.M }}>
                                <AuthInput
                                    autoFocus={true}
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                    onBlur={() => setDispleyNameErrors(true)}
                                    errorMessage={!displeyNameErrors || studentName.test(name) || name === '' ? undefined : 'The name can be either Thai or English, minimum 2 and maximum 20 characters'}
                                />
                                {/* <Input
                            autoFocus={true}
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            errorStyle={{ color: 'red' }}
                            // errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                            containerStyle={{
                                marginBottom: sizes.M,
                            }}
                        /> */}
                                <NationalitySelector />
                                <LanguageSelector />

                                {/* <Input
                            placeholder="Teaching Language"
                            value={teachingLanguage}
                            onChangeText={(text) => setTeachingLanguage(text)}
                            errorStyle={{ color: 'red' }}
                            // errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                            containerStyle={{
                                marginBottom: sizes.M,
                            }}
                        /> */}
                                <LearnLanguageSelector />
                                <GenderSelector />
                                <DateOfBirthSelector />

                                <Button
                                    buttonStyle={globalStyles.whideButton}
                                    title="Create your account"
                                    onPress={createUser}
                                />

                            </View>}

                </Card>
            }

            {confirmationOverlayVisible && <ConfirmationOverlay
                warning={`Account already exists`}
                isVisible={confirmationOverlayVisible}
                onBackdropPress={() => setConfirmationOverlayVisible(!confirmationOverlayVisible)}
                onConfirm={() => toggleLoginState(true)}
                onCancel={() => {
                    setConfirmationOverlayVisible(false);
                    setInputError(undefined);
                    setConfirmationInput('');
                }}
                consfirmButtonTitle='Log In'
            />

            }
        </ScrollView>



    )

}
export default SignupForm

