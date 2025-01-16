import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        updateCartCount : (state,action)=>{
            return action.payload
        }
    }
});

export const {updateCartCount} = cartSlice.actions;

export default cartSlice.reducer;