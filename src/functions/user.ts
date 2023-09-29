import { UserT } from "../types/user";

export const updateUser = async (payload: Partial<UserT>, endpoint: string) => {
    try {
        const response = await fetch(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('User updated successfully');
        } else {
            console.error('Failed to update user');
        }
    } catch (error) {
        console.error('An error occurred while updating the user:', error);
    }
};


