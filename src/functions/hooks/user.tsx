import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/slices/statusSlice';
import { logOut } from '../../redux/slices/statusSlice'; // Assuming you have a 'logOut' action
import { UserT } from '../../types/user';
import { clearNewUser } from '../../redux/slices/newUserSlice';
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import * as Location from 'expo-location'
import useSWR, { mutate } from 'swr';






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
            dispatch(clearNewUser());
        } catch (error) {
            console.error('Error clearing local storage:', error);
        }
    };

    return clearLocalStorageAndLogOut;
};


export const useUserData = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<UserT | null>(null);
    const [loading, setLoading] = useState(true)
    const loggedIn = useSelector((state: RootState) => state.status.loggedIn);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AsyncStorage.getItem('@user');
                if (data) {
                    const parsedUser: UserT = JSON.parse(data);
                    setUser(parsedUser);
                } else {
                    setUser(null);
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
        const response = await fetch(url);
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


// export const useGetUsers = (url: string) => {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [users, setUsers] = useState<UserT[]>([]);


//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch users');
//                 }
//                 const data = await response.json();
//                 console.log(data)

//                 setUsers(data);
//                 setLoading(false);
//             } catch (error: any) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return { loading, error, users };
// };

