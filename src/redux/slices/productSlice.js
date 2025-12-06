import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/products.js";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../api/firebaseAdmin.js";

// ===== Async actions =====

// Fetch products for shop
export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async () => {
    const products = await fetchProducts();
    return products;
  }
);

// Fetch products for admin (full CRUD)
export const loadAdminProducts = createAsyncThunk(
  "products/loadAdminProducts",
  async () => {
    const products = await getAllProducts();
    return products;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    const id = await addProduct(product);
    return { id, ...product };
  }
);

export const modifyProduct = createAsyncThunk(
  "products/modifyProduct",
  async ({ id, updatedData }) => {
    await updateProduct(id, updatedData);
    return { id, updatedData };
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await deleteProduct(id);
    return id;
  }
);

// ===== Slice =====
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load shop products
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Admin load
      .addCase(loadAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAdminProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Admin create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Admin update product
      .addCase(modifyProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.updatedData };
        }
      })

      // Admin delete product
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  }
});

export default productSlice.reducer;
