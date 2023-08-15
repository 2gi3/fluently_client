export type User = {
    id: string;
    name: string;
    image: string;
};

export type Message = {
    id: string;
    text: string;
    createdAt: string;
};

export type Chat = {
    id: string;
    user: User;
    lastMessage: Message;
};