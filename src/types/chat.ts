import { UserT } from "./user";

export interface ChatInputProps {
    onSend: (message: string) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export type MessageT = {
    id: string;
    text: string;
    createdAt: string;
};

export type ChatT = {
    id: string;
    user: UserT;
    lastMessage?: MessageT;
};

export type ChatMessageT = {
    user: UserT;
    id: string;
    text: string;
    createdAt: string;
};
