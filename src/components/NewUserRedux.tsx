// Import necessary dependencies
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './yourRootReducer'; // Import your root reducer

import { setNewUser, updateNewUserField, clearNewUser } from '../redux/slices/newUserSlice';
import { Gender, NewUserT } from '../types/user';
import { RootState } from '../redux/store';

const ReduxTestComponent: React.FC = () => {
    const dispatch = useDispatch();
    const newUser = useSelector((state: RootState) => state.newUser.newUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState<Gender | null>(null);
    const [nationality, setNationality] = useState('');
    const [country, setCountry] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [learningLanguage, setLearningLanguage] = useState('');
    const [deviceIdentifier, setDeviceIdentifier] = useState('');

    const handleSetNewUser = () => {
        const newUserData: NewUserT = {
            email,
            password,
            name,
            age,
            gender,
            nationality,
            country,
            native_language: nativeLanguage,
            teaching_language: teachingLanguage,
            learning_language: learningLanguage,
        };

        dispatch(setNewUser(newUserData));
    };

    const handleUpdateField = () => {
        // You can update a specific field using the updateNewUserField action
        dispatch(updateNewUserField({ key: 'email', value: 'updated@example.com' }));
    };

    const handleClearNewUser = () => {
        dispatch(clearNewUser());
    };

    return (
        <View>
            <Text>New User Data:</Text>
            {newUser && (
                <View>
                    <Text>Email: {newUser.email}</Text>
                    <Text>Password: {newUser.password}</Text>
                    <Text>Name: {newUser.name}</Text>
                    <Text>gender: {newUser.gender}</Text>
                    <Text>age: {newUser.age}</Text>
                    <Text>Nationality: {newUser.nationality}</Text>
                    <Text>Country: {newUser.country}</Text>
                    <Text>Native Language: {newUser.native_language}</Text>
                    <Text>Teaching Language: {newUser.teaching_language}</Text>
                    <Text>Learning Language: {newUser.learning_language}</Text>
                </View>
            )}

            <Text>Update Email:</Text>
            <TextInput
                placeholder="New Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Button title="Update Email" onPress={handleUpdateField} />

            <Text>Set New User Data:</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Gge"
                value={name}
                onChangeText={(text) => setAge(Number(text))}
            />
            <TextInput
                placeholder="Gender"
                value={gender || ''}
                onChangeText={(text) => setGender(text as Gender)}
            />
            <TextInput
                placeholder="Nationality"
                value={nationality}
                onChangeText={(text) => setNationality(text)}
            />
            <TextInput
                placeholder="Country"
                value={country}
                onChangeText={(text) => setCountry(text)}
            />

            <TextInput
                placeholder="Native Language"
                value={nativeLanguage}
                onChangeText={(text) => setNativeLanguage(text)}
            />

            <TextInput
                placeholder="Teaching Language"
                value={teachingLanguage}
                onChangeText={(text) => setTeachingLanguage(text)}
            />

            <TextInput
                placeholder="Learning Language"
                value={learningLanguage}
                onChangeText={(text) => setLearningLanguage(text)}
            />


            <Button title="Set New User" onPress={handleSetNewUser} />

            <Button title="Clear New User" onPress={handleClearNewUser} />
        </View>
    );
};

export default ReduxTestComponent;
