import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PersonaTabs from '../components/PersonaTabs';
import Footer from '../components/Footer';
import SignUpModal from '../components/SignUpModal';
import SignUpOptionsModal from '../components/SignUpOptionsModal';
import SignInModal from '../components/SignInModal';
import AddProfileModal from '../components/AddProfileModal';
import AddPersonalInfoModal from '../components/AddPersonalInfoModal';
import AddAcademicInfoModal from '../components/AddAcademicInfoModal';
import AddSchoolInfoModal from '../components/AddSchoolInfoModal';
import CongratulationsModal from '../components/CongratulationsModal';
import WelcomeParentModal from '../components/WelcomeParentModal';
import AddChildProfileModal from '../components/AddChildProfileModal';
import AddChildPersonalInfoModal from '../components/AddChildPersonalInfoModal';
import AddChildAcademicInfoModal from '../components/AddChildAcademicInfoModal';
import AddChildSchoolInfoModal from '../components/AddChildSchoolInfoModal';
import ParentCongratulationsModal from '../components/ParentCongratulationsModal';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignUpOptionsModalOpen, setIsSignUpOptionsModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [isAddPersonalInfoModalOpen, setIsAddPersonalInfoModalOpen] = useState(false);
  const [isAddAcademicInfoModalOpen, setIsAddAcademicInfoModalOpen] = useState(false);
  const [isAddSchoolInfoModalOpen, setIsAddSchoolInfoModalOpen] = useState(false);
  const [isCongratulationsModalOpen, setIsCongratulationsModalOpen] = useState(false);
  const [isWelcomeParentModalOpen, setIsWelcomeParentModalOpen] = useState(false);
  const [isAddChildProfileModalOpen, setIsAddChildProfileModalOpen] = useState(false);
  const [isAddChildPersonalInfoModalOpen, setIsAddChildPersonalInfoModalOpen] = useState(false);
  const [isAddChildAcademicInfoModalOpen, setIsAddChildAcademicInfoModalOpen] = useState(false);
  const [isAddChildSchoolInfoModalOpen, setIsAddChildSchoolInfoModalOpen] = useState(false);
  const [isParentCongratulationsModalOpen, setIsParentCongratulationsModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'parent' | 'educator'>('student');
  const [profileData, setProfileData] = useState({ firstName: '', birthday: '' });
  const [childProfileData, setChildProfileData] = useState({ firstName: '', birthday: '' });

  const handleUserTypeSelected = (userType: 'student' | 'parent' | 'educator') => {
    setSelectedUserType(userType);
    setIsSignUpModalOpen(false);
    setIsSignUpOptionsModalOpen(true);
  };

  const handleEmailContinue = () => {
    setIsSignUpOptionsModalOpen(false);
    
    // Show different modal based on user type
    if (selectedUserType === 'parent') {
      setIsWelcomeParentModalOpen(true);
    } else {
      setIsAddProfileModalOpen(true);
    }
  };

  const handleProfileContinue = (data: { firstName: string; birthday: string }) => {
    setProfileData(data);
    // Save profile data to localStorage
    localStorage.setItem('userProfile', JSON.stringify(data));
    setIsAddProfileModalOpen(false);
    setIsAddPersonalInfoModalOpen(true);
  };

  const handlePersonalInfoContinue = (_data: { gender?: string; nationality?: string; cityState?: string }) => {
    setIsAddPersonalInfoModalOpen(false);
    setIsAddAcademicInfoModalOpen(true);
  };

  const handlePersonalInfoPrevious = () => {
    setIsAddPersonalInfoModalOpen(false);
    setIsAddProfileModalOpen(true);
  };

  const handleAcademicInfoContinue = (_data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => {
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
    navigate('/dashboard', { state: { firstName: profileData.firstName, birthday: profileData.birthday } });
  };

  const handleAddAcademicInfoClose = () => {
    // Since they've completed profile, show non-empty dashboard
    setIsAddAcademicInfoModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName, birthday: profileData.birthday } });
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
    navigate('/dashboard', { state: { firstName: profileData.firstName, birthday: profileData.birthday } });
  };

  const handleCongratulationsContinue = () => {
    setIsCongratulationsModalOpen(false);
    navigate('/dashboard', { state: { firstName: profileData.firstName, birthday: profileData.birthday } });
  };

  const handleSignIn = () => {
    // Close sign in modal and navigate to dashboard
    setIsSignInModalOpen(false);
    navigate('/dashboard', { state: { firstName: 'User' } });
  };

  const handleSwitchToSignUp = () => {
    // Close sign in modal and open sign up modal
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToSignIn = () => {
    // Close sign up options modal and open sign in modal
    setIsSignUpOptionsModalOpen(false);
    setIsSignInModalOpen(true);
  };

  // Welcome Parent Modal handlers
  const handleParentAddChild = () => {
    setIsWelcomeParentModalOpen(false);
    setIsAddChildProfileModalOpen(true);
  };

  const handleParentBrowseScholarships = () => {
    setIsWelcomeParentModalOpen(false);
    navigate('/dashboard', { state: { userType: 'parent', showParentNonPersonalized: true } });
  };

  // Add Child Profile Modal handlers
  const handleAddChildProfileClose = () => {
    setIsAddChildProfileModalOpen(false);
    navigate('/dashboard', { state: { userType: 'parent', showParentNonPersonalized: true } });
  };

  const handleAddChildProfileContinue = (data: { firstName: string; birthday: string }) => {
    setChildProfileData(data);
    setIsAddChildProfileModalOpen(false);
    setIsAddChildPersonalInfoModalOpen(true);
  };

  // Add Child Personal Info Modal handlers
  const handleAddChildPersonalInfoClose = () => {
    setIsAddChildPersonalInfoModalOpen(false);
    navigate('/dashboard', { state: { userType: 'parent', showParentNonPersonalized: true } });
  };

  const handleAddChildPersonalInfoContinue = (data: { gender?: string; nationality?: string; cityState?: string }) => {
    setChildProfileData(prev => ({ ...prev, ...data }));
    setIsAddChildPersonalInfoModalOpen(false);
    setIsAddChildAcademicInfoModalOpen(true);
  };

  const handleAddChildPersonalInfoPrevious = () => {
    setIsAddChildPersonalInfoModalOpen(false);
    setIsAddChildProfileModalOpen(true);
  };

  // Add Child Academic Info Modal handlers
  const handleAddChildAcademicInfoClose = () => {
    setIsAddChildAcademicInfoModalOpen(false);
    navigate('/dashboard', { state: { userType: 'parent', showParentNonPersonalized: true } });
  };

  const handleAddChildAcademicInfoContinue = (data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => {
    setChildProfileData(prev => ({ ...prev, ...data }));
    setIsAddChildAcademicInfoModalOpen(false);
    setIsAddChildSchoolInfoModalOpen(true);
  };

  const handleAddChildAcademicInfoPrevious = () => {
    setIsAddChildAcademicInfoModalOpen(false);
    setIsAddChildPersonalInfoModalOpen(true);
  };

  // Add Child School Info Modal handlers
  const handleAddChildSchoolInfoClose = () => {
    setIsAddChildSchoolInfoModalOpen(false);
    navigate('/dashboard', { state: { userType: 'parent', showParentNonPersonalized: true } });
  };

  const handleAddChildSchoolInfoContinue = (data: { major?: string; degree?: string; graduationYear?: string }) => {
    const completeChildData = { ...childProfileData, ...data };
    setChildProfileData(completeChildData);
    // Save child profile data to localStorage
    localStorage.setItem('childProfile', JSON.stringify(completeChildData));
    setIsAddChildSchoolInfoModalOpen(false);
    setIsParentCongratulationsModalOpen(true);
  };

  const handleAddChildSchoolInfoPrevious = () => {
    setIsAddChildSchoolInfoModalOpen(false);
    setIsAddChildAcademicInfoModalOpen(true);
  };

  // Parent Congratulations Modal handler
  const handleParentCongratulationsContinue = () => {
    setIsParentCongratulationsModalOpen(false);
    navigate('/dashboard', { 
      state: { 
        userType: 'parent', 
        showParentNonPersonalized: false,
        isParentChildFTUE: true,
        childFirstName: childProfileData.firstName
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header 
        onSignUpClick={() => setIsSignUpModalOpen(true)} 
        onLoginClick={() => setIsSignInModalOpen(true)}
      />
      <main>
        <Hero onLoginClick={() => setIsSignInModalOpen(true)} />
        <PersonaTabs onLoginClick={() => setIsSignInModalOpen(true)} />
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
        onLogin={handleSwitchToSignIn}
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
      
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
        onRegister={handleSwitchToSignUp}
      />
      
      <WelcomeParentModal
        isOpen={isWelcomeParentModalOpen}
        onClose={handleParentBrowseScholarships}
        onAddChild={handleParentAddChild}
        onBrowseScholarships={handleParentBrowseScholarships}
      />
      
      <AddChildProfileModal
        isOpen={isAddChildProfileModalOpen}
        onClose={handleAddChildProfileClose}
        onContinue={handleAddChildProfileContinue}
        currentStep={1}
        totalSteps={4}
      />
      
      <AddChildPersonalInfoModal
        isOpen={isAddChildPersonalInfoModalOpen}
        onClose={handleAddChildPersonalInfoClose}
        onContinue={handleAddChildPersonalInfoContinue}
        onPrevious={handleAddChildPersonalInfoPrevious}
        currentStep={2}
        totalSteps={4}
      />
      
      <AddChildAcademicInfoModal
        isOpen={isAddChildAcademicInfoModalOpen}
        onClose={handleAddChildAcademicInfoClose}
        onContinue={handleAddChildAcademicInfoContinue}
        onPrevious={handleAddChildAcademicInfoPrevious}
        currentStep={3}
        totalSteps={4}
      />
      
      <AddChildSchoolInfoModal
        isOpen={isAddChildSchoolInfoModalOpen}
        onClose={handleAddChildSchoolInfoClose}
        onContinue={handleAddChildSchoolInfoContinue}
        onPrevious={handleAddChildSchoolInfoPrevious}
        currentStep={4}
        totalSteps={4}
      />
      
      <ParentCongratulationsModal
        isOpen={isParentCongratulationsModalOpen}
        onContinue={handleParentCongratulationsContinue}
      />
    </div>
  );
};

export default LandingPage;