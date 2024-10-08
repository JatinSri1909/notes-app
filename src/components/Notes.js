// src/Notes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = ({ token }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('https://jatin-notes-api.onrender.com/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Fetch Notes Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  return (
    <div id="notesContainer">
      <h2>Your Notes</h2>
      <div id="notesList">
        {notes.map((note) => (
          <div key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
