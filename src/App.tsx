import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ScholarshipPage from './pages/ScholarshipPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/preview" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scholarship/:scholarshipSlug" element={<ScholarshipPage />} />
      </Routes>
    </Router>
  );
}

export default App;