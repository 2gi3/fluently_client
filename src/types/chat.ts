import { UserT } from "./user";

// export interface ChatInputProps {
//     onSend: (message: string) => void;
//     inputValue: string;
//     setInputValue: React.Dispatch<React.SetStateAction<string>>;
// }
export interface ChatInputProps {
    onSend: (message?: string) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    messageType: 'text' | 'audio' | 'image' | null;
    setMessageType: React.Dispatch<React.SetStateAction<'text' | 'audio' | 'image' | null>>; // or whatever type setMessageType should be
    audio: {
        url: string,
        duration: number
    } | null;
    setAudio: React.Dispatch<React.SetStateAction<{
        url: string,
        duration: number
    } | null>>;
    // imageUrls: React.RefObject<React.SetStateAction<string[] | null>>;
    imageUrls: any;
    audioRef: any
}

export type MessageT = {
    id?: string;
    chatId: string | number;
    userId: string | number;
    text: string;
    status: string;
    created_at?: string;
    type?: 'text' | 'audio' | 'image' | null
    audioUrl?: string | null,
    audioDuration?: number | null
    imageUrls?: string[] | null

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

export interface AudioFileT {
    id: number;
    userId: number | string;
    audioUrl: string;
    duration: number;
    created_at?: Date;
}