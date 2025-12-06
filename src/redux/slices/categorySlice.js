// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../../api/firebaseAdmin.js";

// ================= Async Thunks =================

// Fetch all categories
export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async () => {
    const categories = await getAllCategories();
    return categories;
  }
);

// Add a new category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (name) => {
    const id = await addCategory({ name });
    return { id, name };
  }
);

// Update a category
export const modifyCategory = createAsyncThunk(
  "categories/modifyCategory",
  async ({ id, name }) => {
    await updateCategory(id, { name });
    return { id, name };
  }
);

// Delete a category
export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id) => {
    await deleteCategory(id);
    return id;
  }
);

// ================= Slice =================
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(modifyCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) state.items[index].name = action.payload.name;
      })

      // Delete
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(cat => cat.id !== action.payload);
      });
  },
});

// Export the reducer as default
export default categorySlice.reducer;
