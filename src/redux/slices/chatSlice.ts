
import { createSlice } from '@reduxjs/toolkit';
import { MessageT } from '../../types/chat';


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        activeChat: null as string | number | null,
        // pendingChats:[] as string[] | number[],
        chatMessages: [] as MessageT[]
    },
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        clearActiveChats: (state) => {
            state.activeChat = null;
        },
        setLocalMessages: (state, action) => {
            state.chatMessages = action.payload
        },
        addMessage: (state, action) => {
            state.chatMessages.push(action.payload);

        },
        clearChatMessages: (state) => {
            state.chatMessages = [];
        },
    },
});

export const { setActiveChat, clearActiveChats, setLocalMessages, addMessage, clearChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
