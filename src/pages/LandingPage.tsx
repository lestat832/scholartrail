import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { parentId, childId } = useParams<{ parentId: string; childId: string }>();
  
  console.log('LandingPage - Route params:', { parentId, childId });
  console.log('LandingPage - Current URL:', window.location.href);
  
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
  const [isFromInvitation, setIsFromInvitation] = useState(false);
  const [invitationData, setInvitationData] = useState<{ parentId: string; childId: string } | null>(null);
  const [_showConnectModal, _setShowConnectModal] = useState(false);

  // Check for invitation parameters on mount
  useEffect(() => {
    console.log('Checking invitation params - parentId:', parentId, 'childId:', childId);
    if (parentId && childId) {
      console.log('Invitation detected! Setting up invitation flow...');
      setIsFromInvitation(true);
      setInvitationData({ parentId, childId });
      // Store invitation data in sessionStorage to persist through sign-up flow
      sessionStorage.setItem('invitationData', JSON.stringify({ parentId, childId }));
      // Auto-open sign-up options modal for student
      setSelectedUserType('student');
      setIsSignUpOptionsModalOpen(true);
    }
  }, [parentId, childId]);
  
  // Also check sessionStorage on mount in case of page refresh
  useEffect(() => {
    const storedInvitation = sessionStorage.getItem('invitationData');
    if (storedInvitation && !invitationData) {
      console.log('Found stored invitation data:', storedInvitation);
      const parsed = JSON.parse(storedInvitation);
      setIsFromInvitation(true);
      setInvitationData(parsed);
      setSelectedUserType('student');
    }
  }, []);

  const handleConnectWithParent = () => {
    // For now, just open the sign-up modal as a student
    // In a full implementation, we'd have a modal to enter parent email/code
    setSelectedUserType('student');
    setIsSignUpModalOpen(true);
  };

  const handleUserTypeSelected = (userType: 'student' | 'parent' | 'educator') => {
    setSelectedUserType(userType);
    setIsSignUpModalOpen(false);
    setIsSignUpOptionsModalOpen(true);
  };

  // Helper function to retrieve child data by ID
  const getChildDataById = (childId: string) => {
    // In a real app, this would be an API call
    // For demo, we'll check localStorage (though in reality, this would be on different devices)
    console.log('Looking for child with ID:', childId);
    const childrenProfiles = localStorage.getItem('childrenProfiles');
    console.log('Children profiles from localStorage:', childrenProfiles);
    
    if (childrenProfiles) {
      const children = JSON.parse(childrenProfiles);
      console.log('Parsed children:', children);
      const child = children.find((c: any) => c.id === childId);
      console.log('Found child:', child);
      
      if (child && child.profileData) {
        console.log('Returning child profileData:', child.profileData);
        return child.profileData;
      } else if (child) {
        // If child exists but profileData is missing, use the child's firstName
        console.log('Child found but no profileData, using firstName:', child.firstName);
        return {
          firstName: child.firstName,
          birthday: child.birthday || '2006-01-01',
          gender: '',
          nationality: '',
          cityState: '',
          gradeLevel: '',
          schoolType: '',
          gpa: '',
          major: '',
          degree: '',
          graduationYear: ''
        };
      }
    }
    
    // For demo purposes, if specific childId is '1', return Kona's data
    if (childId === '1') {
      console.log('Using demo data for Kona');
      return {
        firstName: 'Kona',
        birthday: '2006-01-01',
        gender: '',
        nationality: '',
        cityState: '',
        gradeLevel: '',
        schoolType: '',
        gpa: '',
        major: '',
        degree: '',
        graduationYear: ''
      };
    }
    
    console.log('Child not found, returning fallback data');
    // Fallback data if child not found (e.g., different browser/device)
    return {
      firstName: 'Student',
      birthday: '2006-01-01',
      gender: '',
      nationality: '',
      cityState: '',
      gradeLevel: '',
      schoolType: '',
      gpa: '',
      major: '',
      degree: '',
      graduationYear: ''
    };
  };

  const handleEmailContinue = () => {
    setIsSignUpOptionsModalOpen(false);
    
    console.log('handleEmailContinue called - checking invitation status');
    console.log('isFromInvitation:', isFromInvitation);
    console.log('selectedUserType:', selectedUserType);
    console.log('invitationData:', invitationData);
    
    // Also check sessionStorage in case state was lost
    const storedInvitation = sessionStorage.getItem('invitationData');
    console.log('Stored invitation in sessionStorage:', storedInvitation);
    
    const effectiveInvitationData = invitationData || (storedInvitation ? JSON.parse(storedInvitation) : null);
    
    // If coming from invitation as a student, skip profile creation
    if ((isFromInvitation || effectiveInvitationData) && selectedUserType === 'student' && effectiveInvitationData) {
      console.log('Processing invitation for student with data:', effectiveInvitationData);
      // Fetch the actual child data using the childId from the invitation
      const childData = getChildDataById(effectiveInvitationData.childId);
      
      console.log('Child data to use for dashboard:', childData);
      
      // Navigate directly to dashboard with pre-filled data
      navigate('/dashboard', { 
        state: { 
          firstName: childData.firstName,
          birthday: childData.birthday,
          profileData: childData,
          parentConnection: effectiveInvitationData,
          isFromInvitation: true,
          skipProfileCreation: true
        } 
      });
      return;
    }
    
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
    // Include invitation data if coming from an invitation
    const dashboardState: any = { 
      firstName: profileData.firstName, 
      birthday: profileData.birthday 
    };
    
    if (isFromInvitation && invitationData) {
      dashboardState.parentConnection = invitationData;
      dashboardState.isFromInvitation = true;
    }
    
    navigate('/dashboard', { state: dashboardState });
  };

  const handleSignIn = () => {
    // Close sign in modal and navigate to dashboard
    setIsSignInModalOpen(false);
    
    // Include invitation data if coming from an invitation
    let dashboardState: any = { firstName: 'User' };
    
    if (isFromInvitation && invitationData) {
      // If signing in from invitation, fetch the child's data
      const childData = getChildDataById(invitationData.childId);
      dashboardState = {
        firstName: childData.firstName,
        birthday: childData.birthday,
        profileData: childData,
        parentConnection: invitationData,
        isFromInvitation: true,
        skipProfileCreation: true
      };
    }
    
    navigate('/dashboard', { state: dashboardState });
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
        <Hero 
          onLoginClick={() => setIsSignInModalOpen(true)} 
          onConnectWithParent={handleConnectWithParent}
        />
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
        isFromInvitation={isFromInvitation}
        parentName="Your Parent" // In a real app, we'd fetch the parent's name
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