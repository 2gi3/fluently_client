import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NewUserT } from '../../types/user';

export interface NewUserState {
    newUser: {
        email: string | null;
        password: string | null;
        name: string | null;
        nationality: string | null;
        country: string | null;
        native_language: string | null;
        teaching_language: string | null;
        learning_language: string | null;
    };
}

const initialState: NewUserState = {
    newUser: {
        email: null,
        password: null,
        name: null,
        nationality: null,
        country: null,
        native_language: null,
        teaching_language: null,
        learning_language: null,
    },
};

export const newUserSlice = createSlice({
    name: 'newUser',
    initialState,
    reducers: {
        setNewUser: (state, action: PayloadAction<NewUserT>) => {
            state.newUser = action.payload;
        },
        updateNewUserField: (state, action: PayloadAction<{ key: keyof NewUserT; value: any }>) => {
            const { key, value } = action.payload;
            if (state.newUser) {
                state.newUser[key] = value;
            }
        },
        clearNewUser: (state) => {
            state.newUser = {
                email: null,
                password: null,
                name: null,
                nationality: null,
                country: null,
                native_language: null,
                teaching_language: null,
                learning_language: null,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setNewUser, updateNewUserField, clearNewUser } = newUserSlice.actions;

export default newUserSlice.reducer;
