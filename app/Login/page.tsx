'use client';

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import '@/app/Styles/Login.css'
import Autocomplete from "../components/Autocomplete";

const Login = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('/api/languages'); // Assuming '/api/languages' is the correct API route
        const data = await response.json();
        if (response.ok) {
          // Assuming the 'data' object contains an array of languages
          setProgrammingLanguages(data.data.map((item: { name: string }) => item.name));
        } else {
          console.error("Failed to fetch languages:", data.data);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div></div>
  );
};

export default Login;
