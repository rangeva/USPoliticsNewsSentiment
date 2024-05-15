import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import  {authReducer } from "./Slice/Authslice";


const reducer =combineReducers({
    news :authReducer,
})


const Store = configureStore({
    reducer : reducer
})

export default Store;