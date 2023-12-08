import { UserT } from "./user";

export interface ChatInputProps {
    onSend: (message: string) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export type MessageT = {
    id?: string;
    chatId: string | number;
    userId: string | number;
    text: string;
    status: string;
    created_at?: string;
};


export interface ChatroomT {
    id?: number;
    user1Id: number;
    user2Id: number;
    last_message_id?: number;
}

export type ChatMessageT = {
    user: UserT;
    id: string;
    chatId: number
    text: string;
    created_at: string;
    status: string
    userId: number
};
export type MockChatType = {
    id: string;
    user: {
        id: string;
        name: string;
        image: string;
    };
    lastMessage: {
        id: string;
        text: string;
        created_at: string;
    };
};
export interface SocketState {
    url: string | null;
}