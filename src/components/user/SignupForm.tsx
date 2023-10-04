import { useState, useEffect } from 'react';
import { Button, Card, Divider, Icon, Overlay, Skeleton, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native"
import { sizes } from "../../styles/variables/measures";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { clearNewUser, setNewUser, updateNewUserField } from '../../redux/slices/newUserSlice';
import { Gender, NewUserT } from '../../types/user';
import { useLocation, useLogIn } from '../../functions/hooks/user';
import { emailRegex, passwordRegex, studentName } from '../../regex';
import AuthInput from './AuthInput';
import LanguagePicker from './LanguagePicker';
import NationalityPicker from './NationalityPicker';
import LearnLanguageSelector from './LearnLanguageSelector';
import GenderSelector from './GenderSelector';
import DateOfBirthSelector from './DateOfBirthSelector';




const SignupForm = ({ toggleLoginState }: { toggleLoginState: (newLoginState: boolean) => void }) => {

    const [city, country, loading, error] = useLocation()
    const dispatch = useDispatch();
    const newUser = useSelector((state: RootState) => state.newUser.newUser);
    const logIn = useLogIn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender | null>(null)
    const [nationality, setNationality] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');
    const [header, setHeader] = useState('Start learning')

    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>()
    const [hideText, setHideText] = useState(true)
    const [displeyEmailErrors, setDispleyEmailErrors] = useState(false)
    const [displeyPasswordErrors, setDispleyPasswordErrors] = useState(false)
    const [displeyNameErrors, setDispleyNameErrors] = useState(false)
    const toggleOverlay = () => {
        setErrorMessage(null)
        setVisible(!visible);

    };


    const handleSetNewUser = async () => {
        if (emailRegex.test(email) && passwordRegex.test(password)) {
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
            //@ts-ignore
            const response = await fetch(`${process.env.SERVER_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });
            const data = await response.json()
            logIn(data.user)
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

    return (
        <ScrollView style={{
            marginHorizontal: sizes.S
        }}>
            <Card containerStyle={{
                maxWidth: 420,
                marginHorizontal: 'auto',
                marginVertical: sizes.L,
            }}>
                <Card.Title h3>{header}</Card.Title>
                <Card.Divider />

                {!newUser.email && !newUser.password ?
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
                            title="Create account"
                            onPress={handleSetNewUser}
                        />
                        <Card.Divider style={{
                            marginBottom: sizes.M,
                        }} />
                        <Text style={{
                            marginBottom: sizes.S,
                        }} >You already have an account?</Text>

                        <Button size="sm" type="outline" onPress={() => toggleLoginState(true)}>
                            Log in
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
                    : loading ?
                        <View style={{ flexDirection: 'column', gap: sizes.S }} >
                            <Skeleton animation="wave" width={180} height={60} />
                            <Skeleton animation="wave" width={180} height={60} />
                            <Skeleton animation="wave" width={180} height={60} />
                        </View> : <View style={{ paddingTop: sizes.M }}>
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
                            <NationalityPicker />
                            <LanguagePicker />

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
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: sizes.M,
                                    marginTop: sizes.M
                                }}
                                title="Create your account"
                                onPress={createUser}
                            />

                        </View>}

            </Card>
        </ScrollView>



    )
}
export default SignupForm

