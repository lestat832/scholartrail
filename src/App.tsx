import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/preview" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;