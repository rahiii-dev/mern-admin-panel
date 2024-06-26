import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : JSON.parse(localStorage.getItem('user')) || null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState, 
    reducers : {
        setCredential : (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        clearCredential : (state) => {
            state.user = null;
            localStorage.removeItem('user')
        }
    }
})

export const {setCredential, clearCredential} = authSlice.actions;
export default authSlice.reducer;