import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // Add unique cartId for each new cart row
      state.cart.push({
        ...action.payload,
        cartId: Date.now(), // unique for each cart entry
        quantity: action.payload.quantity || 1,
      });
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter((i) => i.cartId !== action.payload);
    },

    updateQuantity(state, action) {
      const { cartId, quantity } = action.payload;
      const item = state.cart.find((i) => i.cartId === cartId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
