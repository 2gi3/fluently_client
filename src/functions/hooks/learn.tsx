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

export const useCreateCourse = () => {
    const navigation = useNavigation()
    const createCourseEndpoint = `${baseUrl}/api/learn/courses`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const createCourse = async (payload: CourseT) => {
        console.log({
            payload,
            createCourseEndpoint
        })
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('speaky-access-token');
            const response = await fetch(createCourseEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(accessToken!),
                    origin
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Course created successfully');
                setSuccess(true);
                // @ts-ignore
                navigation.navigate('Learn')

                // return await response.json();
            } else {
                const errorMessage = await response.text();
                console.error('Failed to create course:', errorMessage);

                if (response.status >= 400 && response.status < 500) {
                    setError('Client error: ' + errorMessage);
                } else if (response.status >= 500 && response.status < 600) {
                    setError('Server error: ' + errorMessage);
                } else {
                    setError('Unexpected error: ' + errorMessage);
                }
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { createCourse, loading, error, success };
};