import { useState, useEffect } from 'react';
import { Button, Card, Icon, Text } from "@rneui/base";
import { Input } from "@rneui/themed";
import { SafeAreaView, ScrollView, StyleSheet, View, } from "react-native"
import { sizes } from "../../styles/variables/measures";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { setNewUser, updateNewUserField } from '../../redux/slices/newUserSlice';
import { NewUserT } from '../../types/user';




const Signup = () => {
    const dispatch = useDispatch();
    const newUser = useSelector((state: RootState) => state.newUser.newUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nationality, setNationality] = useState('');
    const [country, setCountry] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');
    const [deviceIdentifier, setDeviceIdentifier] = useState('');

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
            device_identifier: deviceIdentifier,
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
                device_identifier: deviceIdentifier,
            };
            dispatch(setNewUser(newUserData));
            const response = await fetch('http://2620:119:35/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });

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
        console.log(newUser);
    }, [newUser]);

    return (
        <ScrollView style={{
            marginHorizontal: sizes.S
        }}>
            <View>
                <Text>hello
                    {newUser && newUser.toString()}
                    bye
                    <View>
                        {newUser && <View>
                            <Text>Email: {newUser.email}</Text>
                            <Text>Password: {newUser.password}</Text>
                        </View>}
                    </View>

                </Text>
            </View>
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
                        <Input
                            placeholder="Device Identifier"
                            value={deviceIdentifier}
                            onChangeText={(text) => setDeviceIdentifier(text)}
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

