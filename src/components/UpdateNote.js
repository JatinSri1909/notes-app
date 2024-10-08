// src/UpdateNote.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateNote = ({ token }) => {
  const [noteId, setNoteId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateNote = async () => {
    try {
      await axios.put(
        `https://jatin-notes-api.onrender.com/notes/${noteId}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the notes after updating
      window.location.reload();
    } catch (error) {
      console.error('Update Note Error:', error);
    }
  };

  return (
    <div id="updateNoteContainer">
      <h2>Update Note</h2>
      <label htmlFor="noteId">Note ID:</label>
      <input type="text" id="noteId" name="noteId" value={noteId} onChange={(e) => setNoteId(e.target.value)} required />
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </form>
      <button onClick={handleUpdateNote}>Update Note</button>
    </div>
  );
};

export default UpdateNote;
