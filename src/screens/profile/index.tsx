import { View } from "react-native"
import Dashboard from "../../components/user/Dashboard";
import React, { useState, useEffect } from "react";
import { useUserData } from "../../functions/hooks/user";
import LoginForm from "../../components/user/Authentication/LoginForm";
import SignupForm from "../../components/user/Authentication/SignupForm";
import { sizes } from "../../styles/variables/measures";
import { Skeleton } from "@rneui/base";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";





const Profile = () => {
    const navigation = useNavigation()
    const newUser = useSelector((state: RootState) => state.newUser.newUser);

    const { user, loading } = useUserData();
    const [login, setLogin] = useState(false)

    const toggleLoginState = (newLoginState: boolean) => {
        setLogin(newLoginState);
    };


    useEffect(() => {

        if (user) {
            navigation.setOptions({
                title: 'Let your true self shine!',
                headerTitleAlign: 'left',
            })
        } else if (!user && !newUser.email && !newUser.password) {
            navigation.setOptions({
                title: 'The best time to start learning is now',
                headerTitleAlign: 'center',
            })
        } else {
            navigation.setOptions({
                title: 'Tell us more about yourself',
                headerTitleAlign: 'center',
            })
        }


    }, [newUser, user]);

    if (loading) {
        return (
            <View style={{ display: 'flex', flexDirection: 'column', gap: sizes.M, padding: sizes.L }}>
                <Skeleton
                    circle
                    animation="wave"
                    width={80}
                    height={80}
                />
                <Skeleton
                    animation="wave"
                    width={180}
                    height={80}
                />

                <Skeleton
                    animation="wave"
                    width={220}
                    height={40}
                />
                <Skeleton
                    animation="wave"
                    width={220}
                    height={40}
                />

            </View>

        )
    } else if (!user) {
        if (login) {
            return <LoginForm toggleLoginState={toggleLoginState} />
        } else {
            return <SignupForm toggleLoginState={toggleLoginState} />;
        }
    } else {
        return <Dashboard user={user} />;
    }
};
export default Profile