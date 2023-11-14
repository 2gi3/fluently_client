
import { createSlice } from '@reduxjs/toolkit';
type WebSocketType = WebSocket | null;
type connectedUsersTyps = string[];


const websocketSlice = createSlice({
    name: 'websocket',
    initialState: {
        // socket: null as WebSocketType,
        connectedUsers: [] as connectedUsersTyps,
        outgoingMessage: null
    },
    reducers: {
        // setSocket: (state, action) => {
        //     state.socket = action.payload;
        // },
        // clearSocket: (state) => {
        //     state.socket = null;
        // },
        // sendMessage: (state, action) => {
        //     if (state.socket) {
        //         state.socket.send(action.payload);
        //     }
        // },
        setOutgoingMessage: (state, action) => {
            state.outgoingMessage = action.payload;
        },
        clearOutgoingMessage: (state, action) => {
            state.outgoingMessage = null;
        },
        addUser: (state, action) => {
            if (typeof action.payload === 'string') {
                state.connectedUsers.push(action.payload);
            }
        },
        removeUser: (state, action) => {
            if (typeof action.payload === 'string') {
                state.connectedUsers = state.connectedUsers.filter((user) => user !== action.payload);
            }
        },
        setConnectedUsers: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.connectedUsers = action.payload;
            }
        },
    },
});

export const {
    // setSocket, clearSocket, sendMessage,
    addUser, removeUser, setConnectedUsers, setOutgoingMessage, clearOutgoingMessage } = websocketSlice.actions;
export default websocketSlice.reducer;
