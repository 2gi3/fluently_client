import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/slices/statusSlice';
import { logOut } from '../../redux/slices/statusSlice'; // Assuming you have a 'logOut' action
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


export const useLogOut = () => {
    const dispatch = useDispatch();

    const clearLocalStorageAndLogOut = async () => {
        try {
            await AsyncStorage.clear();
            dispatch(logOut());
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    };

    return clearLocalStorageAndLogOut;
};

