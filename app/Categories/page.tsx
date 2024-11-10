"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '../Styles/Categories.css';

const CategoryList = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) {
      setError("Category name is required.");
      return;
    }

    try {
      const response = await fetch("/api/categories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });

      const data = await response.json();
      if (data.status === 200) {
        setCategories((prev) => [
          ...prev,
          { id: data.data.id, name: newCategory },
        ]);
        setNewCategory("");
        setError("");
      } else {
        setError(data.data || "Failed to add category.");
      }
    } catch (error) {
      setError("An error occurred while adding the category.");
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategoryName) {
      setError("Category name is required.");
      return;
    }

    try {
      const response = await fetch("/api/categories/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editCategoryId, name: editCategoryName }),
      });

      const data = await response.json();
      if (data.status === 200) {
        setCategories((prev) =>
          prev.map((category) =>
            category.id === editCategoryId
              ? { ...category, name: editCategoryName }
              : category
          )
        );
        setEditCategoryId(null);
        setEditCategoryName("");
        setError("");
      } else {
        setError(data.message || "Failed to edit category.");
      }
    } catch (error) {
      setError("An error occurred while editing the category.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch('/api/categories/delete', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        setCategories(categories.filter(category => category.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="category-management-container">
        <h1>Categories</h1>

        <form className="category-form" onSubmit={handleAddCategory}>
          <input
            className="category-input"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
          />
          <button className="btn add-btn" type="submit">Add Category</button>
        </form>

        <form className="category-form" onSubmit={handleEditCategory}>
          {editCategoryId !== null && (
            <>
              <input
                className="category-input"
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                placeholder="Edit category"
              />
              <button className="btn save-btn" type="submit">Save Changes</button>
            </>
          )}
        </form>

        {error && <p className="error-message">{error}</p>}

        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              {category.name}
              <button
                className="btn edit-btn"
                onClick={() => {
                  setEditCategoryId(category.id);
                  setEditCategoryName(category.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoryList;
