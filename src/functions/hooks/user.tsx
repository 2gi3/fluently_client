import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/slices/statusSlice';
import { UserT } from '../../types/user';

export const useLogIn = () => {
    const dispatch = useDispatch(); // Access the Redux dispatch function

    const storeUserDataAndLogIn = async (user: UserT) => {
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            dispatch(logIn());
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };

    return storeUserDataAndLogIn;
};


