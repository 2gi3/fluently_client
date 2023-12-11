import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { setAccessToken } from '../auth';

const baseUrl = process.env.SERVER_URL

export const useTokenRefresher = () => {
    useEffect(() => {
        const updateAccessToken = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('speaky-access-token');
                const refreshToken = await AsyncStorage.getItem('speaky-refresh-token');

                if (accessToken) {
                    const [, payloadBase64] = accessToken.split('.');
                    const payload = JSON.parse(atob(payloadBase64));
                    const expirationTime = payload.exp * 1000;
                    const currentTime = Date.now();
                    const timeLeftInMinutes = Math.floor((expirationTime - currentTime) / (60 * 1000));
                    console.log({ timeLeftBefore: timeLeftInMinutes });
                    if (timeLeftInMinutes < 90) {
                        const newAccessToken = await fetch(`${baseUrl}/api/auth/token/${refreshToken}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': JSON.parse(accessToken!),
                            }
                        });
                        setAccessToken(newAccessToken);
                    }
                }
            } catch (error) {
                console.error('Error while updating access token:', error);
            }
        };

        updateAccessToken();

        const intervalId = setInterval(updateAccessToken, 3600000);

        return () => clearInterval(intervalId);
    }, []);
};

