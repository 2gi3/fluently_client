import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../types/user";

export const updateUser = async (payload: Partial<UserT> | any, endpoint: string) => {
    try {
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
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


