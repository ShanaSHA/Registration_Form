import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup'; 
import Login from './Components/Login/Login'; 
import Contact from './Components/Contact/Contact'; 
import Otp from './Components/Otp-form/otp';
import FileUploader from './Components/FileUploader/FileUploader'; // Adjust the path

import './index.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/FileUploader" element={<FileUploader />} />
          <Route path="/contact" element={<Contact />} />      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
