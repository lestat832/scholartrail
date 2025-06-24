import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PersonaTabs from '../components/PersonaTabs';
import Footer from '../components/Footer';
import SignUpModal from '../components/SignUpModal';
import SignUpOptionsModal from '../components/SignUpOptionsModal';
import AddProfileModal from '../components/AddProfileModal';

const LandingPage: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignUpOptionsModalOpen, setIsSignUpOptionsModalOpen] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'parent' | 'educator'>('student');

  const handleUserTypeSelected = (userType: 'student' | 'parent' | 'educator') => {
    setSelectedUserType(userType);
    setIsSignUpModalOpen(false);
    setIsSignUpOptionsModalOpen(true);
  };

  const handleEmailContinue = () => {
    setIsSignUpOptionsModalOpen(false);
    setIsAddProfileModalOpen(true);
  };

  const handleProfileContinue = (data: { firstName: string; birthday: string }) => {
    console.log('Profile data:', data);
    // In a real app, this would proceed to the next step
    setIsAddProfileModalOpen(false);
  };

  const handleAddProfileClose = () => {
    // Navigate to dashboard empty state (for now just close)
    setIsAddProfileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onSignUpClick={() => setIsSignUpModalOpen(true)} />
      <main>
        <Hero />
        <PersonaTabs />
      </main>
      <Footer />
      
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)}
        onContinue={handleUserTypeSelected}
      />
      
      <SignUpOptionsModal
        isOpen={isSignUpOptionsModalOpen}
        onClose={() => setIsSignUpOptionsModalOpen(false)}
        userType={selectedUserType}
        onEmailContinue={handleEmailContinue}
      />

      <AddProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={handleAddProfileClose}
        onContinue={handleProfileContinue}
        currentStep={1}
        totalSteps={4}
      />
    </div>
  );
};

export default LandingPage;