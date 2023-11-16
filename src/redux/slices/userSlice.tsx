import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserT } from '../../types/user';

const initialState: UserT = {
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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserT, action: PayloadAction<UserT>) => {
            Object.assign(state, action.payload);
        },
        updateUserField: (state, action: PayloadAction<{ key: keyof UserT; value: any }>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        clearUser: (state) => {
            Object.keys(state).forEach((key) => {
                state[key as keyof UserT] = null;
            });
        },
    },
});

export const { setUser, updateUserField, clearUser } = userSlice.actions;

export default userSlice.reducer;


