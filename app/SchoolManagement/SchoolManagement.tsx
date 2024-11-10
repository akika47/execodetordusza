'use client';

import { useState, useEffect } from 'react';

type School = {
  id: number;
  name: string;
  city: string;
  principal: number;
};

const SchoolManagement = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [schoolName, setSchoolName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/schools');
        const data = await response.json();
        if (data.status === 200) {
          setSchools(data.data);
        } else {
          setError('Failed to load schools.');
        }
      } catch (err) {
        setError('Error fetching schools data.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const createSchool = async () => {
    if (!schoolName || !city) {
      setError('Both name and city are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: schoolName, city }),
      });
      const data = await response.json();
      if (data.status === 200) {
        const newSchool: School = { id: data.data.id, name: data.data.name, city: data.data.city, principal: data.data.principal };
        setSchools([...schools, newSchool]);
        setSchoolName('');
        setCity('');
        setError('');
      } else {
        setError('Failed to add the school.');
      }
    } catch (err) {
      setError('Error creating the school.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSchool = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/schools/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status === 200) {
        setSchools(schools.filter((school) => school.id !== id));
        setError('');
      } else {
        setError('Failed to delete the school.');
      }
    } catch (err) {
      setError('Error deleting the school.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>School Management</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Add New School</h3>
        <input
          type="text"
          placeholder="School Name"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={createSchool} disabled={loading}>
          {loading ? 'Adding...' : 'Add School'}
        </button>
      </div>

      <h3>Schools List</h3>
      {loading ? (
        <p>Loading schools...</p>
      ) : (
        <ul>
          {schools.map((school) => (
            <li key={school.id}>
              <p>{school.name} - {school.city}</p>
              <button onClick={() => deleteSchool(school.id)} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchoolManagement;
