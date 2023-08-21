import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NewUserT } from '../../types/user';

export interface NewUserState {
    newUser: NewUserT | null;
}

const initialState: NewUserState = {
    newUser: null,
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
            state.newUser = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setNewUser, updateNewUserField, clearNewUser } = newUserSlice.actions;

export default newUserSlice.reducer;
