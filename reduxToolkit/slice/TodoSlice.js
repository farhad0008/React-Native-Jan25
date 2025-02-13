import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: Date.now(), value: action.payload,completed:false })
            console.log(action.payload)
        },
        removeTodo: (state, action) => {
            return state.filter(val => val.id !== action.payload)
        },
        completeTodo: (state, action) => {
            // console.log(action.payload)
            return state.map((val) =>
                val.id === action.payload.id ? { ...val, completed: !val.completed }: val
            );
        }
    }
})
export const { addTodo, removeTodo ,completeTodo} = todoSlice.actions
export default todoSlice.reducer