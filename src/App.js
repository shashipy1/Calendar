import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Navbar from './Navbar';
import Calendar from './Calendar';
import Login from './Login';
 
export default function App() {

  const [username, setUsername] = useState('');
  return (
    <Router>
      {/* <Navbar username={username}/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}
