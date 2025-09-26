import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './slices/userInfoSlice'
export const store = configureStore({
    reducer: {
        userInfo: userInfoSlice
    },
})