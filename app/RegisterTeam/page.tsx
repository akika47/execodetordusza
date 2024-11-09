"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "@/app/Styles/RegisterTeam.css";
import Autocomplete from "../components/Autocomplete";

export const RegisterTeam = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(
    []
  );
  const [schools, setSchools] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // To fetch categories

  const [formData, setFormData] = useState({
    teamname: "",
    schoolName: "",
    teacher: "",
    categoryName: "",
    languageName: "",
    status: "Regisztrált", // Default enum status
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("Form data before update:", formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Form data after update:", formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Form data before sending:", JSON.stringify(formData));
      const response = await fetch("/api/RegisterTeam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:", data.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("/api/languages");
        const data = await response.json();
        if (response.ok) {
          setProgrammingLanguages(
            data.data.map((item: { name: string }) => item.name)
          );
        } else {
          console.error("Failed to fetch languages:", data.data);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("/api/schools");
        const data = await response.json();
        if (response.ok) {
          setSchools(data.data.map((item: { name: string }) => item.name));
        } else {
          console.error("Failed to fetch Schools:", data.data);
        }
      } catch (error) {
        console.log("Error fetching Schools:", error);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data.map((item: { name: string }) => item.name));
        } else {
          console.error("Failed to fetch categories:", data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="Container">
        <Header />
        <div className="mainContainer">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h1>Csapat Regisztráció</h1>

            <label htmlFor="teamname">Csapat neve:</label>
            <input
              name="teamname"
              type="text"
              value={formData.teamname}
              onChange={handleInputChange}
            />

            <label htmlFor="schoolName">Iskola neve:</label>
            <Autocomplete
              suggestions={schools}
              onSelect={(value) =>
                setFormData({ ...formData, schoolName: value })
              }
            />

            <label htmlFor="teacher">Tanár:</label>
            <input
              name="teacher"
              type="text"
              value={formData.teacher}
              onChange={handleInputChange}
            />

            <label htmlFor="categoryName">Kategória:</label>
            <Autocomplete
              suggestions={categories}
              onSelect={(value) =>
                setFormData({ ...formData, categoryName: value })
              }
            />

            <label htmlFor="languageName">Programozási nyelvek:</label>
            <Autocomplete
              suggestions={programmingLanguages}
              onSelect={(value) =>
                setFormData({ ...formData, languageName: value })
              }
            />

            <label htmlFor="status">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Regisztrált">Regisztrált</option>
              <option value="Iskola által jóváhagyva">
                Iskola által jóváhagyva
              </option>
              <option value="Szervezők által jóváhagyva">
                Szervezők által jóváhagyva
              </option>
            </select>

            <button type="submit">Regisztáció</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterTeam;
