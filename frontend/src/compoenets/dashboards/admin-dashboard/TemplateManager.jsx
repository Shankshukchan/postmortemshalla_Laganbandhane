import React, { useState } from "react";

const initialTemplates = [
  {
    id: 1,
    name: "Template With Photo",
    category: "With Photo",
    type: "Custom",
    photo: null,
    content: "Sample template with photo.",
  },
  {
    id: 2,
    name: "Plain Text Template",
    category: "Plain Text",
    type: "Text",
    photo: null,
    content: "This is a plain text template.",
  },
];

const initialCategories = ["With Photo", "Without Photo", "Plain Text"];

const TemplateManager = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "With Photo",
    type: "Custom",
    photo: null,
    content: "",
  });
  const [newCategory, setNewCategory] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setForm((f) => ({ ...f, photo: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleAddTemplate = () => {
    setShowForm(true);
    setEditId(null);
    setForm({
      name: "",
      category: categories[0],
      type: "Custom",
      photo: null,
      content: "",
    });
  };

  const handleEditTemplate = (id) => {
    const t = templates.find((tpl) => tpl.id === id);
    setForm({ ...t, photo: null });
    setEditId(id);
    setShowForm(true);
  };

  const handleDeleteTemplate = (id) => {
    if (window.confirm("Delete this template?")) {
      setTemplates((tpls) => tpls.filter((tpl) => tpl.id !== id));
    }
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      try {
        const r = new FileReader();
        r.onloadend = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
      } catch (err) {
        reject(err);
      }
    });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Template name required");
    // convert any selected photo file to data URL so it's safe to store and display
    const photoDataUrl = form.photo ? await fileToDataUrl(form.photo) : null;
    if (editId) {
      setTemplates((tpls) =>
        tpls.map((tpl) =>
          tpl.id === editId
            ? { ...tpl, ...form, photo: photoDataUrl || tpl.photo }
            : tpl
        )
      );
    } else {
      setTemplates((tpls) => [
        {
          ...form,
          id: Date.now(),
          photo: photoDataUrl,
        },
        ...tpls,
      ]);
    }
    setShowForm(false);
    setForm({
      name: "",
      category: categories[0],
      type: "Custom",
      photo: null,
      content: "",
    });
    setEditId(null);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((cats) => [...cats, newCategory.trim()]);
      setNewCategory("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Template Management</h2>
      <div className="mb-4 flex gap-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddTemplate}
        >
          Add Template
        </button>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

      {/* Template Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded shadow-lg w-full max-w-md relative"
            onSubmit={handleFormSubmit}
          >
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit" : "Add"} Template
            </h3>
            <label className="block mb-2">
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
                required
              />
            </label>
            <label className="block mb-2">
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              Type
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="Custom">Custom</option>
                <option value="Text">Plain Text</option>
              </select>
            </label>
            <label className="block mb-2">
              Photo (optional)
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
              />
            </label>
            <label className="block mb-2">
              Content
              <textarea
                name="content"
                value={form.content}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded w-full"
                rows={3}
              />
            </label>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Templates Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Photo</th>
              <th className="px-4 py-2 border">Content</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id}>
                <td className="px-4 py-2 border">{tpl.name}</td>
                <td className="px-4 py-2 border">{tpl.category}</td>
                <td className="px-4 py-2 border">{tpl.type}</td>
                <td className="px-4 py-2 border">
                  {tpl.photo ? (
                    <img
                      src={tpl.photo}
                      alt="template"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No Photo</span>
                  )}
                </td>
                <td className="px-4 py-2 border max-w-xs truncate">
                  {tpl.content}
                </td>
                <td className="px-4 py-2 border flex gap-2">
                  <button
                    className="bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => handleEditTemplate(tpl.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteTemplate(tpl.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplateManager;
