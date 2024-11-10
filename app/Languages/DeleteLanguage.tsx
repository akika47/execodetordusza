import React, { useState } from 'react';

const DeleteLanguage = () => {
  const [language, setLanguage] = useState('');

  const handleDelete = async () => {
    await fetch('/api/languages/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    });
    setLanguage('');
  };

  return (
    <div className="formContainer">
      <h2>Delete Language</h2>
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        placeholder="Enter language to delete"
        required
      />
      <button onClick={handleDelete}>Delete Language</button>
    </div>
  );
};

export default DeleteLanguage;
