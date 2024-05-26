import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommentT, PostT, SavedPostT } from "../../types/community";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { useNavigation } from "@react-navigation/native";
import { UserT } from "../../types/user";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchSavedPostsFromLocalStorage } from "../../redux/slices/ownPostsSlice";

const baseUrl = process.env.SERVER_URL
console.log({ createPostUrl: baseUrl })

const origin = process.env.ORIGIN || 'http://localhost:8081'


export const useCreatePost = () => {
    const navigation = useNavigation()
    const createPostEndpoint = `${baseUrl}/api/community/post`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const createPost = async (payload: PostT) => {
        console.log({
            payload,
            createPostEndpoint
        })
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('speaky-access-token');
            const response = await fetch(createPostEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(accessToken!),
                    origin
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Post created successfully');
                setSuccess(true);
                // @ts-ignore
                navigation.navigate('Community')

                // return await response.json();
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

    const navigation = useNavigation()
    const getAllPostsEndpoint = `${baseUrl}/api/community/post`

    const fetcher = async () => {
        const accessToken = await AsyncStorage.getItem('speaky-access-token')

        const response = await fetch(getAllPostsEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
                origin
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshData();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

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
                origin
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

export const useCreateComment = () => {
    const createCommentEndpoint = `${baseUrl}/api/community/postComment`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const createComment = async (payload: CommentT) => {
        console.log({ payload })
        try {
            setLoading(true);
            setSuccess(null)
            const accessToken = await AsyncStorage.getItem('speaky-access-token');
            const response = await fetch(createCommentEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(accessToken!),
                    origin
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Comment created successfully');
                setSuccess(true);
                return await response.json();
            } else {
                const errorMessage = await response.text();
                console.error('Failed to create comment:', errorMessage);

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

    return { createComment, loading, error, success };
};

export const useManageSavedPosts = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const savedPostsEndpoint = `${baseUrl}/api/community/savedposts`
    const [loading, setLoading] = useState(false);
    const [savingError, setSavingError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const getSavedPosts = async () => {
        setLoading(true)
        const accessToken = await AsyncStorage.getItem('speaky-access-token')
        const userId = user.id
        const response = await fetch(`${savedPostsEndpoint}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.parse(accessToken!),
                origin
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch savedPosts');
        }
        const data = await response.json();
        setLoading(false)
        console.log({ savedPosts: data })
        return data;

    }
    const toggleSaveUnsavePost = async (data: SavedPostT) => {
        try {
            setLoading(true);
            const accessToken = await AsyncStorage.getItem('speaky-access-token');

            const response = await fetch(savedPostsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(accessToken!),
                    origin
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Post saved successfully');
                setSuccess(true);
                const data = await response.json()
                await AsyncStorage.setItem('savedPosts', JSON.stringify(data.savedPosts));

                dispatch(fetchSavedPostsFromLocalStorage() as any)
                console.log({ data });
                ;

                // @ts-ignore
                // navigation.navigate('Community')

                // return await response.json();
            } else {
                const errorMessage = await response.text();
                console.error('Failed to save post:', errorMessage);

                if (response.status >= 400 && response.status < 500) {
                    setSavingError('Client error: ' + errorMessage);
                } else if (response.status >= 500 && response.status < 600) {
                    setSavingError('Server error: ' + errorMessage);
                } else {
                    setSavingError('Unexpected error: ' + errorMessage);
                }
            }
        } catch (error) {
            console.error('Network error:', error);
            setSavingError('Network error: ' + error.message);
        } finally {
            setLoading(false);
        }

    }
    const unavePost = (data: SavedPostT) => {

    }

    const { data: savedPosts, error, isValidating } = useSWR<void | SavedPostT[] | undefined>(`savedPostsEndpoint/${user.id}`, getSavedPosts, {
        revalidateOnMount: true,
    });

    const refreshData = () => {
        mutate(`savedPostsEndpoint/${user.id}`);
    };
    return { loading: !savedPosts && !error && !savingError, error, savingError, savedPosts, refreshData, isValidating, getSavedPosts, toggleSaveUnsavePost };

}


// export function useSavedPostsFromLocalStorage() {
//     const [savedPosts, setSavedPosts] = useState(() => {
//         try {
//             const item = window.localStorage.getItem('savedPosts');
//             return item ? JSON.parse(item) : [];
//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     });

//     useEffect(() => {
//         const handleStorageChange = () => {
//             try {
//                 const item = window.localStorage.getItem('savedPosts');
//                 setSavedPosts(item ? JSON.parse(item) : []);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener('storage', handleStorageChange);
//         };
//     }, []);

//     return savedPosts;
// }

