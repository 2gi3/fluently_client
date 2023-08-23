import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StatusState } from '../../types';



const initialStatusState: StatusState = {
    loggedIn: false,
    connected: false,
};

export const statusSlice = createSlice({
    name: 'status', // Name your slice 'status'
    initialState: initialStatusState, // Use the initial state you defined
    reducers: {
        // Add reducers for updating the status
        logIn: (state) => {
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.loggedIn = false;
        },
        connect: (state) => {
            state.connected = true;
        },
        disconnect: (state) => {
            state.connected = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, connect, disconnect } = statusSlice.actions;

// Export the reducer
export default statusSlice.reducer;
