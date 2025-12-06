// src/components/ModalForm.jsx
import React, { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: "", price: "", category: "", image: "" });

  // Update form when editing a product
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", price: "", category: "", image: "" });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-md flex flex-col gap-4 text-white"
      >
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800"
          required
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-300 transition"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
