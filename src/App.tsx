import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnderConstruction from './pages/UnderConstruction';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ScholarshipPage from './pages/ScholarshipPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LogoShowcase from './pages/LogoShowcase';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/preview" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/logo" element={<LogoShowcase />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scholarship/:scholarshipSlug" element={<ScholarshipPage />} />
      </Routes>
    </Router>
  );
}

export default App;