"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '../Styles/Languages.css';

const LanguageList = () => {
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [error, setError] = useState("");
  const [editLanguageId, setEditLanguageId] = useState<number | null>(null);
  const [editLanguageName, setEditLanguageName] = useState("");

  const fetchLanguages = async () => {
    const response = await fetch("/api/languages");
    const data = await response.json();
    setLanguages(data.data);
  };

  const handleAddLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLanguage) {
      setError("Language name is required.");
      return;
    }

    try {
      const response = await fetch("/api/languages/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newLanguage }),
      });

      const data = await response.json();
      if (data.status === 200) {
        setLanguages((prev) => [
          ...prev,
          { id: data.data.id, name: newLanguage },
        ]);
        setNewLanguage("");
        setError("");
      } else {
        setError(data.data || "Failed to add language.");
      }
    } catch (error) {
      setError("An error occurred while adding the language.");
    }
  };

  const handleEditLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLanguageName) {
      setError("Language name is required.");
      return;
    }

    try {
      const response = await fetch("/api/languages/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editLanguageId, name: editLanguageName }),
      });

      const data = await response.json();
      if (data.status === 200) {
        setLanguages((prev) =>
          prev.map((language) =>
            language.id === editLanguageId
              ? { ...language, name: editLanguageName }
              : language
          )
        );
        setEditLanguageId(null);
        setEditLanguageName("");
        setError("");
      } else {
        setError(data.message || "Failed to edit language.");
      }
    } catch (error) {
      setError("An error occurred while editing the language.");
    }
  };

  const handleDeleteLanguage = async (id: number) => {
    try {
      const response = await fetch('/api/languages/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        setLanguages(languages.filter(language => language.id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <>
      <Header />
      <div className="language-management-container">
        <h1>Languages</h1>


        <form className="language-form" onSubmit={handleAddLanguage}>
          <input
            className="language-input"
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="New language"
          />
          <button className="btn add-btn" type="submit">Add Language</button>
        </form>

        <form className="language-form" onSubmit={handleEditLanguage}>
          {editLanguageId !== null && (
            <>
              <input
                className="language-input"
                type="text"
                value={editLanguageName}
                onChange={(e) => setEditLanguageName(e.target.value)}
                placeholder="Edit language"
              />
              <button className="btn save-btn" type="submit">Save Changes</button>
            </>
          )}
        </form>

        {error && <p className="error-message">{error}</p>}

        <ul className="language-list">
          {languages.map((language) => (
            <li key={language.id} className="language-item">
              {language.name}
              <button
                className="btn edit-btn"
                onClick={() => {
                  setEditLanguageId(language.id);
                  setEditLanguageName(language.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteLanguage(language.id)}
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

export default LanguageList;
