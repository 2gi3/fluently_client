import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useState, useEffect } from "react";
import { MessageT } from "../../types/chat";


export const useGetChats = () => {
    const user = useSelector((state: RootState) => state.user.user);
    //@ts-ignore
    const url = `${process.env.SERVER_URL}/api/chat/${user.id}`

    const fetcher = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch chatrooms');
        }
        const data = await response.json();
        return data;
    };

    const { data: cahtrooms, error, isValidating } = useSWR(url, fetcher, {
        revalidateOnMount: true
    });

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !cahtrooms && !error, error, cahtrooms, refreshData, isValidating };
};

export const useGetMessages = (chatId: string | number) => {
    const user = useSelector((state: RootState) => state.user.user);
    //@ts-ignore
    const url = `${process.env.SERVER_URL}/api/chat/message/${chatId}`

    const fetcher = async () => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
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

