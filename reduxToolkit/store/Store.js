import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../slice/TodoSlice'
import cartSlice from '../slice/cartSlice'
// import postReducer from '../slice/postSlice'
import postReducer from '../slice/postSlice'
import LoginReducer from '../slice/loginSLice'
export const store=configureStore({
    reducer:{
        todos:todoReducer,
        cartItem:cartSlice,
        posts:postReducer,
        loginData:LoginReducer
    },
})