import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../slice/TodoSlice'
import cartSlice from '../slice/cartSlice'

export const store=configureStore({
    reducer:{
        todos:todoReducer,
        cartItem:cartSlice
    },
})