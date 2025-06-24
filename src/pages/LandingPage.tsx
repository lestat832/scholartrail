import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PersonaTabs from '../components/PersonaTabs';
import Footer from '../components/Footer';
import SignUpModal from '../components/SignUpModal';
import SignUpOptionsModal from '../components/SignUpOptionsModal';
import AddProfileModal from '../components/AddProfileModal';
import AddPersonalInfoModal from '../components/AddPersonalInfoModal';
import AddAcademicInfoModal from '../components/AddAcademicInfoModal';
import AddSchoolInfoModal from '../components/AddSchoolInfoModal';
import CongratulationsModal from '../components/CongratulationsModal';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignUpOptionsModalOpen, setIsSignUpOptionsModalOpen] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [isAddPersonalInfoModalOpen, setIsAddPersonalInfoModalOpen] = useState(false);
  const [isAddAcademicInfoModalOpen, setIsAddAcademicInfoModalOpen] = useState(false);
  const [isAddSchoolInfoModalOpen, setIsAddSchoolInfoModalOpen] = useState(false);
  const [isCongratulationsModalOpen, setIsCongratulationsModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'parent' | 'educator'>('student');
  const [profileData, setProfileData] = useState({ firstName: '', birthday: '' });
  const [personalInfoData, setPersonalInfoData] = useState({ gender: '', nationality: '', cityState: '' });
  const [academicInfoData, setAcademicInfoData] = useState({ gradeLevel: '', schoolType: '', gpa: '' });

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
    setProfileData(data);
    setIsAddProfileModalOpen(false);
    setIsAddPersonalInfoModalOpen(true);
  };

  const handlePersonalInfoContinue = (data: { gender?: string; nationality?: string; cityState?: string }) => {
    setPersonalInfoData({ 
      gender: data.gender || '', 
      nationality: data.nationality || '', 
      cityState: data.cityState || '' 
    });
    setIsAddPersonalInfoModalOpen(false);
    setIsAddAcademicInfoModalOpen(true);
  };

  const handlePersonalInfoPrevious = () => {
    setIsAddPersonalInfoModalOpen(false);
    setIsAddProfileModalOpen(true);
  };

  const handleAcademicInfoContinue = (data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => {
    setAcademicInfoData({ 
      gradeLevel: data.gradeLevel || '', 
      schoolType: data.schoolType || '', 
      gpa: data.gpa || '' 
    });
    setIsAddAcademicInfoModalOpen(false);
    setIsAddSchoolInfoModalOpen(true);
  };

  const handleAcademicInfoPrevious = () => {
    setIsAddAcademicInfoModalOpen(false);
    setIsAddPersonalInfoModalOpen(true);
  };

  const handleAddProfileClose = () => {
    // Navigate to dashboard empty state
    setIsAddProfileModalOpen(false);
    navigate('/dashboard', { state: { showEmptyState: true } });
  };

  const handleAddPersonalInfoClose = () => {
    // Since they've completed profile, show non-empty dashboard
    setIsAddPersonalInfoModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  const handleAddAcademicInfoClose = () => {
    // Since they've completed profile, show non-empty dashboard
    setIsAddAcademicInfoModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  const handleSchoolInfoContinue = (data: { major?: string; degree?: string; graduationYear?: string }) => {
    console.log('School info data:', data);
    setIsAddSchoolInfoModalOpen(false);
    setIsCongratulationsModalOpen(true);
  };

  const handleSchoolInfoPrevious = () => {
    setIsAddSchoolInfoModalOpen(false);
    setIsAddAcademicInfoModalOpen(true);
  };

  const handleAddSchoolInfoClose = () => {
    // Since they've completed profile, show non-empty dashboard
    setIsAddSchoolInfoModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  const handleCongratulationsContinue = () => {
    setIsCongratulationsModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
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

      <AddPersonalInfoModal
        isOpen={isAddPersonalInfoModalOpen}
        onClose={handleAddPersonalInfoClose}
        onContinue={handlePersonalInfoContinue}
        onPrevious={handlePersonalInfoPrevious}
        currentStep={2}
        totalSteps={4}
      />

      <AddAcademicInfoModal
        isOpen={isAddAcademicInfoModalOpen}
        onClose={handleAddAcademicInfoClose}
        onContinue={handleAcademicInfoContinue}
        onPrevious={handleAcademicInfoPrevious}
        currentStep={3}
        totalSteps={4}
      />

      <AddSchoolInfoModal
        isOpen={isAddSchoolInfoModalOpen}
        onClose={handleAddSchoolInfoClose}
        onContinue={handleSchoolInfoContinue}
        onPrevious={handleSchoolInfoPrevious}
        currentStep={4}
        totalSteps={4}
      />

      <CongratulationsModal
        isOpen={isCongratulationsModalOpen}
        onContinue={handleCongratulationsContinue}
      />
    </div>
  );
};

export default LandingPage;