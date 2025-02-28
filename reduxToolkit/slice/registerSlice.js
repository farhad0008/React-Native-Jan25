import { createSlice } from "@reduxjs/toolkit";
import { RegisterFormData, stateData } from "./regiisterSliceThunk";


const stateDataSlice=createSlice({
    name:'register',
    initialState:{statelist:[],status:false,error:false},
    extraReducers:(builder)=>{
        builder.addCase(stateData.fulfilled,(state,action)=>{
            console.log("registerslice",action.payload)
            state.statelist=action.payload;
        }).addCase(RegisterFormData.fulfilled,()=>{
            console.log("new user added")
        }).addCase(RegisterFormData.rejected,()=>{
            console.log("Register Error")
        })
    }
})
export default stateDataSlice.reducer