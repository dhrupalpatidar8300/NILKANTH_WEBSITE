import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes as needed */}
        <Route path="/services" element={<div>Services Page (Coming Soon)</div>} />
        <Route path="/about" element={<div>About Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;