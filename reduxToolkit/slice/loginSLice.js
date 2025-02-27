import { createSlice } from "@reduxjs/toolkit";
import { loginPost } from "./loginSliceThunk";


const loginSlice = createSlice({
    name: 'loginData',
    initialState: { loginData: [], status: false, error: false },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginPost.pending, (state) => {
            state.status = true;
        }).addCase(loginPost.fulfilled, (state,action) => {
            state.status = false;
            
        }).addCase(loginPost.rejected, (state) => {
            state.error = true;
        })
    }
})
export default loginSlice.reducer;