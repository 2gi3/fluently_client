import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { setAccessToken } from '../auth';
import { AppState } from 'react-native'
import { Buffer } from "buffer";


const baseUrl = process.env.SERVER_URL
const origin = process.env.ORIGIN || 'http://localhost:8081'

export const useTokenRefresher = () => {
    useEffect(() => {

        const updateAccessToken = async () => {
            // await AsyncStorage.clear();
            try {
                const accessToken = await AsyncStorage.getItem('speaky-access-token');
                const refreshToken = await AsyncStorage.getItem('speaky-refresh-token');


                if (accessToken && refreshToken) {
                    const cleanedRefreshToken = refreshToken!.replace(/^"(.*)"$/, '$1'); // if the token is wrapped in double quotes then the double quotes will be removed 

                    // const [, payloadBase64] = accessToken.split('.');
                    // const payload = JSON.parse(atob(payloadBase64));
                    const payloadBase64 = accessToken.split('.')[1];
                    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());

                    const expirationTime = payload.exp * 1000;
                    const currentTime = Date.now();
                    const timeLeftInMinutes = Math.floor((expirationTime - currentTime) / (60 * 1000));
                    console.log(` Access token expires in ${timeLeftInMinutes} minutes`);
                    if (timeLeftInMinutes < 32) {
                        const newAccessToken = await fetch(`${baseUrl}/api/auth/token/${cleanedRefreshToken}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                // 'Authorization': JSON.parse(accessToken!),
                                origin
                            }
                        });
                        setAccessToken(newAccessToken);
                        clearInterval(intervalId)
                    }
                } else {
                    await AsyncStorage.clear();
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

