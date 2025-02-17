import { createSlice } from "@reduxjs/toolkit";
import { addPost, fetchPost } from "./postSliceThunk";


 const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], status: false, error: null },
    reducers:{},

    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.status = true

        }).addCase(fetchPost.fulfilled, (state, action) => {
            state.status = false,
                state.posts = action.payload

        }).addCase(fetchPost.rejected, (state, action) => {
            state.status = false,
                state.error = action.error.message

        }).addCase(addPost.fulfilled, (state, action) => {
            state.posts.push(action.payload)
        });

    }
});
export default postsSlice.reducer;
