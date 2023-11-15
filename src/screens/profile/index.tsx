import { View } from "react-native"
import Dashboard from "../../components/user/Dashboard";
import React, { useState } from "react";
import { useUserData } from "../../functions/hooks/user";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";
import { sizes } from "../../styles/variables/measures";
import { Skeleton } from "@rneui/base";



const Profile = () => {
    const { user, loading } = useUserData();
    const [login, setLogin] = useState(false)

    const toggleLoginState = (newLoginState: boolean) => {
        setLogin(newLoginState);
    };
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
        //@ts-ignore
        return <Dashboard user={user} />;
    }
};
export default Profile