import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/preview" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;