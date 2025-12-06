import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import cartReducer from "./slices/cartSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";
import themeReducer from "./slices/themeSlice.js";
import contactReducer from "./slices/contactSlice.js";
import productReducer from "./slices/productSlice.js";
import orderReducer from "./slices/orderSlice.js";
import categoryReducer from "./slices/categorySlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    contact: contactReducer,
    products: productReducer,
    orders: orderReducer,
    categories: categoryReducer,
  },
});

export default store;
