export type UserT = {
    id: string;
    name: string;
    image?: string;
};

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

export type RootStackParamList = {
    Chat: UserT
    Chats: undefined
    Home: undefined
};