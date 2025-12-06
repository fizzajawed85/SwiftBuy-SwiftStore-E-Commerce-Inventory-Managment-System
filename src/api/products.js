import { ref, get } from "firebase/database";
import { database } from "../firebase/config.js";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const productsRef = ref(database, "products");
    const snapshot = await get(productsRef);

    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Return array of products
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const productRef = ref(database, `products/${id}`);
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
