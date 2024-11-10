"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const DeadlineManagement = () => {
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");
  const [dateType, setDateType] = useState<"startDate" | "closeDate">("startDate");

  const fetchDates = async () => {
    try {
      const response = await fetch(`/api/deadline?date=${dateType}`);
      const data = await response.json();
      if (data.status === 200) {
        if (dateType === "startDate") {
          setStartDate(data.data);
        } else {
          setCloseDate(data.data);
        }
      } else {
        setError("Failed to fetch date.");
      }
    } catch (error) {
      setError("Error fetching date.");
    }
  };

  const handleUpdateDate = async () => {
    if (!newDate) {
      setError("New date is required.");
      return;
    }

    try {
      const response = await fetch(`/api/deadline/modify`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateType, value: newDate }),
      });
      const data = await response.json();
      if (data.status === 200) {
        fetchDates();  // Refresh the dates
        setNewDate("");
        setError("");
      } else {
        setError("Failed to update date.");
      }
    } catch (error) {
      setError("Error updating date.");
    }
  };

  useEffect(() => {
    fetchDates();
  }, [dateType]);

  return (
    <>
      <Header />
      <div>
        <h1>Manage Deadline</h1>

        <div>
          <h3>Start Date: {startDate}</h3>
          <h3>Close Date: {closeDate}</h3>
        </div>

        <div>
          <label>
            Choose Date Type:
            <select
              value={dateType}
              onChange={(e) => setDateType(e.target.value as "startDate" | "closeDate")}
            >
              <option value="startDate">Start Date</option>
              <option value="closeDate">Close Date</option>
            </select>
          </label>
        </div>

        <div>
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button onClick={handleUpdateDate}>Update Date</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default DeadlineManagement;
