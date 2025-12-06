import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar.jsx";
import { 
  loadCategories, 
  createCategory, 
  modifyCategory, 
  removeCategory 
} from "../../redux/slices/categorySlice.js";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Categories() {
  const dispatch = useDispatch();

  const { items: categories, loading } = useSelector(
    state => state.categories || { items: [], loading: false }
  );
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    dispatch(createCategory(newCategory));
    setNewCategory("");
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  const handleSave = () => {
    if (!editName.trim()) return;
    dispatch(modifyCategory({ id: editId, name: editName }));
    setEditId(null);
    setEditName("");
  };

  const handleDelete = (id) => {
    dispatch(removeCategory(id));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-none h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto h-screen">

        {/* Mobile Sidebar top full-width */}
        <div className="sm:hidden w-full">
          <Sidebar />
        </div>

        <div className="p-6">
          {/* Page Heading */}
          <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

          {/* Add new category */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              className="p-4 rounded bg-gray-800 flex-1"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
            />
            <button
              onClick={handleAdd}
              className="bg-accent text-black px-4 py-4 rounded hover:bg-yellow-300 transition"
            >
              Add
            </button>
          </div>

          {loading && <p className="text-gray-400">Loading categories...</p>}
          {!loading && categories.length === 0 && (
            <p className="text-gray-400">No categories yet.</p>
          )}

          {/* Categories list */}
          <div className="flex flex-col gap-2 p-1">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-800 p-5 rounded-2xl"
              >
                {editId === cat.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="p-1 rounded bg-gray-700 flex-1 mb-2 sm:mb-0 sm:mr-2"
                  />
                ) : (
                  <span className="flex-1 mb-2 sm:mb-0">{cat.name}</span>
                )}

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  {editId === cat.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-gray-700 shadow-md p-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
                      title="Save"
                    >
                      <FaEdit size={18} className="text-green-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-gray-700 shadow-md p-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
                      title="Edit"
                    >
                      <FaEdit size={18} className="text-green-500" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-gray-700 shadow-md p-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
                    title="Delete"
                  >
                    <FaTrash size={18} className="text-rose-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
