import { createAsyncThunk } from "@reduxjs/toolkit";


export const  stateData=createAsyncThunk("fetch state data api",async()=>{
    const response= await fetch('https://test.moprep.in/api/stateList')
    return await response.json();
})

export const RegisterFormData=createAsyncThunk("new user add RegisterForm",async(params)=>{
        // console.log("paramsRegister",params);
        const response=await fetch("https://test.moprep.in/api/register",
            {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(params)
            }
        )
        return await response.json();
})