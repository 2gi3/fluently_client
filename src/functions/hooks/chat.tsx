import { useDispatch, useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useState, useEffect } from "react";
import { MessageT } from "../../types/chat";
import { clearChatMessages } from "../../redux/slices/chatSlice";


export const useGetChats = () => {
    const user = useSelector((state: RootState) => state.user.user);
    //@ts-ignore
    const baseUrl = `${process.env.SERVER_URL}`
    const url = `${baseUrl}/api/chat/${user.id}`

    const fetcher = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch chatrooms');
        }
        const data = await response.json();
        return data;
    };

    const { data: chatrooms, error, isValidating } = useSWR(url, fetcher, {
        revalidateOnMount: true
    });

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !chatrooms && !error, error, chatrooms, refreshData, isValidating };
};

export const useGetMessages = (chatId: string | number) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user);
    //@ts-ignore
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/chat/message/${chatId}`

    const fetcher = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        dispatch(clearChatMessages());
        return data;
    };

    const { data: messages, error, isValidating } = useSWR(url, fetcher, {
        revalidateOnMount: true
    });

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !messages && !error, error, messages, refreshData, isValidating };
};

export const useGetLastMessage = (chatId: string | number) => {
    const user = useSelector((state: RootState) => state.user.user);
    //@ts-ignore
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/chat/last_message/${chatId}`

    const fetcher = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        return data;
    };

    const { data: lastMessage, error, isValidating } = useSWR(url, fetcher, {
        revalidateOnMount: true
    });

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !lastMessage && !error, error, lastMessage, refreshData, isValidating };
};

// To send a message to a specific user with a known user ID
// function sendMessageToUser(userId, message) {
//     const ws = userSockets.get(userId);

//     if (ws) {
//         ws.send(JSON.stringify(message));
//         console.log(`Message sent to user ${userId}: ${JSON.stringify(message)}`);
//     } else {
//         console.log(`User ${userId} not found`);
//     }
// }

// Example usage:
//sendMessageToUser('userId123', { text: 'Hello, user!' });

// export const useCreateMessage = ({ chatId, userId, text, status }: MessageT) => {
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState(null);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const createMessage = async () => {
//             setLoading(true);
//             try {
//                 //@ts-ignore
//                 const response = await fetch(`${process.env.SERVER_URL}/api/message`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         chatId,
//                         userId,
//                         text,
//                         status
//                     }),
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setMessage(data);
//                     console.log('Message created successfully');
//                 } else {
//                     setError('Failed to create chatroom');
//                 }
//             } catch (error: any) {
//                 setError(`An error occurred while creating the chatroom: ${error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         createMessage();
//     }, []);

//     return { message, loading, error };
// };

