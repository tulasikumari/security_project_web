import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

// Export the generated action creators
export const { addToCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
