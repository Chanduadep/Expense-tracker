import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../utils/api'

const Login = () => {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    fullname:" "
  });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && { error }}
      <form onSubmit={handleSubmit}>
      <div>
          <label>UserName</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
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
        <div>
          <label>fullName</label>
          <input type="text" name="fullName" onChange={handleChange} required />
        </div>

        <button type="submit">Register</button>
        <a href="/login"><p>Already have an Account?Login here</p></a>
      </form>
    </div>
  );
};

export default Login;
