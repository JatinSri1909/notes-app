// src/DeleteNote.js
import React, { useState } from 'react';
import axios from 'axios';

const DeleteNote = ({ token }) => {
  const [noteId, setNoteId] = useState('');

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`https://jatin-notes-api.onrender.com/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the notes after deleting
      window.location.reload();
    } catch (error) {
      console.error('Delete Note Error:', error);
    }
  };

  return (
    <div id="deleteNoteContainer">
      <h2>Delete Note</h2>
      <label htmlFor="noteId">Note ID:</label>
      <input type="text" id="noteId" name="noteId" value={noteId} onChange={(e) => setNoteId(e.target.value)} required />
      <button onClick={handleDeleteNote}>Delete Note</button>
    </div>
  );
};

export default DeleteNote;
