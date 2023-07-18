import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import Signup from './Components/Register/Signup';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/Login/LogIn';
import Calendarfn from './Components/Calendar/Calendarfn';


 
export default function App() {

  const [username, setUsername] = useState('');
  return (
    <Router>
      <Navbar username={username}/>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/calendar" element={<Calendarfn /> } />
      </Routes>
    </Router>
  );
}
