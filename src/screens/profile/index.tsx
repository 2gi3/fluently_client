import Signup from "../../components/user/Signup"
import Dashboard from "../../components/user/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux';



const Profile = () => {
    const [user, setUser] = useState<UserT | null>(null);
    const loggedIn = useSelector((state: RootState) => state.status.loggedIn);


    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('@user');
            if (data) {
                const parsedUser: UserT = JSON.parse(data);
                setUser(parsedUser);
            }
        };

        fetchData();
    }, [loggedIn]);

    console.log(user);

    {
        if (!user) {
            return (

                <Signup />
            )
        } else {
            return (
                <Dashboard user={user} />
            )
        }
    }

}
export default Profile