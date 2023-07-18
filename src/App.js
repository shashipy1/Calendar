import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import Signup from './Components/Register/Signup';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/Login/LogIn';
import Calendarfn from './Components/Calendar/Calendarfn';

export default function App() {
  const [username, setUsername] = useState('');
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <Router>
      <Navbar username={username} setUsername={setUsername} />
      <Routes>
        <Route
          path="/"
          element={ isLoggedIn == "true" ? <Calendarfn /> : <LogIn setUsername={setUsername} /> }
        />
        <Route
          path="/login"
          element={<LogIn setUsername={setUsername} />}
        />
        <Route
          path="/signup"
          element={<Signup setUsername={setUsername} />}
        />
        <Route path="/calendar" element={<Calendarfn />} />
      </Routes>
    </Router>
  );
}
