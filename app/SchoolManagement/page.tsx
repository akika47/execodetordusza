"use client";
import { useState, useEffect } from 'react';
import '../Styles/SchoolManagement.css';

const SchoolManagement = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [city, setCity] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      setError('');
      const response = await fetch('/api/schools');
      const data = await response.json();
      if (data.status === 200) {
        setSchools(data.data);
      } else {
        setError('Failed to load schools.');
      }
      setLoading(false);
    };

    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const response = await fetch('/api/schools/registerSchools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, schoolName, city, contactEmail }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.status === 200) {
      setSuccessMessage(data.message);
      setSchools((prevSchools) => [...prevSchools, data.data]);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="school-management">
      <h1>School Management</h1>
      
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <h2>Add New School</h2>
      <form onSubmit={handleSubmit} className="school-form">
        <div className="form-group">
          <label>
            Principal Username:
            <input
              type="text"
              placeholder="Principal Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Principal Password:
            <input
              type="password"
              placeholder="Principal Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            School Name:
            <input
              type="text"
              placeholder="School Name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            City:
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Principal Email:
            <input
              type="email"
              placeholder="Principal Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Registering...' : 'Register School'}
        </button>
      </form>

      <h2>Existing Schools</h2>
      {loading ? (
        <p>Loading schools...</p>
      ) : (
        <table className="school-table">
          <thead>
            <tr>
              <th>School Name</th>
              <th>City</th>
              <th>Principal</th>
            </tr>
          </thead>
          <tbody>
          {schools.length > 0 ? (
            schools.map((school) => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.city}</td>
                <td>{school.principal}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No schools registered</td>
            </tr>
          )}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default SchoolManagement;
