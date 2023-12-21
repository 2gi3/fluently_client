import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StatusState } from '../../types';


const socketUrlVar = process.env.WEB_SOCKET_URL

const initialStatusState: StatusState = {
    loggedIn: false,
    connected: false,
    socketUrl: socketUrlVar!,
};

export const statusSlice = createSlice({
    name: 'status',
    initialState: initialStatusState,
    reducers: {
        logIn: (state) => {
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.loggedIn = false;
        },
        setSocketUrl: (state, action: PayloadAction<string | null>) => {
            state.socketUrl = action.payload;
        },
        clearSocketUrl: (state) => {
            state.socketUrl = null;
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        }
    },
});

export const { logIn, logOut, setSocketUrl, clearSocketUrl, setConnected } = statusSlice.actions;
export const selectSocketUrl = (state: RootState) => state.status.socketUrl;
export default statusSlice.reducer;




// const initialState = {
//     socket: null,
// };

// const statusSlice = createSlice({
//   name: 'status',
//   initialState,
//   reducers: {
//     setSocket: (state, action) => {
//       state.socket = action.payload;
//     },
//     clearSocket: (state) => {
//       state.socket = null;
//     },
//   },
// });

// export const { setSocket, clearSocket } = statusSlice.actions;

// export const selectSocket = (state) => state.status.socket;

// export default statusSlice.reducer;
