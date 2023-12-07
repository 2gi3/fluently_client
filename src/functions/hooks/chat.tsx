import { useDispatch, useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useState, useEffect } from "react";
import { ChatroomT, MessageT } from "../../types/chat";
import { clearChatMessages } from "../../redux/slices/chatSlice";


export const useGetChats = () => {
    const user = useSelector((state: RootState) => state.user);
    const baseUrl = `${process.env.SERVER_URL}`
    const url = `${baseUrl}/api/chat/${user.id}`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        console.log('atB', accessToken)
        const response = await fetch(url, {
            method: 'GET',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch chatrooms');
        }
        const data: ChatroomT[] = await response.json();
        return data;
    };

    const { data: chatrooms, error, isValidating } = useSWR(url, fetcher, {
        revalidateOnMount: true,
        refreshWhenHidden: true
    });

    const refreshData = () => {
        mutate(url);
    };

    return { loading: !chatrooms && !error, error, chatrooms, refreshData, isValidating };
};

export const useGetMessages = (chatId: string | number) => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/chat/message/${chatId}`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const response = await fetch(url, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
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
    const user = useSelector((state: RootState) => state.user);
    const baseUrl = process.env.SERVER_URL
    const url = `${baseUrl}/api/chat/last_message/${chatId}`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const response = await fetch(url, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
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

