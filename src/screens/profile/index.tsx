import Signup from "../../components/user/Signup"
import Dashboard from "../../components/user/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { clearNewUser } from "../../redux/slices/newUserSlice";
import { useUserData } from "../../functions/hooks/user";
import Login from "./Login";



const Profile = () => {
    const user = useUserData();
    const [login, setLogin] = useState(false)

    const toggleLoginState = (newLoginState: boolean) => {
        setLogin(newLoginState);
    };

    if (!user) {
        if (login) {
            return <Login toggleLoginState={toggleLoginState} />
        } else {
            return <Signup toggleLoginState={toggleLoginState} />;
        }
    } else {
        return <Dashboard user={user} />;
    }
};
export default Profile