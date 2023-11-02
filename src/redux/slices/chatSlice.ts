
import { createSlice } from '@reduxjs/toolkit';
import { MessageT } from '../../types/chat';


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        activeChat: null as string | number | null,
        chatMessages: [] as MessageT[]
    },
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        clearActiveChats: (state) => {
            state.activeChat = null;
        },
        addMessage: (state, action) => {
            state.chatMessages.push(action.payload);

        },
        clearChatMessages: (state, action) => {
            state.chatMessages = [];
        },
    },
});

export const { setActiveChat, clearActiveChats, addMessage, clearChatMessages } = chatSlice.actions;
export default chatSlice.reducer;
