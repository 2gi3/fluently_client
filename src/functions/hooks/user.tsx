import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/slices/statusSlice';
import { logOut } from '../../redux/slices/statusSlice';
import { clearUser, setUser } from '../../redux/slices/userSlice';

import { UserT } from '../../types/user';
import { clearNewUser } from '../../redux/slices/newUserSlice';
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import * as Location from 'expo-location'
import useSWR, { mutate } from 'swr';
import { emailRegex } from '../../regex';
import { setAmount } from '../../redux/slices/counterSlice';



export const useCheckUserExistence = () => {
    const dispatch = useDispatch();
    const [checkingUserExistence, setCheckingUserExistence] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const email = useSelector((state: RootState) => state.newUser.newUser.email);
    const url = process.env.SERVER_URL!
    useEffect(() => {
        setEmailChecked(false)
    }, [email])

    const checkUserExistence = async () => {
        if (emailRegex.test(email) && !checkingUserExistence && !emailChecked) {
            setCheckingUserExistence(true);
            const response = await fetch(`${url}/api/user/exists/${email}`, {
                method: 'GET',
            });
            setCheckingUserExistence(false);
            const userExists = await response.json();
            dispatch(setAmount(Number(response.headers.get('Ratelimit-Remaining'))))

            setEmailChecked(true);
            return userExists.exists;
        }
    }

    return { checkingUserExistence, emailChecked, checkUserExistence };
};





export const useLogIn = () => {
    const dispatch = useDispatch();

    const storeUserDataAndLogIn = async (user: UserT) => {
        console.log('loginUser', { user })
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
    const baseUrl = process.env.SERVER_URL
    const dispatch = useDispatch();


    const clearLocalStorageAndLogOut = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const refreshToken = await AsyncStorage.getItem('speaky-refresh-token')

        try {
            const response = await fetch(`${baseUrl}/api/auth/token/${JSON.parse(refreshToken!)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': JSON.parse(accessToken!),
                },
            });

            // if (!response.ok) {
            //     throw new Error(`Failed to log out: ${response.statusText}`);
            // }

            console.log(await response.json())

            await AsyncStorage.clear();
            dispatch(logOut());
            dispatch(clearNewUser());
            dispatch(clearUser())
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    };

    return clearLocalStorageAndLogOut;
};


export const useUserData = () => {
    const dispatch = useDispatch();
    const [user, setUserData] = useState<UserT | null>(null);
    const [loading, setLoading] = useState(true)
    const loggedIn = useSelector((state: RootState) => state.status.loggedIn);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('@user');
                if (data) {
                    const parsedUser: UserT = JSON.parse(data);
                    setUserData(parsedUser);
                    dispatch(setUser(parsedUser))
                } else {
                    setUserData(null);
                    dispatch(clearNewUser());
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [loggedIn, dispatch]);

    return { user, loading };
};



export const useLocation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);


    const fetchLocationData = async () => {
        try {
            setLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            // @ts-ignore
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            const data = await res.json();

            // Extract city and country from the response
            if (data && data.name && data.sys && data.sys.country) {
                setCity(data.name);
                setCountry(data.sys.country);
            }
        } catch {
            setError('Could not fetch location');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchLocationData();
        })();

    }, []);

    return [city, country, loading, error];
}



export const useGetUsers = (url: string) => {

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const response = await fetch(url, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    };

    const { data: users, error, isValidating } = useSWR(url, fetcher);

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !users && !error, error, users, refreshData, isValidating };
};

