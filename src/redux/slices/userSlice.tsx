import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Gender } from '../../types/user';

export interface UserStateT {
    user: {
        id: number | null;
        email: string | null;
        password: string | null;
        name: string | null;
        age: number | null;
        gender: Gender | null;
        nationality: string | null;
        country: string | null;
        native_language: string | null;
        teaching_language: string | null;
        learning_language: string | null;
        image: string | null;
        description: string | null;
        banned: boolean | null;
    }
}

const initialState: UserStateT = {
    user: {
        id: null,
        image: null,
        description: null,
        banned: null,
        email: null,
        password: null,
        name: null,
        age: null,
        gender: null,
        nationality: null,
        country: null,
        native_language: null,
        teaching_language: null,
        learning_language: null,
    },
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: any, action: PayloadAction<UserStateT>) => {
            state.user = action.payload;
        },
        updateUserField: (state, action: PayloadAction<{ key: keyof UserStateT; value: any }>) => {
            const { key, value } = action.payload;
            if (state.user) {
                (state as any).user[key] = value;
            }
        },
        clearUser: (state) => {
            state.user = {
                id: null,
                image: null,
                description: null,
                banned: null,
                email: null,
                password: null,
                name: null,
                age: null,
                gender: null,
                nationality: null,
                country: null,
                native_language: null,
                teaching_language: null,
                learning_language: null,
            };
        },
    },
});

export const { setUser, updateUserField, clearUser } = userSlice.actions;

export default userSlice.reducer;

