// src/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ formType, onAuth }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://jatin-notes-api.onrender.com/users/${formType}`, formData);
      onAuth(response.data.token);
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div id={`${formType}FormContainer`}>
      <h2>{formType === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {formType === 'signup' && (
          <>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{formType === 'signup' ? 'Signup' : 'Login'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
