import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userApiSlice from "./features/api/userApiSlice";

export  default configureStore({
    reducer : {
        auth : authReducer,
        [userApiSlice.reducerPath] : userApiSlice.reducer,
    },
    middleware : (getDefaultMiddlware) => getDefaultMiddlware().concat(userApiSlice.middleware)
})