import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import AddProfileModal from '../components/AddProfileModal';
import AddPersonalInfoModal from '../components/AddPersonalInfoModal';
import AddAcademicInfoModal from '../components/AddAcademicInfoModal';
import AddSchoolInfoModal from '../components/AddSchoolInfoModal';
import CongratulationsModal from '../components/CongratulationsModal';
import PaywallModal from '../components/PaywallModal';
import SaveScholarshipModal from '../components/SaveScholarshipModal';
import RedirectModal from '../components/RedirectModal';
import DidYouApplyModal from '../components/DidYouApplyModal';
import MemberCongratulationsModal from '../components/MemberCongratulationsModal';
import EditAccountModal from '../components/EditAccountModal';
import EditProfileModal from '../components/EditProfileModal';
import EditAcademicInfoModal from '../components/EditAcademicInfoModal';
import EditSchoolInfoModal from '../components/EditSchoolInfoModal';
import SubscribePromo from '../components/SubscribePromo';
import AddChildProfileModal from '../components/AddChildProfileModal';
import AddChildPersonalInfoModal from '../components/AddChildPersonalInfoModal';

interface LocationState {
  firstName?: string;
  birthday?: string;
  showEmptyState?: boolean;
  userType?: string;
  showParentNonPersonalized?: boolean;
}

interface Scholarship {
  id: string;
  name: string;
  description: string;
  deadline: string;
  amount: string;
  matchStrength: number; // 1-5
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const showEmptyState = state?.showEmptyState || false;
  const isParentNonPersonalized = state?.showParentNonPersonalized || false;
  // const userType = state?.userType; // Keeping for future use
  
  const [filter, setFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);
  
  // Saved scholarships state
  const [savedScholarships, setSavedScholarships] = useState<Set<string>>(new Set());
  const [newSavedCount, setNewSavedCount] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  // Applied scholarships state
  const [appliedScholarships, setAppliedScholarships] = useState<Set<string>>(new Set());
  const [newAppliedCount, setNewAppliedCount] = useState(0);
  
  // Apply modals state
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [showDidYouApplyModal, setShowDidYouApplyModal] = useState(false);
  const [applyingScholarship, setApplyingScholarship] = useState<Scholarship | null>(null);
  
  // Paid member state
  const [isPaidMember, setIsPaidMember] = useState(false);
  
  // Pagination state
  const [displayedScholarships, setDisplayedScholarships] = useState<Scholarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const SCHOLARSHIPS_PER_PAGE = 25;
  
  // Modal states for sign-up flow
  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [isAddPersonalInfoModalOpen, setIsAddPersonalInfoModalOpen] = useState(false);
  const [isAddAcademicInfoModalOpen, setIsAddAcademicInfoModalOpen] = useState(false);
  const [isAddSchoolInfoModalOpen, setIsAddSchoolInfoModalOpen] = useState(false);
  const [isCongratulationsModalOpen, setIsCongratulationsModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isMemberCongratulationsModalOpen, setIsMemberCongratulationsModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isEditAcademicInfoModalOpen, setIsEditAcademicInfoModalOpen] = useState(false);
  const [isEditSchoolInfoModalOpen, setIsEditSchoolInfoModalOpen] = useState(false);
  const [isAddChildProfileModalOpen, setIsAddChildProfileModalOpen] = useState(false);
  const [isAddChildPersonalInfoModalOpen, setIsAddChildPersonalInfoModalOpen] = useState(false);
  const [childProfileData, setChildProfileData] = useState({ firstName: '', birthday: '' });
  
  // Load saved and applied scholarships from localStorage on mount
  useEffect(() => {
    // Load saved scholarships
    const saved = localStorage.getItem('savedScholarships');
    if (saved) {
      setSavedScholarships(new Set(JSON.parse(saved)));
    }
    const lastAccessedSaved = localStorage.getItem('lastAccessedSaved');
    const currentSavedCount = saved ? JSON.parse(saved).length : 0;
    const lastSavedCount = lastAccessedSaved ? parseInt(lastAccessedSaved) : 0;
    setNewSavedCount(currentSavedCount - lastSavedCount);
    
    // Load applied scholarships
    const applied = localStorage.getItem('appliedScholarships');
    if (applied) {
      setAppliedScholarships(new Set(JSON.parse(applied)));
    }
    const lastAccessedApplied = localStorage.getItem('lastAccessedApplied');
    const currentAppliedCount = applied ? JSON.parse(applied).length : 0;
    const lastAppliedCount = lastAccessedApplied ? parseInt(lastAccessedApplied) : 0;
    setNewAppliedCount(currentAppliedCount - lastAppliedCount);
    
    // Load paid member status
    const paidStatus = localStorage.getItem('isPaidMember');
    if (paidStatus === 'true') {
      setIsPaidMember(true);
    }
  }, []);
  
  // Form data states
  const [profileData, setProfileData] = useState(() => {
    // Try to load from localStorage first
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      return JSON.parse(storedProfile);
    }
    // Otherwise use state from navigation
    return {
      firstName: state?.firstName || '', 
      birthday: state?.birthday || '',
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
  });
  
  // Save scholarship handler
  const handleSaveScholarship = (scholarshipId: string) => {
    const updatedSaved = new Set(savedScholarships);
    updatedSaved.add(scholarshipId);
    setSavedScholarships(updatedSaved);
    
    // Update localStorage
    localStorage.setItem('savedScholarships', JSON.stringify(Array.from(updatedSaved)));
    
    // Update new saved count
    setNewSavedCount(prev => prev + 1);
    
    // Show congratulations modal
    setShowSaveModal(true);
  };
  
  // Handle save modal close
  const handleSaveModalClose = () => {
    setShowSaveModal(false);
  };
  
  // Apply handlers
  const handleApplyScholarship = (scholarship: Scholarship) => {
    setApplyingScholarship(scholarship);
    setShowRedirectModal(true);
  };
  
  const handleRedirectContinue = () => {
    setShowRedirectModal(false);
    // For demo purposes, show the "Did You Apply" modal
    setShowDidYouApplyModal(true);
  };
  
  const handleDidYouApplyYes = () => {
    if (applyingScholarship) {
      // Add to applied scholarships
      const updatedApplied = new Set(appliedScholarships);
      updatedApplied.add(applyingScholarship.id);
      setAppliedScholarships(updatedApplied);
      
      // Update localStorage
      localStorage.setItem('appliedScholarships', JSON.stringify(Array.from(updatedApplied)));
      
      // Update new applied count
      setNewAppliedCount(prev => prev + 1);
    }
    
    setShowDidYouApplyModal(false);
    setApplyingScholarship(null);
  };
  
  const handleDidYouApplyNo = () => {
    setShowDidYouApplyModal(false);
    setApplyingScholarship(null);
  };

  // Generate mock scholarship data
  const generateScholarships = (): Scholarship[] => {
    const scholarshipTemplates = [
      { name: 'Merit Excellence Scholarship', desc: 'Awarded to high-achieving students demonstrating exceptional academic performance and leadership.', amount: '$10,000' },
      { name: 'STEM Innovation Grant', desc: 'Supporting students pursuing degrees in Science, Technology, Engineering, or Mathematics fields.', amount: '$15,000' },
      { name: 'Community Leadership Award', desc: 'For students who have made significant contributions to their local communities through volunteer work.', amount: '$5,000' },
      { name: 'Future Leaders Scholarship', desc: 'Recognizing students who show exceptional promise in leadership and community engagement.', amount: '$8,000' },
      { name: 'Arts & Humanities Grant', desc: 'Supporting creative students pursuing degrees in arts, literature, music, or humanities.', amount: '$7,500' },
      { name: 'First Generation College Fund', desc: 'Helping first-generation college students achieve their dreams of higher education.', amount: '$12,000' },
      { name: 'Women in Technology Award', desc: 'Empowering women pursuing careers in technology and computer science fields.', amount: '$20,000' },
      { name: 'Environmental Sustainability Grant', desc: 'For students dedicated to environmental conservation and sustainable development.', amount: '$6,000' },
      { name: 'Healthcare Heroes Scholarship', desc: 'Supporting future healthcare professionals including nurses, doctors, and medical researchers.', amount: '$18,000' },
      { name: 'Entrepreneurship Initiative Fund', desc: 'Backing student entrepreneurs with innovative business ideas and social ventures.', amount: '$25,000' },
      { name: 'Athletic Achievement Award', desc: 'Recognizing student-athletes who excel both on the field and in the classroom.', amount: '$9,000' },
      { name: 'International Student Grant', desc: 'Supporting international students pursuing undergraduate or graduate degrees in the US.', amount: '$11,000' },
      { name: 'Rural Community Scholarship', desc: 'Helping students from rural communities access quality higher education opportunities.', amount: '$7,000' },
      { name: 'Diversity & Inclusion Award', desc: 'Promoting diversity in higher education through financial support for underrepresented students.', amount: '$13,000' },
      { name: 'Research Excellence Grant', desc: 'Funding undergraduate and graduate students conducting innovative research projects.', amount: '$16,000' }
    ];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    const years = ['2025', '2026'];
    
    const allScholarships: Scholarship[] = [];
    let id = 1;
    
    // Generate multiple variations of each scholarship
    for (let round = 0; round < 4; round++) {
      for (const template of scholarshipTemplates) {
        const monthIndex = Math.floor(Math.random() * months.length);
        const yearIndex = Math.floor(Math.random() * years.length);
        const day = Math.floor(Math.random() * 28) + 1;
        
        allScholarships.push({
          id: String(id++),
          name: round > 0 ? `${template.name} ${round + 1}` : template.name,
          description: template.desc,
          deadline: `${months[monthIndex]} ${day}, ${years[yearIndex]}`,
          amount: template.amount,
          matchStrength: Math.floor(Math.random() * 3) + 3 // 3-5
        });
      }
    }
    
    return allScholarships;
  };
  
  const allScholarships = generateScholarships();

  const stats = {
    numberOfMatches: isPaidMember ? allScholarships.length : 47,
    amountInMatches: isPaidMember ? '$500K+' : '$125K'
  };
  
  // Initialize displayed scholarships based on member status
  useEffect(() => {
    if (isPaidMember) {
      // For paid members, show first page of all scholarships
      setDisplayedScholarships(allScholarships.slice(0, SCHOLARSHIPS_PER_PAGE));
    } else {
      // For free members, show only first 3 scholarships
      setDisplayedScholarships(allScholarships.slice(0, 3));
    }
    setCurrentPage(1);
  }, [isPaidMember]);
  
  // Load more scholarships for infinite scroll
  const loadMoreScholarships = () => {
    if (isLoading || !isPaidMember) return;
    
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const startIndex = currentPage * SCHOLARSHIPS_PER_PAGE;
      const endIndex = startIndex + SCHOLARSHIPS_PER_PAGE;
      const nextScholarships = allScholarships.slice(startIndex, endIndex);
      
      if (nextScholarships.length > 0) {
        setDisplayedScholarships(prev => [...prev, ...nextScholarships]);
        setCurrentPage(prev => prev + 1);
      }
      
      setIsLoading(false);
    }, 500);
  };
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!isPaidMember) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          const hasMore = currentPage * SCHOLARSHIPS_PER_PAGE < allScholarships.length;
          if (hasMore) {
            loadMoreScholarships();
          }
        }
      },
      { threshold: 0.1 }
    );
    
    const lastElement = document.querySelector('#last-scholarship');
    if (lastElement) {
      observer.observe(lastElement);
    }
    
    return () => {
      if (lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [currentPage, isLoading, isPaidMember]);

  // Click outside handler for settings dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target as Node)) {
        setShowSettingsDropdown(false);
      }
    };

    if (showSettingsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  const renderMatchStrength = (strength: number) => {
    return (
      <div className="flex flex-col items-center justify-center w-32 h-32">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-3 ${
                level <= 2 ? 'h-8' : level <= 4 ? 'h-12' : 'h-16'
              } ${
                level <= strength ? 'bg-privacy-teal' : 'bg-gray-200'
              } rounded-t`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Modal handlers
  const handleStartAnsweringQuestions = () => {
    setIsAddProfileModalOpen(true);
  };

  const handleProfileContinue = (data: { firstName: string; birthday: string }) => {
    setProfileData(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    setIsAddProfileModalOpen(false);
    setIsAddPersonalInfoModalOpen(true);
  };

  const handlePersonalInfoContinue = (_data: { gender?: string; nationality?: string; cityState?: string }) => {
    setIsAddPersonalInfoModalOpen(false);
    setIsAddAcademicInfoModalOpen(true);
  };

  const handleAcademicInfoContinue = (_data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => {
    setIsAddAcademicInfoModalOpen(false);
    setIsAddSchoolInfoModalOpen(true);
  };

  const handleSchoolInfoContinue = (data: { major?: string; degree?: string; graduationYear?: string }) => {
    console.log('School info data:', data);
    setIsAddSchoolInfoModalOpen(false);
    setIsCongratulationsModalOpen(true);
  };

  const handleCongratulationsContinue = () => {
    setIsCongratulationsModalOpen(false);
    // Reload the page with the user's data
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  // Modal close handlers
  const handleAddProfileClose = () => {
    setIsAddProfileModalOpen(false);
  };

  const handleAddPersonalInfoClose = () => {
    setIsAddPersonalInfoModalOpen(false);
    // Since they've completed profile, show non-empty dashboard
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  const handleAddAcademicInfoClose = () => {
    setIsAddAcademicInfoModalOpen(false);
    // Since they've completed profile, show non-empty dashboard
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  const handleAddSchoolInfoClose = () => {
    setIsAddSchoolInfoModalOpen(false);
    // Since they've completed profile, show non-empty dashboard
    navigate('/dashboard', { state: { firstName: profileData.firstName } });
  };

  // Previous handlers
  const handlePersonalInfoPrevious = () => {
    setIsAddPersonalInfoModalOpen(false);
    setIsAddProfileModalOpen(true);
  };

  const handleAcademicInfoPrevious = () => {
    setIsAddAcademicInfoModalOpen(false);
    setIsAddPersonalInfoModalOpen(true);
  };

  const handleSchoolInfoPrevious = () => {
    setIsAddSchoolInfoModalOpen(false);
    setIsAddAcademicInfoModalOpen(true);
  };

  // Paywall handlers
  const handleBecomeMember = () => {
    setIsPaywallModalOpen(true);
  };

  const handlePaywallClose = () => {
    setIsPaywallModalOpen(false);
  };

  const handlePaywallPurchase = () => {
    // In a real app, this would process the payment
    console.log('Processing membership purchase...');
    
    // Set paid member status
    setIsPaidMember(true);
    localStorage.setItem('isPaidMember', 'true');
    
    setIsPaywallModalOpen(false);
    
    // Show member congratulations modal
    setIsMemberCongratulationsModalOpen(true);
  };
  
  // Edit Account handlers
  const handleEditAccountSave = (data: { firstName: string; birthday: string }) => {
    setProfileData((prevData: any) => ({ ...prevData, ...data }));
    localStorage.setItem('userProfile', JSON.stringify({ ...profileData, ...data }));
    setIsEditAccountModalOpen(false);
  };
  
  // Edit Profile handlers
  const handleEditProfileSave = (data: { gender?: string; nationality?: string; cityState?: string }) => {
    setProfileData((prevData: any) => ({ ...prevData, ...data }));
    localStorage.setItem('userProfile', JSON.stringify({ ...profileData, ...data }));
    setIsEditProfileModalOpen(false);
    setIsEditAcademicInfoModalOpen(true);
  };
  
  const handleEditAcademicInfoSave = (data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => {
    setProfileData((prevData: any) => ({ ...prevData, ...data }));
    localStorage.setItem('userProfile', JSON.stringify({ ...profileData, ...data }));
    setIsEditAcademicInfoModalOpen(false);
    setIsEditSchoolInfoModalOpen(true);
  };
  
  const handleEditSchoolInfoSave = (data: { major?: string; degree?: string; graduationYear?: string }) => {
    setProfileData((prevData: any) => ({ ...prevData, ...data }));
    localStorage.setItem('userProfile', JSON.stringify({ ...profileData, ...data }));
    setIsEditSchoolInfoModalOpen(false);
  };

  // Add Child Profile handlers
  const handleAddChildProfileClose = () => {
    setIsAddChildProfileModalOpen(false);
  };

  const handleAddChildProfileContinue = (data: { firstName: string; birthday: string }) => {
    setChildProfileData(data);
    setIsAddChildProfileModalOpen(false);
    setIsAddChildPersonalInfoModalOpen(true);
  };

  // Add Child Personal Info handlers
  const handleAddChildPersonalInfoClose = () => {
    setIsAddChildPersonalInfoModalOpen(false);
  };

  const handleAddChildPersonalInfoContinue = (_data: { gender?: string; nationality?: string; cityState?: string }) => {
    setIsAddChildPersonalInfoModalOpen(false);
    // TODO: Continue with child academic info, etc.
    // For now, just close the modal
  };

  const handleAddChildPersonalInfoPrevious = () => {
    setIsAddChildPersonalInfoModalOpen(false);
    setIsAddChildProfileModalOpen(true);
  };

  // Settings handlers
  const handleSettingsClick = (action: string) => {
    setShowSettingsDropdown(false);
    switch (action) {
      case 'edit-profile':
        setIsEditProfileModalOpen(true);
        break;
      case 'edit-account':
        setIsEditAccountModalOpen(true);
        break;
      case 'faqs':
        console.log('Navigate to FAQs');
        break;
      case 'logout':
        // Clear all scholarship-related data from localStorage
        localStorage.removeItem('savedScholarships');
        localStorage.removeItem('appliedScholarships');
        localStorage.removeItem('lastAccessedSaved');
        localStorage.removeItem('lastAccessedApplied');
        localStorage.removeItem('isPaidMember');
        localStorage.removeItem('userProfile');
        
        // Reset session by navigating to landing page
        navigate('/preview');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-protected-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/preview">
                <Logo variant="horizontal" size={100} className="hover:opacity-90 transition-opacity" />
              </Link>
              <nav className="flex space-x-8">
                <Link to="/dashboard" className="text-gray-900 font-medium">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {/* Settings Dropdown */}
              <div className="relative" ref={settingsDropdownRef}>
                <button
                  onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                  className="w-10 h-10 bg-gray-400 rounded-full hover:bg-gray-500 transition-colors flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {showSettingsDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <button
                        onClick={() => handleSettingsClick('edit-profile')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={() => handleSettingsClick('edit-account')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Account
                      </button>
                      <button
                        onClick={() => handleSettingsClick('faqs')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        FAQs
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={() => handleSettingsClick('logout')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isParentNonPersonalized ? (
          /* Parent Browse Non-Personalized Scholarships State */
          <>
            {/* Parent Overview Section */}
            <div className="flex items-center mb-12">
              <div className="flex-1 max-w-md">
                <h1 className="text-3xl font-serif font-bold text-vault-blue mb-2">
                  Welcome Parent!
                </h1>
                <p className="text-gray-600">
                  Here's a brief overview of your non-personalized matches.
                </p>
              </div>

              {/* Stats - Centered */}
              <div className="flex-1 flex justify-center space-x-8">
                <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
                  <div className="text-3xl font-bold text-vault-blue">{allScholarships.length > 3 ? 3 : allScholarships.length}</div>
                  <div className="text-sm text-gray-600 text-center mt-2">Number<br />of<br />Matches</div>
                </div>
                <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
                  <div className="text-3xl font-bold text-vault-blue">$150K</div>
                  <div className="text-sm text-gray-600 text-center mt-2">Amount<br />in<br />Matches</div>
                </div>
              </div>

              {/* Spacer for filter alignment */}
              <div className="w-48"></div>
            </div>

            {/* Parent Feed Section */}
            <div className="relative">
              {/* Filter Dropdown */}
              <div className="absolute right-0 -top-12">
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="capitalize">{filter === 'all' ? 'All' : filter}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showFilterDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => { setFilter('all'); setShowFilterDropdown(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          All
                        </button>
                        <button
                          onClick={() => { 
                            setFilter('saved'); 
                            setShowFilterDropdown(false);
                            localStorage.setItem('lastAccessedSaved', savedScholarships.size.toString());
                            setNewSavedCount(0);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                        >
                          <span>Saved</span>
                          {newSavedCount > 0 && (
                            <span className="bg-trust-pink text-white text-xs px-2 py-0.5 rounded-full">
                              {newSavedCount}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => { 
                            setFilter('applied'); 
                            setShowFilterDropdown(false);
                            localStorage.setItem('lastAccessedApplied', appliedScholarships.size.toString());
                            setNewAppliedCount(0);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                        >
                          <span>Applied</span>
                          {newAppliedCount > 0 && (
                            <span className="bg-trust-pink text-white text-xs px-2 py-0.5 rounded-full">
                              {newAppliedCount}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Parent Scholarship Snippets (Limited to 3) */}
              <div className="space-y-4">
                {displayedScholarships
                  .filter(scholarship => {
                    if (filter === 'saved') return savedScholarships.has(scholarship.id);
                    if (filter === 'applied') return appliedScholarships.has(scholarship.id);
                    return true;
                  })
                  .slice(0, 3).map((scholarship) => (
                  <div key={scholarship.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start space-x-6">
                      {/* Match Strength */}
                      <div className="flex-shrink-0">
                        {renderMatchStrength(scholarship.matchStrength)}
                      </div>
                      
                      {/* Scholarship Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex-grow">
                            <h3 
                              className="text-xl font-semibold text-vault-blue mb-2 cursor-pointer hover:text-info-blue transition-colors"
                              onClick={() => {
                                const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                                navigate(`/scholarship/${slug}`);
                              }}
                            >
                              {scholarship.name}
                            </h3>
                            <p 
                              className="text-gray-600 mb-4 cursor-pointer hover:text-gray-800 transition-colors"
                              onClick={() => {
                                const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                                navigate(`/scholarship/${slug}`);
                              }}
                            >
                              {scholarship.description.length > 100 
                                ? scholarship.description.substring(0, 100) + '...'
                                : scholarship.description
                              }
                            </p>
                            <div className="flex space-x-6 text-sm text-gray-500">
                              <span>Deadline: {scholarship.deadline}</span>
                            </div>
                          </div>
                          
                          {/* Amount */}
                          <div className="text-2xl font-bold text-privacy-teal ml-6">
                            {scholarship.amount}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-6 mt-4">
                          <button
                            onClick={() => {
                              const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                              navigate(`/scholarship/${slug}`);
                            }}
                            className="text-info-blue hover:underline"
                          >
                            View More
                          </button>
                          {appliedScholarships.has(scholarship.id) ? (
                            <button
                              disabled
                              className="text-verified-green"
                            >
                              Applied ✓
                            </button>
                          ) : savedScholarships.has(scholarship.id) ? (
                            <button
                              disabled
                              className="text-verified-green"
                            >
                              Saved ✓
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSaveScholarship(scholarship.id)}
                              className="text-info-blue hover:underline"
                            >
                              Save
                            </button>
                          )}
                          {appliedScholarships.has(scholarship.id) ? (
                            <button
                              disabled
                              className="bg-gray-400 text-white px-6 py-2 rounded-md"
                            >
                              Applied
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApplyScholarship(scholarship)}
                              className="bg-trust-pink text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
                            >
                              Apply
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subscribe Promo after 3rd snippet */}
                <SubscribePromo onFinishChildProfile={() => {
                  setIsAddChildProfileModalOpen(true);
                }} />
              </div>
            </div>
          </>
        ) : showEmptyState ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-8">
              <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Oops! We can't show you your personalized matches until you answer some questions.
            </p>
            <button
              onClick={handleStartAnsweringQuestions}
              className="px-8 py-3 bg-info-blue text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Answering Questions
            </button>
          </div>
        ) : (
          <>
            {/* Overview Section */}
            <div className="flex items-center mb-12">
              <div className="flex-1 max-w-md">
                <h1 className="text-3xl font-serif font-bold text-vault-blue mb-2">
                  Hi {profileData.firstName || 'Student'}! 🎓
                </h1>
                <p className="text-gray-600">
                  Here's a brief overview of your personalized matches.
                </p>
              </div>

              {/* Stats - Centered */}
              <div className="flex-1 flex justify-center space-x-8">
                <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
                  <div className="text-3xl font-bold text-vault-blue">{stats.numberOfMatches}</div>
                  <div className="text-sm text-gray-600 text-center mt-2">Number<br />of<br />Matches</div>
                </div>
                <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
                  <div className="text-3xl font-bold text-vault-blue">{stats.amountInMatches}</div>
                  <div className="text-sm text-gray-600 text-center mt-2">Amount<br />in<br />Matches</div>
                </div>
              </div>

              {/* Spacer for filter alignment */}
              <div className="w-48"></div>
            </div>

        {/* Feed Section */}
        <div className="relative">
          {/* Filter Dropdown */}
          <div className="absolute right-0 -top-12">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="capitalize">{filter === 'all' ? 'All' : filter}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => { setFilter('all'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      All
                    </button>
                    <button
                      onClick={() => { 
                        setFilter('saved'); 
                        setShowFilterDropdown(false);
                        // Reset new saved count when accessing saved filter
                        localStorage.setItem('lastAccessedSaved', savedScholarships.size.toString());
                        setNewSavedCount(0);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                    >
                      <span>Saved</span>
                      {newSavedCount > 0 && (
                        <span className="bg-trust-pink text-white text-xs px-2 py-0.5 rounded-full">
                          {newSavedCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => { 
                        setFilter('applied'); 
                        setShowFilterDropdown(false);
                        // Reset new applied count when accessing applied filter
                        localStorage.setItem('lastAccessedApplied', appliedScholarships.size.toString());
                        setNewAppliedCount(0);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                    >
                      <span>Applied</span>
                      {newAppliedCount > 0 && (
                        <span className="bg-trust-pink text-white text-xs px-2 py-0.5 rounded-full">
                          {newAppliedCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => { setFilter('archived'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Archived
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scholarship List */}
          <div className="space-y-4">
            {displayedScholarships
              .filter(scholarship => {
                if (filter === 'saved') return savedScholarships.has(scholarship.id);
                if (filter === 'applied') return appliedScholarships.has(scholarship.id);
                return true; // For now, show all for other filters
              })
              .map((scholarship, index) => (
              <div 
                key={scholarship.id} 
                id={index === displayedScholarships.filter(s => {
                  if (filter === 'saved') return savedScholarships.has(s.id);
                  if (filter === 'applied') return appliedScholarships.has(s.id);
                  return true;
                }).length - 1 ? 'last-scholarship' : undefined}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start space-x-6">
                  {/* Match Strength */}
                  <div className="flex-shrink-0">
                    {renderMatchStrength(scholarship.matchStrength)}
                  </div>
                  
                  {/* Scholarship Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 
                          className="text-xl font-semibold text-vault-blue mb-2 cursor-pointer hover:text-info-blue transition-colors"
                          onClick={() => {
                            const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                            navigate(`/scholarship/${slug}`);
                          }}
                        >
                          {scholarship.name}
                        </h3>
                        <p 
                          className="text-gray-600 mb-4 cursor-pointer hover:text-gray-800 transition-colors"
                          onClick={() => {
                            const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                            navigate(`/scholarship/${slug}`);
                          }}
                        >
                          {scholarship.description.length > 100 
                            ? scholarship.description.substring(0, 100) + '...'
                            : scholarship.description
                          }
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-500">
                          <span>Deadline: {scholarship.deadline}</span>
                        </div>
                      </div>
                      
                      {/* Amount */}
                      <div className="text-2xl font-bold text-privacy-teal ml-6">
                        {scholarship.amount}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-6 mt-4">
                      <button 
                        onClick={() => {
                          const slug = scholarship.name.toLowerCase().replace(/\s+/g, '-');
                          navigate(`/scholarship/${slug}`);
                        }}
                        className="text-info-blue hover:underline"
                      >
                        View More
                      </button>
                      
                      {/* Save Status/Button */}
                      <div className="min-w-[60px] text-center">
                        {savedScholarships.has(scholarship.id) ? (
                          <span className={`text-verified-green ${filter === 'saved' ? 'opacity-60' : ''}`}>
                            Saved ✓
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleSaveScholarship(scholarship.id)}
                            className="text-info-blue hover:underline"
                          >
                            Save
                          </button>
                        )}
                      </div>
                      
                      {/* Apply Status/Button */}
                      <div className="min-w-[82px] text-center">
                        {appliedScholarships.has(scholarship.id) ? (
                          <span className={`text-verified-green ${filter === 'applied' ? 'opacity-60' : ''}`}>
                            Applied ✓
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleApplyScholarship(scholarship)}
                            className="px-6 py-2 bg-trust-pink text-white rounded-md hover:bg-opacity-90"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Subscription Promo - Only show for non-paid members */}
            {!isPaidMember && (
              <div className="bg-trust-pink bg-opacity-10 border-2 border-trust-pink rounded-lg p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-vault-blue mb-4">
                  Unlock Your Full Potential! 🚀
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  You have {allScholarships.length - 3} more scholarships waiting for you! Subscribe to ScholarTrail 
                  to access all your matches and maximize your funding opportunities.
                </p>
                <button 
                  onClick={handleBecomeMember}
                  className="px-8 py-3 bg-trust-pink text-white rounded-md font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all"
                >
                  Become a Member
                </button>
              </div>
            )}
            
            {/* Loading indicator for infinite scroll */}
            {isPaidMember && isLoading && (
              <div className="text-center py-4">
                <span className="text-gray-600">Loading more scholarships...</span>
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </main>

      {/* Sign-up Modals */}
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

      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={handlePaywallClose}
        onPurchase={handlePaywallPurchase}
      />
      
      <SaveScholarshipModal
        isOpen={showSaveModal}
        onClose={handleSaveModalClose}
      />
      
      <RedirectModal
        isOpen={showRedirectModal}
        onClose={() => setShowRedirectModal(false)}
        onContinue={handleRedirectContinue}
      />
      
      <DidYouApplyModal
        isOpen={showDidYouApplyModal}
        onYes={handleDidYouApplyYes}
        onNo={handleDidYouApplyNo}
        scholarshipName={applyingScholarship?.name || ''}
      />
      
      <MemberCongratulationsModal
        isOpen={isMemberCongratulationsModalOpen}
        onClose={() => setIsMemberCongratulationsModalOpen(false)}
      />
      
      <EditAccountModal
        isOpen={isEditAccountModalOpen}
        onClose={() => setIsEditAccountModalOpen(false)}
        onSave={handleEditAccountSave}
        currentData={profileData}
      />
      
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onSave={handleEditProfileSave}
        currentData={profileData}
      />
      
      <EditAcademicInfoModal
        isOpen={isEditAcademicInfoModalOpen}
        onClose={() => setIsEditAcademicInfoModalOpen(false)}
        onSave={handleEditAcademicInfoSave}
        currentData={profileData}
      />
      
      <EditSchoolInfoModal
        isOpen={isEditSchoolInfoModalOpen}
        onClose={() => setIsEditSchoolInfoModalOpen(false)}
        onSave={handleEditSchoolInfoSave}
        currentData={profileData}
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
    </div>
  );
};

export default Dashboard;