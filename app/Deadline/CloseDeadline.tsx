import React from 'react';

const CloseDeadline = () => {
  const handleClose = async () => {
    await fetch('/api/deadline/close', {
      method: 'POST',
    });
  };

  return (
    <div className="formContainer">
      <h2>Close Applications</h2>
      <button onClick={handleClose}>Close Applications</button>
    </div>
  );
};

export default CloseDeadline;
