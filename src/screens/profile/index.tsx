import Signup from "../../components/user/SignupForm"
import Dashboard from "../../components/user/Dashboard";
import { useState } from "react";
import { useUserData } from "../../functions/hooks/user";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";



const Profile = () => {
    const user = useUserData();
    const [login, setLogin] = useState(false)

    const toggleLoginState = (newLoginState: boolean) => {
        setLogin(newLoginState);
    };

    if (!user) {
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