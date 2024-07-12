import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:{}
    },
    reducers:{
        addUser:(state,action) => {
            console.log(action.payload,"action.payload")
            state.userData = {...action.payload}
        },
        clearUser:(state) =>{
            state.userData={}
        },
        editUser:(state,action) => {
            state.userData = {...state.userData,...action.payload}
        },
        getUser:() =>{},
        updateUser:()=>{}
    }
})
export const {addUser,clearUser,editUser,updateUser,getUser} =userSlice.actions

export default userSlice.reducer