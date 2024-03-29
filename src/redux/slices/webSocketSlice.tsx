
import { createSlice } from '@reduxjs/toolkit';
type WebSocketType = WebSocket | null;
type connectedUsersTyps = number[];


const websocketSlice = createSlice({
    name: 'websocket',
    initialState: {
        // socket: null as WebSocketType,
        connectedUsers: [] as connectedUsersTyps,
        outgoingMessage: null,
        readyState: null
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
        clearOutgoingMessage: (state) => {
            state.outgoingMessage = null;
        },
        addUser: (state, action) => {
            if (typeof action.payload === 'number') {
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
        setReadyState: (state, action) => {
            state.readyState = action.payload
        },
    },
});

export const {
    // setSocket, clearSocket, sendMessage,
    addUser, removeUser, setConnectedUsers, setOutgoingMessage, clearOutgoingMessage, setReadyState } = websocketSlice.actions;
export default websocketSlice.reducer;
