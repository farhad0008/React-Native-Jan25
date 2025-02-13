import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cartItem",
    initialState: [],
    reducers: {
        AddToCart: (state, action) => {
            // Find if the item already exists in the cart
            const tempObj = state.find(val => val.id === action.payload.id);
        
            if (tempObj) {
                // If item exists, increase its quantity
                tempObj.quantity += 1;
                // console.log("tempObj"+action.payload)
            } else {
                // If item doesn't exist, add it to the state with quantity 1
                state.push({ ...action.payload, quantity: 1 });
                // console.log("state"+state.id)
                
            }
        }
    }
})
export const { AddToCart } = cartSlice.actions
export default cartSlice.reducer