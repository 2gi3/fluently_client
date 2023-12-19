import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostT } from "../../types/community";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const baseUrl = process.env.SERVER_URL

export const useCreatePost = () => {
    const createPostEndpoint = `${baseUrl}/api/community/post`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const createPost = async (payload: PostT) => {
        console.log({ payload })
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('speaky-access-token');
            const response = await fetch(createPostEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(accessToken!),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Post created successfully');
                setSuccess(true);
                return await response.json();
            } else {
                const errorMessage = await response.text();
                console.error('Failed to create post:', errorMessage);

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

    return { createPost, loading, error, success };
};

export const useGetAllPosts = () => {
    const getAllPostsEndpoint = `${baseUrl}/api/community/post`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const response = await fetch(getAllPostsEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
    }
    const { data: posts, error, isValidating } = useSWR<void | PostT[] | undefined>(getAllPostsEndpoint, fetcher, {
        revalidateOnMount: true,
    });

    const refreshData = () => {
        mutate(getAllPostsEndpoint);
    };
    return { loading: !posts && !error, error, posts, refreshData, isValidating };

};

export const useGetOnePost = (postId: string) => {
    const getAllPostsEndpoint = `${baseUrl}/api/community/post/${postId}`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const response = await fetch(getAllPostsEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        return data;
    }
    const { data: post, error, isValidating } = useSWR<void | PostT | undefined>(getAllPostsEndpoint, fetcher, {
        revalidateOnMount: true,
    });

    const refreshData = () => {
        mutate(getAllPostsEndpoint);
    };

    return { loading: !post && !error, error, post, refreshData, isValidating };

};