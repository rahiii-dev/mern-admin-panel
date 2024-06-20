import { isRejectedWithValue } from "@reduxjs/toolkit"
import { clearCredential } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const erroMiddleware = ({ dispatch }) => {
    return (next) => (action) => {
        if(isRejectedWithValue(action)){
            const {status, data} = action.payload;

            if(status == 401 && data?.message == 'No token provided'){
                dispatch(clearCredential());
                toast.error('No token provided. Please log in again.');

            } else if( status === 403 ){
                console.log(data?.message);
                if(data?.message == 'Invalid token'){    
                    dispatch(clearCredential());
                    toast.error('Invalid token. Please log in again.');
                } else {
                    toast.error('You do not have permission to access this resource.');
                }
            } else if( status === 500){
                toast.error('Unknown error occurred. Please try again later.');
            }
        }

        return next(action);
    }
}

export default erroMiddleware