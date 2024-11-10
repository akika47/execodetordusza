import React, { useState } from 'react';

const AddCategory = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/categories/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category }),
    });
    setCategory('');
  };

  return (
    <div className="formContainer">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
