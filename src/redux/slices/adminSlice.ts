import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        adminData:{}
    },
    reducers:{
        addAdmin:(state,action) =>{
            console.log(action.payload,"action.payload")
            state.adminData =  {...state.adminData,...action.payload}
        },
        clearAdmin:(state) => {
            state.adminData = {...state}
        },
        getAdmin:() => {}
    }
})

export const {addAdmin,clearAdmin,getAdmin} = adminSlice.actions

export default adminSlice.reducer