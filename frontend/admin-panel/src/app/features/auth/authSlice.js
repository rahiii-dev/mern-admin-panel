import { autoBatchEnhancer, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null
    },
    reducers : {
        setCredential : (state, action) => {
            state.user = action.payload;
        },
        clearCredential : (state) => {
            state.user = null;
        }
    }
})

export const {setCredential, clearCredential} = authSlice.actions;
export default authSlice.reducer;