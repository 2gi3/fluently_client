import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiResponseHeadersT } from "../types";




export const setAccessToken = async (response: ApiResponseHeadersT) => {
    try {
        const accessToken = response.headers.get('Authorization');
        // const { refreshToken } = await response.json();
        if (accessToken) {
            await AsyncStorage.setItem('speaky-access-token', JSON.stringify(accessToken));
        }
        // if (refreshToken) {
        //     await AsyncStorage.setItem('speaky-refresh-token', JSON.stringify(refreshToken));
        // }
    } catch (error) {
        console.error('Error setting access token:', error);
    }
}