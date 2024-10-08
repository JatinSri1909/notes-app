// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthForm from './components/AuthForm';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import GetAllNotes from './components/GetAllNotes';
import UpdateNote from './components/UpdateNote';
import DeleteNote from './components/DeleteNote';

const RedirectTo = ({ path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  }, [navigate, path]);
  return null;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleAuth = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="container">
        <h1>Notes App</h1>
        <Routes>
          <Route path="/" element={token ? <RedirectTo path="/notes" /> : <RedirectTo path="/signin" />} />
          <Route path="/signin" element={token ? <RedirectTo path="/notes" /> : <AuthForm formType="signin" onAuth={handleAuth} />} />
          <Route path="/signup" element={token ? <RedirectTo path="/notes" /> : <AuthForm formType="signup" onAuth={handleAuth} />} />
          <Route path="/notes" element={!token ? <RedirectTo path="/signin" /> : <Notes token={token} />} />
          <Route path="/create-note" element={!token ? <RedirectTo path="/signin" /> : <CreateNote token={token} />} />
          <Route path="/get-all-notes" element={!token ? <RedirectTo path="/signin" /> : <GetAllNotes token={token} />} />
          <Route path="/update-note" element={!token ? <RedirectTo path="/signin" /> : <UpdateNote token={token} />} />
          <Route path="/delete-note" element={!token ? <RedirectTo path="/signin" /> : <DeleteNote token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;