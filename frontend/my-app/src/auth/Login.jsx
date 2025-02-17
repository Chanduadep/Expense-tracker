import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../utils/api'
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.token);
      navigate("/welcome");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && { error }}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <a href="/register"><p>New user?Register Here</p></a>
      </form>
    </div>
  );
};

export default Login;
