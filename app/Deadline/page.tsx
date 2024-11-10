'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/Styles/Deadline.css'; 

const DeadlinePage = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [closeDate, setCloseDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchDeadline = async () => {
      setLoading(true);
      try {
        const startDateResponse = await fetch('/api/deadline?date=startDate');
        const startData = await startDateResponse.json();

        if (startData.status === 200) {
          setStartDate(startData.data);
        } else {
          setMessage(startData.data);
        }

        const closeDateResponse = await fetch('/api/deadline?date=closeDate');
        const closeData = await closeDateResponse.json();

        if (closeData.status === 200) {
          setCloseDate(closeData.data);
        } else {
          setMessage(closeData.data);
        }
      } catch (error) {
        setMessage('Error fetching data');
      }
      setLoading(false);
    };

    fetchDeadline();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/deadline/set-deadline', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, closeDate }),
    });

    if (response.ok) {
      setMessage('Deadline dates updated successfully');
    } else {
      setMessage('Failed to update deadlines');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Set Deadline Dates</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>Close Date:</label>
            <input
              type="date"
              value={closeDate}
              onChange={(e) => setCloseDate(e.target.value)}
            />
          </div>
          <button type="submit">Update Deadlines</button>
        </form>
      )}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default DeadlinePage;
