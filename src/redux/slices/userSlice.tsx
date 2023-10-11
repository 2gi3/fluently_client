import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Gender } from '../../types/user';

export interface UserStateT {
    user: {
        id: number | null;
        email: string | null;
        password: string | null;
        name: string | null;
        age: number | null;
        gender: Gender | null;
        nationality: string | null;
        country: string | null;
        native_language: string | null;
        teaching_language: string | null;
        learning_language: string | null;
        image: string | null;
        description: string | null;
        banned: boolean | null;
    }
}

const initialState: UserStateT = {
    user: {
        id: null,
        image: null,
        description: null,
        banned: null,
        email: null,
        password: null,
        name: null,
        age: null,
        gender: null,
        nationality: null,
        country: null,
        native_language: null,
        teaching_language: null,
        learning_language: null,
    },
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: any, action: PayloadAction<UserStateT>) => {
            state.user = action.payload;
        },
        updateUserField: (state, action: PayloadAction<{ key: keyof UserStateT; value: any }>) => {
            const { key, value } = action.payload;
            if (state.user) {
                (state as any).user[key] = value;
            }
        },
        clearUser: (state) => {
            state.user = {
                id: null,
                image: null,
                description: null,
                banned: null,
                email: null,
                password: null,
                name: null,
                age: null,
                gender: null,
                nationality: null,
                country: null,
                native_language: null,
                teaching_language: null,
                learning_language: null,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, updateUserField, clearUser } = userSlice.actions;

export default userSlice.reducer;






// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import { UserT, Gender } from '../../types/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface UserState {
//     user: UserT;
// }


// // export const initializeUserState = createAsyncThunk<UserT | null>(
// //     'user/initializeUserState',
// //     async () => {
// //         return await getUserFromLocalStorage();
// //     }
// // );
// let initialState: UserState = {
//     user: {
//         id: 0,
//         email: '',
//         password: '',
//         name: '',
//         nationality: '',
//         country: '',
//         native_language: '',
//         teaching_language: '',
//         learning_language: '',
//         description: '',
//         age: null,
//         image: null,
//         gender: null,
//         banned: null,
//     },
// };
// const getUserFromLocalStorage = async () => {
//     const user = await AsyncStorage.getItem('@user');
//     return user ? JSON.parse(user) : null;
// };
// export const initializeUserState = createAsyncThunk<UserT | null>(
//     'user/initializeUserState',
//     async () => {
//         const userData = await getUserFromLocalStorage();
//         return userData || {
//             id: 0,
//             email: 'hello',
//             password: '',
//             name: '',
//             nationality: '',
//             country: '',
//             native_language: '',
//             teaching_language: '',
//             learning_language: '',
//             description: '',
//             age: null,
//             image: null,
//             gender: null,
//             banned: null,
//         };
//     }
// );


// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUser: (state, action: PayloadAction<UserT>) => {
//             state.user = action.payload;
//         },
//         updateUserField: (state: any, action: PayloadAction<{ key: keyof UserT; value: UserT[keyof UserT] }>) => {
//             const { key, value } = action.payload;

//             if (state.user) {
//                 state.user[key] = value;
//             }
//         },


//         clearUser: (state) => {
//             state.user = {
//                 id: 0,
//                 email: '',
//                 password: '',
//                 name: '',
//                 nationality: '',
//                 country: '',
//                 native_language: '',
//                 teaching_language: '',
//                 learning_language: '',
//                 description: '',
//                 age: null,
//                 image: null,
//                 gender: null,
//                 banned: null,
//             };
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(initializeUserState.fulfilled, (state: any, action) => {
//             state.user = action.payload;
//         });
//     },
// });

// export const { setUser, updateUserField, clearUser } = userSlice.actions;

// export default userSlice.reducer;
