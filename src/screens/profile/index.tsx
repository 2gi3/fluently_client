import Signup from "../../components/user/Signup"
import Dashboard from "../../components/user/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useEffect, useState } from "react";



const Profile = () => {
    const [user, setUser] = useState<UserT | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('@user');
            if (data) {
                const parsedUser: UserT = JSON.parse(data);
                setUser(parsedUser);
            }
        };

        fetchData();
    }, []);

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