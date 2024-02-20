import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { setAccessToken } from '../auth';
import { AppState } from 'react-native'


const baseUrl = process.env.SERVER_URL

export const useTokenRefresher = () => {
    useEffect(() => {

        const updateAccessToken = async () => {
            // await AsyncStorage.clear();
            try {
                const accessToken = await AsyncStorage.getItem('speaky-access-token');
                const refreshToken = await AsyncStorage.getItem('speaky-refresh-token');
                const cleanedRefreshToken = refreshToken!.replace(/^"(.*)"$/, '$1'); // if the token is wrapped in double quotes then the double quotes will be removed 


                if (accessToken) {
                    const [, payloadBase64] = accessToken.split('.');
                    const payload = JSON.parse(atob(payloadBase64));
                    const expirationTime = payload.exp * 1000;
                    const currentTime = Date.now();
                    const timeLeftInMinutes = Math.floor((expirationTime - currentTime) / (60 * 1000));
                    console.log(` Access token expires in ${timeLeftInMinutes} minutes`);
                    if (timeLeftInMinutes < 32) {
                        const newAccessToken = await fetch(`${baseUrl}/api/auth/token/${cleanedRefreshToken}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                // 'Authorization': JSON.parse(accessToken!),
                            }
                        });
                        setAccessToken(newAccessToken);
                        clearInterval(intervalId)
                    }
                }
            } catch (error) {
                console.error('Error while updating access token:', error);
            }
        };

        // const handleVisibilityChange = () => {
        //     if (document.visibilityState === 'visible') {
        //         updateAccessToken();
        //     }
        // };
        // document.addEventListener('visibilitychange', handleVisibilityChange);

        updateAccessToken();
        const subscription = AppState.addEventListener('change', nextAppState => {
            console.log({ nextAppState })
            if (nextAppState === 'active') {
                updateAccessToken();
            }
        });
        const TOKEN_REFRESH_INTERVAL = 29 * 60 * 1000; // 29 minutes

        const intervalId = setInterval(updateAccessToken, TOKEN_REFRESH_INTERVAL);

        return () => {
            clearInterval(intervalId);
            subscription.remove();
        };
    }, []);
};

