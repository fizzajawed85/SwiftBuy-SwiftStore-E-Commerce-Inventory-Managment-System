import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar.jsx";
import ProductCardAdmin from "../../components/ProductCardAdmin.jsx";
import ModalForm from "../../components/ModalForm.jsx";
import {
  loadAdminProducts,
  createProduct,
  modifyProduct,
  removeProduct,
} from "../../redux/slices/productSlice.js";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.items || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(loadAdminProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingProduct) {
      dispatch(modifyProduct({ id: editingProduct.id, updatedData: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(removeProduct(id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-none w-64 h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto h-screen">
        {/* Mobile Sidebar top full-width */}
        <div className="sm:hidden w-full">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="p-6 sm:ml-0">
          {/* Mobile Title */}
          <div className="sm:hidden mb-6 mt-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manage Products</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 px-4 py-2 text-black rounded hover:bg-yellow-300 transition"
            >
              Add
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 px-4 py-2 text-black rounded hover:bg-yellow-300 transition"
            >
              Add Product
            </button>
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-4">
            {products.length === 0 ? (
              <p className="text-gray-300">No products available.</p>
            ) : (
              products.map((product) => (
                <ProductCardAdmin
                  key={product.id}
                  product={product}
                  onEdit={() => handleEdit(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))
            )}
          </div>

          {/* Modal Form */}
          {isModalOpen && (
            <ModalForm
              isOpen={isModalOpen}
              initialData={editingProduct}
              onSubmit={handleSubmit}
              onClose={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
