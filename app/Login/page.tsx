"use client";

import React, { useState } from 'react';
import '../Styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    console.log("Login attempt:", { username, password });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();


      console.log("Login response data:", data);

      if (response.ok) {
        console.log("Login successful:", data);


        const role = data.data?.role;

        if (role) {
          console.log("Storing role in localStorage:", role);
          localStorage.setItem("role", role);
          
  
          setTimeout(() => {
            window.location.href = "/";
          }, 500); 
        } else {
          console.error("Role not found in response data.");
          setError("Failed to retrieve role.");
        }
      } else {
        setError(data.data || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <form onSubmit={handleLogin} className="inputContainer">
        <div className="titleContainer">Login</div>

        <input
          type="text"
          className="inputBox"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <input
          type="password"
          className="inputBox"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="errorLabel">{error}</div>}

        <button type="submit" className="inputBox buttonContainer" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
