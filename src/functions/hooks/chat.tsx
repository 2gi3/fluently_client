import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { RootState } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserT } from "../../types/user";
import { useState } from "react";


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