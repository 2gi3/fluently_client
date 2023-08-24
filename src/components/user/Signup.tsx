import { useState, useEffect } from 'react';
import { Button, Card, Icon, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native"
import { sizes } from "../../styles/variables/measures";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { clearNewUser, setNewUser, updateNewUserField } from '../../redux/slices/newUserSlice';
// import { setUser, updateUserField } from '../../redux/slices/userSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewUserT } from '../../types/user';
// import { logIn } from '../../redux/slices/statusSlice';
import { useLogIn } from '../../functions/hooks/user';




const Signup = () => {
    const dispatch = useDispatch();
    const newUser = useSelector((state: RootState) => state.newUser.newUser);
    const logIn = useLogIn()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nationality, setNationality] = useState('');
    const [country, setCountry] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');

    // const handleUpdateField = () => {
    //     // You can update a specific field using the updateNewUserField action
    //     dispatch(updateNewUserField({ key: 'email', value: email }));
    //     dispatch(updateNewUserField({ key: 'password', value: password }));
    //     // console.log(email)
    //     // console.log(password)
    //     // console.log(newUser)


    // };

    const handleSetNewUser = () => {
        const newUserData: NewUserT = {
            email,
            password,
            name,
            nationality,
            country,
            native_language: nativeLanguage,
            teaching_language: teachingLanguage,
            learning_language: learningLanguage,
        };

        dispatch(setNewUser(newUserData));
    };
    const createUser = async () => {
        try {
            const newUserData = {
                email,
                password,
                name,
                nationality,
                country,
                native_language: nativeLanguage,
                teaching_language: teachingLanguage,
                learning_language: learningLanguage,
            };
            const response = await fetch('http://192.168.43.235:3000/api/user/signup', {
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
        // console.log(newUser);
    }, [newUser]);

    return (
        <ScrollView style={{
            marginHorizontal: sizes.S
        }}>

            <Card containerStyle={{
                maxWidth: 420,
                marginHorizontal: 'auto',
                marginVertical: sizes.L,
            }}>
                <Card.Title h3>Start learning</Card.Title>
                <Card.Divider />

                {!newUser.email && !newUser.password ?
                    <View style={{
                        marginVertical: sizes.M,
                    }}>

                        <Input
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                            containerStyle={{
                                marginBottom: sizes.M,
                            }}
                        />

                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />
                        <Button
                            // icon={
                            //     <Icon
                            //         name="code"
                            //         color="#ffffff"
                            //         iconStyle={{ marginRight: 10 }}
                            //     />
                            // }
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                            }}
                            title="Log in"
                            onPress={handleSetNewUser}
                        />
                    </View>
                    : <>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                            containerStyle={{
                                marginBottom: sizes.M,
                            }}
                        />

                        <Input
                            placeholder="Nationality"
                            value={nationality}
                            onChangeText={(text) => setNationality(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />
                        <Input
                            placeholder="Country"
                            value={country}
                            onChangeText={(text) => setCountry(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />
                        <Input
                            placeholder="Native Language"
                            value={nativeLanguage}
                            onChangeText={(text) => setNativeLanguage(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />
                        <Input
                            placeholder="Teaching Language"
                            value={teachingLanguage}
                            onChangeText={(text) => setTeachingLanguage(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />
                        <Input
                            placeholder="Learning Language"
                            value={learningLanguage}
                            onChangeText={(text) => setLearningLanguage(text)}
                            errorStyle={{ color: 'red' }}
                            errorMessage='ENTER A VALID ERROR HERE'
                            style={{
                                paddingHorizontal: sizes.XS
                            }}
                        />

                        <Button
                            // icon={
                            //     <Icon
                            //         name="code"
                            //         color="#ffffff"
                            //         iconStyle={{ marginRight: 10 }}
                            //     />
                            // }
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                            }}
                            title="Log in"
                            onPress={createUser}
                        />

                    </>}




            </Card>
        </ScrollView>



    )
}
export default Signup

