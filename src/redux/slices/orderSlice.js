// src/redux/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders, addOrder, updateOrder } from "../../api/firebaseAdmin.js";

// ================= Async Thunks =================

// Fetch all orders
export const loadOrders = createAsyncThunk(
  "orders/loadOrders",
  async () => {
    const orders = await getAllOrders();
    return orders || [];
  }
);

// Add order (from Shop / Cart / Wishlist)
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order) => {
    const newOrder = await addOrder(order);
    return newOrder; // full order object including id, status, createdAt
  }
);

// Update order status (admin)
export const modifyOrder = createAsyncThunk(
  "orders/modifyOrder",
  async ({ id, updatedData }) => {
    await updateOrder(id, updatedData);
    return { id, updatedData };
  }
);

// ================= Slice =================

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],       // all orders
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load orders
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add order
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update order
      .addCase(modifyOrder.fulfilled, (state, action) => {
        const index = state.items.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.updatedData
          };
        }
      });
  },
});

export default orderSlice.reducer;
