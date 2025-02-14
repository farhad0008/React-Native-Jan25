import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartItem",
    initialState: [],
    reducers: {
        AddToCart: (state, action) => {
            const itemIndex = state.findIndex(val => val.id === action.payload.id);
            if (itemIndex !== -1) {
                // If item exists, update quantity immutably
                state[itemIndex] = {
                    ...state[itemIndex],
                    quantity: state[itemIndex].quantity + 1
                };
            } else {
                // If item doesn't exist, add it to the state
                state.push({ ...action.payload, quantity: 1 });
            }
           console.log(JSON.parse(JSON.stringify(state)))
        },
        IncreamentQuantity:(state,action)=>{
            state[action.payload] = {
                ...state[action.payload],
                quantity: state[action.payload].quantity + 1
            };
        },
        DecreamentQuantity:(state,action)=>{
            if(state[action.payload].quantity===1){
                state.splice(action.payload,1)
                return
            }
            state[action.payload] = {
                ...state[action.payload],
                quantity: state[action.payload].quantity - 1
            };
        },
        removeCartItem:(state,action)=>{
            console.log(action.payload)
            state.splice(action.payload,1)
        }
    }
});

export const { AddToCart,IncreamentQuantity,DecreamentQuantity,removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
