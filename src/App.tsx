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
import EmailPreview from './pages/EmailPreview';
import DoNotSell from './pages/DoNotSell';
import PaymentLandingPage from './pages/PaymentLandingPage';
import InvitationAcceptancePage from './pages/InvitationAcceptancePage';
import ParentPaymentEmailPreview from './pages/ParentPaymentEmailPreview';
import ParentPaymentPage from './pages/ParentPaymentPage';
import ParentPaymentSuccessPage from './pages/ParentPaymentSuccessPage';
import CookieBanner from './components/CookieBanner';
import { PaymentProvider } from './contexts/PaymentContext';

function App() {
  // Use basename only in production (GitHub Pages)
  const basename = import.meta.env.PROD ? '/scholartrail' : '';
  
  return (
    <PaymentProvider>
      <Router basename={basename}>
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
          <Route path="/join/:parentId/:childId" element={<LandingPage />} />
          <Route path="/email-preview" element={<EmailPreview />} />
          <Route path="/do-not-sell" element={<DoNotSell />} />
          <Route path="/pay/:token" element={<PaymentLandingPage />} />
          <Route path="/invitation/:invitationToken" element={<InvitationAcceptancePage />} />
          <Route path="/parent-payment-email-preview" element={<ParentPaymentEmailPreview />} />
          <Route path="/parent-payment/:token" element={<ParentPaymentPage />} />
          <Route path="/parent-payment-success" element={<ParentPaymentSuccessPage />} />
        </Routes>
        <CookieBanner />
      </Router>
    </PaymentProvider>
  );
}

export default App;