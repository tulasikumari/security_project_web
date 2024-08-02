import { configureStore } from "@reduxjs/toolkit";
import { userReducer, cartReducer } from "./yourReducersPath"; // Make sure to replace this with the actual path to your reducers

export const store=configureStore({
  reducer:{
    userReducer,
    cartReducer
  }
})