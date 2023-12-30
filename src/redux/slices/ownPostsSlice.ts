import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostT, SavedPostT } from '../../types/community';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    savedPosts: [] as SavedPostT[],
    posts: [] as PostT[]
};

export const fetchSavedPostsFromLocalStorage = createAsyncThunk(
    'ownPosts/fetchSavedPostsFromLocalStorage',
    async () => {
        try {
            const savedPostsData = await AsyncStorage.getItem('savedPosts');
            if (savedPostsData) {
                const data = JSON.parse(savedPostsData);
                return data
            }
        } catch (error) {
            console.error("Error fetching saved posts from AsyncStorage:", error);
        }
    }
);
export const ownPostsSlice = createSlice({
    name: 'ownPosts',
    initialState,
    reducers: {
        setSavedPosts: (state, action: PayloadAction<SavedPostT[]>) => {
            state.savedPosts = action.payload;
        },
        setOwnPosts: (state, action: PayloadAction<PostT[]>) => {
            state.posts = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder
            // .addCase(fetchSavedPostsFromLocalStorage.pending, (state) => {
            // })
            .addCase(fetchSavedPostsFromLocalStorage.fulfilled, (state, action) => {
                state.savedPosts = action.payload

            })
            .addCase(fetchSavedPostsFromLocalStorage.rejected, (state) => {
                state.savedPosts = []

            });
    }
});

export const { setSavedPosts, setOwnPosts } = ownPostsSlice.actions;


export default ownPostsSlice.reducer;


