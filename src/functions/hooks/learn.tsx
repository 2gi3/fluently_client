import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useNavigation } from "@react-navigation/native";
import { UserT } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchSavedPostsFromLocalStorage } from "../../redux/slices/ownPostsSlice";
import { CourseT } from "../../types/learning";

const baseUrl = process.env.SERVER_URL
console.log({ hooksLearnURL: baseUrl })

const origin = process.env.ORIGIN || 'http://localhost:8081'

export const useGetAllCourses = () => {

    const navigation = useNavigation()
    const getAllCoursesEndpoint = `${baseUrl}/api/learn/courses`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')

        const response = await fetch(getAllCoursesEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
                origin
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data;
    }
    const { data: courses, error, isValidating } = useSWR<void | CourseT[] | undefined>(getAllCoursesEndpoint, fetcher, {
        revalidateOnMount: true,
    });

    const refreshData = () => {
        mutate(getAllCoursesEndpoint);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshData();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return { loading: !courses && !error, error, courses, refreshData, isValidating };

};