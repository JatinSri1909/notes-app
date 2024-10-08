// src/CreateNote.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://jatin-notes-api.onrender.com/notes',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Redirect to notes after creating a note
      window.location.href = '/notes';
    } catch (error) {
      console.error('Create Note Error:', error);
    }
  };

  return (
    <div id="createNoteContainer">
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
