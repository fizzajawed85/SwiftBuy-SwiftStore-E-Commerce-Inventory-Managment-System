import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "./src/firebase/config.js"; 

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function pushDummyJSON() {
  try {
    // Node 18+ built-in fetch
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    const productsArray = data.products;

    const productsObj = {};
    productsArray.forEach(p => {
      productsObj[p.id] = {
        name: p.title,
        category: p.category,
        price: p.price,
        image: p.thumbnail,
        description: p.description,
        stock: p.stock
      };
    });

    await set(ref(db, "products"), productsObj);
    console.log("✅ DummyJSON data successfully pushed to Firebase!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

pushDummyJSON();
