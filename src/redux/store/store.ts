import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlices";
import postSlice from "../slices/postSlice";
import adminSlice from "../slices/adminSlice";
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key:"root",
    whitelist:["user","admin"],
    storage,
}

const reducer = combineReducers({
    user:userSlice,
    post:postSlice,
    admin:adminSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

const Store = configureStore({
    reducer:{
        persisted:persistedReducer
    }
})
const persistor = persistStore(Store)

export{Store,persistor}