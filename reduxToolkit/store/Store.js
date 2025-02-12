import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../slice/TodoSlice'

export const store=configureStore({
    reducer:{
        todos:todoReducer,
    },
})