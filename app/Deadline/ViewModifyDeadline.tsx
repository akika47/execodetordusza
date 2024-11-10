import React, { useState, useEffect } from 'react';

const ViewModifyDeadline = () => {
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetch('/api/deadline/get')
      .then((response) => response.json())
      .then((data) => setDeadline(data.deadline));
  }, []);

  const handleUpdate = async () => {
    await fetch('/api/deadline/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deadline }),
    });
  };

  return (
    <div className="formContainer">
      <h2>Application Deadline</h2>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Deadline</button>
    </div>
  );
};

export default ViewModifyDeadline;
