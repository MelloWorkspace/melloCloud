import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import fileReducer from './reducers/fileSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { userApi } from '../services/user';
import { fileApi } from '../services/file';

export const store = configureStore({
    reducer: {
        users: userReducer,
        files: fileReducer,
        [userApi.reducerPath]: userApi.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, fileApi.middleware)
})



// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;