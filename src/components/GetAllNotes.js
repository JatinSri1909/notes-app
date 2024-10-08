// src/GetAllNotes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllNotes = ({ token }) => {
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    try {
      const response = await axios.get('https://jatin-notes-api.onrender.com/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Fetch All Notes Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllNotes();
    }
  }, [token]);

  return (
    <div id="getAllNotesContainer">
      <h2>Get All Notes</h2>
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

export default GetAllNotes;
