import React, { useState } from 'react';

const DeleteCategory = () => {
  const [category, setCategory] = useState('');

  const handleDelete = async () => {
    await fetch('/api/categories/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category }),
    });
    setCategory('');
  };

  return (
    <div className="formContainer">
      <h2>Delete Category</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category to delete"
        required
      />
      <button onClick={handleDelete}>Delete Category</button>
    </div>
  );
};

export default DeleteCategory;
