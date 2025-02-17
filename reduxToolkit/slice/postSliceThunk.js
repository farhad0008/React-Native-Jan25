import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchPost=createAsyncThunk('fetchData',async()=>{
    const response=await fetch("https://jsonplaceholder.typicode.com/posts")
    return await response.json();
});

export const addPost=createAsyncThunk('addPost',async(newPost)=>{
    console.log(newPost)
    const response=await fetch("https://jsonplaceholder.typicode.com/posts",
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newPost)
        }
    )
    return await response.json();
});