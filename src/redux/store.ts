import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import newUserReducer from './slices/newUserSlice'
// import userReducer from './slices/userSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newUser: newUserReducer
    // user: userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch