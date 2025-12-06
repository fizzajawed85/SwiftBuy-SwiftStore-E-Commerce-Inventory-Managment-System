import { ref, get, set, push, remove, update } from "firebase/database";
import { database } from "../firebase/config.js";

// ================= Products CRUD =================

// Add a new product
export const addProduct = async (product) => {
  const newProductRef = push(ref(database, "products"));
  await set(newProductRef, { id: newProductRef.key, ...product });
  return newProductRef.key;
};

// Update an existing product
export const updateProduct = async (id, updatedData) => {
  const productRef = ref(database, `products/${id}`);
  await update(productRef, updatedData);
};

// Delete a product
export const deleteProduct = async (id) => {
  const productRef = ref(database, `products/${id}`);
  await remove(productRef);
};

// Fetch all products
export const getAllProducts = async () => {
  const productsRef = ref(database, "products");
  const snapshot = await get(productsRef);
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};

// ================= Orders CRUD =================

// Add a new order
export const addOrder = async (order) => {
  const newOrderRef = push(ref(database, "orders"));
  const orderData = {
    ...order,
    status: order.status || "pending",
    createdAt: Date.now(),
    id: newOrderRef.key,
  };
  await set(newOrderRef, orderData);
  return orderData;
};

// Update an order
export const updateOrder = async (id, updatedData) => {
  const orderRef = ref(database, `orders/${id}`);
  await update(orderRef, updatedData);
};

// Delete an order
export const deleteOrder = async (id) => {
  const orderRef = ref(database, `orders/${id}`);
  await remove(orderRef);
};

// Fetch all orders
export const getAllOrders = async () => {
  const ordersRef = ref(database, "orders");
  const snapshot = await get(ordersRef);
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};

// ================= Categories CRUD =================

// Add a new category
export const addCategory = async (category) => {
  const newCatRef = push(ref(database, "categories"));
  const categoryData = {
    id: newCatRef.key,
    name: category.name,       // ensure category has a `name` property
    createdAt: Date.now(),     // optional timestamp
  };
  await set(newCatRef, categoryData);
  return categoryData;
};

// Update a category
export const updateCategory = async (id, updatedData) => {
  const catRef = ref(database, `categories/${id}`);
  await update(catRef, updatedData);
};

// Delete a category
export const deleteCategory = async (id) => {
  const catRef = ref(database, `categories/${id}`);
  await remove(catRef);
};

// Fetch all categories
export const getAllCategories = async () => {
  const catRef = ref(database, "categories");
  const snapshot = await get(catRef);
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};
