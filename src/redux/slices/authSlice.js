'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auth: "",
  loading:false,
  message:"",
  searchedAuthor:""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading= true;
    },
    loginSuccess: (state, action) => {
      state.loading= false;
      state.auth = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
    findSuccess:(state, action)=>{
      state.searchedAuthor = action.payload;
    }
  },
});

export const { loginSuccess,loginRequest, logout, findSuccess } = authSlice.actions;

export default authSlice.reducer;

export const getAuthState = (state)=>state.auth
