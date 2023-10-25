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

// export type ChatT = {
//     id: string;
//     user: UserT;
//     lastMessage?: MessageT;
// };

export interface ChatroomT {
    id?: number;
    user1Id: number;
    user2Id: number;
    last_message_id?: number;
}

export type ChatMessageT = {
    user: UserT;
    id: string;
    text: string;
    created_at: string;
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
