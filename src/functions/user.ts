import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const updateUser = async (payload: Partial<UserT>, endpoint: string) => {
    const accessToken = await AsyncStorage.getItem('speaky-access-token')
    const origin = process.env.ORIGIN || 'http://localhost:8081'


    try {
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
                origin
            },
            // credentials: 'include',
            body: JSON.stringify(payload),
        });
        const data = await response.json()

        if (response.ok) {
            console.log('User updated successfully');
            return data
        } else {
            console.error('Failed to update user');
        }
    } catch (error) {
        console.error('An error occurred while updating the user:', error);
    }
};


