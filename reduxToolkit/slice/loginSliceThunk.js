import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginPost=createAsyncThunk("LoginPost",async(data)=>{
    console.log(data)
    const response=await fetch("https://test.moprep.in/api/login",
        {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }
    )
    return await response.json();
})