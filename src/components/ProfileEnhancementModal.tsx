import React, { useState, useEffect } from 'react';

interface ProfileEnhancementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileEnhancementData) => void;
  initialData?: ProfileEnhancementData;
}

export interface ActivityItem {
  name: string;
  yearsParticipated?: number;
  isLeader?: boolean;
  description?: string;
}

export interface ProfileEnhancementData {
  activities: {
    academic: ActivityItem[];
    athletics: ActivityItem[];
    arts: ActivityItem[];
    leadership: ActivityItem[];
    community: ActivityItem[];
    stem: ActivityItem[];
  };
  interests: {
    career: string[];
    hobbies: string[];
    collegePreferences: string[];
  };
  languages: {
    language: string;
    proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
  }[];
  specialInfo: {
    firstGen: boolean;
    military: boolean;
    circumstances: string[];
    workExperience: string[];
  };
}

const ProfileEnhancementModal: React.FC<ProfileEnhancementModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  initialData 
}) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'interests' | 'languages' | 'special'>('activities');
  const [data, setData] = useState<ProfileEnhancementData>(initialData || {
    activities: {
      academic: [],
      athletics: [],
      arts: [],
      leadership: [],
      community: [],
      stem: []
    },
    interests: {
      career: [],
      hobbies: [],
      collegePreferences: []
    },
    languages: [],
    specialInfo: {
      firstGen: false,
      military: false,
      circumstances: [],
      workExperience: []
    }
  });

  // Global search state
  const [globalSearch, setGlobalSearch] = useState('');

  // Activity options
  const activityOptions = {
    academic: [
      'Honor Roll',
      'AP Scholar',
      'National Honor Society',
      'Academic Decathlon',
      'Quiz Bowl',
      'Science Olympiad',
      'Math Team',
      'Debate Team',
      'Model UN',
      'Mock Trial'
    ],
    athletics: [
      'Baseball',
      'Basketball',
      'Cross Country',
      'Football',
      'Golf',
      'Gymnastics',
      'Hockey',
      'Lacrosse',
      'Soccer',
      'Swimming',
      'Tennis',
      'Track & Field',
      'Volleyball',
      'Wrestling'
    ],
    arts: [
      'Band',
      'Choir',
      'Orchestra',
      'Theater',
      'Drama Club',
      'Dance',
      'Visual Arts',
      'Photography',
      'Film/Video',
      'Creative Writing',
      'Yearbook',
      'School Newspaper'
    ],
    leadership: [
      'Student Government',
      'Class President/Officer',
      'Club President/Officer',
      'Team Captain',
      'Peer Tutor',
      'Mentor',
      'Youth Group Leader',
      'Camp Counselor'
    ],
    community: [
      'Volunteer at Hospital',
      'Food Bank',
      'Animal Shelter',
      'Tutoring',
      'Environmental Cleanup',
      'Elderly Care',
      'Habitat for Humanity',
      'Red Cross',
      'Library Volunteer',
      'Church/Religious Activities'
    ],
    stem: [
      'Robotics Club',
      'Coding Club',
      'Science Fair',
      'Engineering Club',
      'Computer Science Club',
      'Astronomy Club',
      'Environmental Club',
      'Medical Club',
      'Research Project',
      'Tech Internship'
    ]
  };

  const careerInterests = [
    'Medicine/Healthcare',
    'Engineering',
    'Business',
    'Education',
    'Law',
    'Technology',
    'Arts/Entertainment',
    'Science/Research',
    'Public Service',
    'Entrepreneurship',
    'Finance',
    'Architecture',
    'Environmental Science',
    'Psychology',
    'Communications'
  ];

  const hobbyOptions = [
    'Reading',
    'Writing',
    'Gaming',
    'Cooking',
    'Hiking',
    'Photography',
    'Music',
    'Sports',
    'Art/Drawing',
    'Traveling',
    'Collecting',
    'Gardening',
    'DIY/Crafts',
    'Podcasting',
    'Blogging'
  ];

  const languageOptions = [
    'Spanish',
    'French',
    'Mandarin',
    'German',
    'Italian',
    'Portuguese',
    'Japanese',
    'Korean',
    'Arabic',
    'Hindi',
    'Russian',
    'Other'
  ];

  const specialInfoOptions = [
    'Single Parent Household',
    'Foster Care Experience',
    'Learning Disability',
    'Physical Disability',
    'Chronic Illness',
    'LGBTQ+',
    'Rural Area',
    'Low Income',
    'Immigrant/Refugee',
    'English as Second Language'
  ];

  // Filter functions
  const filterOptions = (options: string[], searchTerm: string) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleActivityToggle = (category: keyof typeof activityOptions, activity: string) => {
    const currentActivities = data.activities[category];
    const exists = currentActivities.find(a => a.name === activity);
    
    if (exists) {
      setData({
        ...data,
        activities: {
          ...data.activities,
          [category]: currentActivities.filter(a => a.name !== activity)
        }
      });
    } else {
      setData({
        ...data,
        activities: {
          ...data.activities,
          [category]: [...currentActivities, { name: activity }]
        }
      });
    }
    
    // Clear global search field after selection
    setGlobalSearch('');
  };

  const handleInterestToggle = (type: 'career' | 'hobbies', interest: string) => {
    const current = data.interests[type];
    if (current.includes(interest)) {
      setData({
        ...data,
        interests: {
          ...data.interests,
          [type]: current.filter(i => i !== interest)
        }
      });
    } else {
      setData({
        ...data,
        interests: {
          ...data.interests,
          [type]: [...current, interest]
        }
      });
    }
    
    // Clear global search field after selection
    setGlobalSearch('');
  };

  const handleSpecialInfoToggle = (circumstance: string) => {
    const isSelected = data.specialInfo.circumstances.includes(circumstance);
    if (isSelected) {
      setData({
        ...data,
        specialInfo: {
          ...data.specialInfo,
          circumstances: data.specialInfo.circumstances.filter(c => c !== circumstance)
        }
      });
    } else {
      setData({
        ...data,
        specialInfo: {
          ...data.specialInfo,
          circumstances: [...data.specialInfo.circumstances, circumstance]
        }
      });
    }
    
    // Clear global search field after selection
    setGlobalSearch('');
  };

  // Global search results
  const getGlobalSearchResults = () => {
    if (!globalSearch) return null;

    const results = {
      activities: {} as { [key: string]: string[] },
      interests: {
        career: filterOptions(careerInterests, globalSearch),
        hobbies: filterOptions(hobbyOptions, globalSearch)
      },
      languages: filterOptions(languageOptions, globalSearch),
      specialInfo: filterOptions(specialInfoOptions, globalSearch)
    };

    // Filter activities by category
    Object.entries(activityOptions).forEach(([category, activities]) => {
      const filtered = filterOptions(activities, globalSearch);
      if (filtered.length > 0) {
        results.activities[category] = filtered;
      }
    });

    return results;
  };

  const handleLanguageAdd = () => {
    setData({
      ...data,
      languages: [...data.languages, { language: '', proficiency: 'basic' }]
    });
  };

  const handleLanguageUpdate = (index: number, field: 'language' | 'proficiency', value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value
    };
    setData({
      ...data,
      languages: newLanguages
    });
  };

  const handleLanguageRemove = (index: number) => {
    setData({
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    });
  };

  const handleSave = () => {
    onSave(data);
    onClose();
  };

  const getActivityCount = () => {
    return Object.values(data.activities).reduce((total, activities) => total + activities.length, 0);
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-vault-blue">
                  Enhance Your Profile
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Add more details to unlock additional scholarship matches
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Global Search */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search all parameters..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal text-base"
              />
              <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'activities'
                  ? 'text-privacy-teal border-b-2 border-privacy-teal'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Activities ({getActivityCount()})
            </button>
            <button
              onClick={() => setActiveTab('interests')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'interests'
                  ? 'text-privacy-teal border-b-2 border-privacy-teal'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Interests ({data.interests.career.length + data.interests.hobbies.length})
            </button>
            <button
              onClick={() => setActiveTab('languages')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'languages'
                  ? 'text-privacy-teal border-b-2 border-privacy-teal'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Languages ({data.languages.length})
            </button>
            <button
              onClick={() => setActiveTab('special')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'special'
                  ? 'text-privacy-teal border-b-2 border-privacy-teal'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Special Info
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
            {/* Global Search Results */}
            {globalSearch && (() => {
              const searchResults = getGlobalSearchResults();
              const hasResults = searchResults && (
                Object.keys(searchResults.activities).length > 0 ||
                searchResults.interests.career.length > 0 ||
                searchResults.interests.hobbies.length > 0 ||
                searchResults.languages.length > 0 ||
                searchResults.specialInfo.length > 0
              );

              if (!hasResults) {
                return (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No results found for "{globalSearch}"</p>
                    <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
                  </div>
                );
              }

              return (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Search results for "{globalSearch}"
                  </h2>

                  {/* Activities Results */}
                  {Object.keys(searchResults.activities).length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-privacy-teal rounded-full mr-2"></span>
                        Activities
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(searchResults.activities).map(([category, activities]) => (
                          <div key={category}>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {category === 'academic' && '🎓 Academic Activities'}
                              {category === 'athletics' && '🏃 Athletics & Sports'}
                              {category === 'arts' && '🎨 Arts & Performance'}
                              {category === 'leadership' && '🌟 Leadership Roles'}
                              {category === 'community' && '🤝 Community Service'}
                              {category === 'stem' && '🔬 STEM Activities'}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {activities.map((activity) => {
                                const isSelected = data.activities[category as keyof typeof activityOptions].some(a => a.name === activity);
                                return (
                                  <button
                                    key={activity}
                                    onClick={() => handleActivityToggle(category as keyof typeof activityOptions, activity)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                      isSelected 
                                        ? 'bg-privacy-teal text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    {activity}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests Results */}
                  {(searchResults.interests.career.length > 0 || searchResults.interests.hobbies.length > 0) && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-privacy-teal rounded-full mr-2"></span>
                        Interests
                      </h3>
                      <div className="space-y-4">
                        {searchResults.interests.career.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Career Interests</h4>
                            <div className="flex flex-wrap gap-2">
                              {searchResults.interests.career.map((interest) => {
                                const isSelected = data.interests.career.includes(interest);
                                return (
                                  <button
                                    key={interest}
                                    onClick={() => handleInterestToggle('career', interest)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                      isSelected 
                                        ? 'bg-privacy-teal text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    {interest}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {searchResults.interests.hobbies.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Hobbies</h4>
                            <div className="flex flex-wrap gap-2">
                              {searchResults.interests.hobbies.map((hobby) => {
                                const isSelected = data.interests.hobbies.includes(hobby);
                                return (
                                  <button
                                    key={hobby}
                                    onClick={() => handleInterestToggle('hobbies', hobby)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                      isSelected 
                                        ? 'bg-privacy-teal text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                  >
                                    {hobby}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Languages Results */}
                  {searchResults.languages.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-privacy-teal rounded-full mr-2"></span>
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.languages.map((language) => {
                          const isAdded = data.languages.some(l => l.language === language);
                          return (
                            <button
                              key={language}
                              onClick={() => {
                                if (!isAdded) {
                                  setData({
                                    ...data,
                                    languages: [...data.languages, { language, proficiency: 'basic' }]
                                  });
                                }
                                setGlobalSearch('');
                              }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isAdded 
                                  ? 'bg-privacy-teal text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {language} {isAdded && '✓'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Special Info Results */}
                  {searchResults.specialInfo.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-privacy-teal rounded-full mr-2"></span>
                        Special Information
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.specialInfo.map((circumstance) => {
                          const isSelected = data.specialInfo.circumstances.includes(circumstance);
                          return (
                            <button
                              key={circumstance}
                              onClick={() => handleSpecialInfoToggle(circumstance)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isSelected 
                                  ? 'bg-privacy-teal text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {circumstance}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Activities Tab */}
            {!globalSearch && activeTab === 'activities' && (
              <div className="space-y-6">
                {Object.entries(activityOptions).map(([category, activities]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      {category === 'academic' && '🎓 Academic Activities'}
                      {category === 'athletics' && '🏃 Athletics & Sports'}
                      {category === 'arts' && '🎨 Arts & Performance'}
                      {category === 'leadership' && '🌟 Leadership Roles'}
                      {category === 'community' && '🤝 Community Service'}
                      {category === 'stem' && '🔬 STEM Activities'}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {activities.map((activity) => {
                        const isSelected = data.activities[category as keyof typeof activityOptions].some(a => a.name === activity);
                        return (
                          <button
                            key={activity}
                            onClick={() => handleActivityToggle(category as keyof typeof activityOptions, activity)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              isSelected 
                                ? 'bg-privacy-teal text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {activity}
                          </button>
                        );
                      })}
                    </div>

                    {/* Clear Selection */}
                    {data.activities[category as keyof typeof activityOptions].length > 0 && (
                      <button
                        onClick={() => setData({
                          ...data,
                          activities: {
                            ...data.activities,
                            [category]: []
                          }
                        })}
                        className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Interests Tab */}
            {!globalSearch && activeTab === 'interests' && (
              <div className="space-y-6">
                {/* Career Interests */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Career Interests</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {careerInterests.map((interest) => {
                      const isSelected = data.interests.career.includes(interest);
                      return (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle('career', interest)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            isSelected 
                              ? 'bg-privacy-teal text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>

                  {/* Clear Selection */}
                  {data.interests.career.length > 0 && (
                    <button
                      onClick={() => setData({
                        ...data,
                        interests: { ...data.interests, career: [] }
                      })}
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Hobbies & Interests */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Hobbies & Interests</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {hobbyOptions.map((hobby) => {
                      const isSelected = data.interests.hobbies.includes(hobby);
                      return (
                        <button
                          key={hobby}
                          onClick={() => handleInterestToggle('hobbies', hobby)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            isSelected 
                              ? 'bg-privacy-teal text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {hobby}
                        </button>
                      );
                    })}
                  </div>

                  {/* Clear Selection */}
                  {data.interests.hobbies.length > 0 && (
                    <button
                      onClick={() => setData({
                        ...data,
                        interests: { ...data.interests, hobbies: [] }
                      })}
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Languages Tab */}
            {!globalSearch && activeTab === 'languages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Languages You Speak</h3>
                  <button
                    onClick={handleLanguageAdd}
                    className="px-3 py-1 text-sm bg-privacy-teal text-white rounded-md hover:bg-opacity-90 transition-all"
                  >
                    Add Language
                  </button>
                </div>

                {data.languages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No languages added yet. Click "Add Language" to get started.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.languages.map((lang, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                        <select
                          value={lang.language}
                          onChange={(e) => handleLanguageUpdate(index, 'language', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                        >
                          <option value="">Select Language</option>
                          {languageOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        
                        <select
                          value={lang.proficiency}
                          onChange={(e) => handleLanguageUpdate(index, 'proficiency', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                        >
                          <option value="native">Native</option>
                          <option value="fluent">Fluent</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="basic">Basic</option>
                        </select>
                        
                        <button
                          onClick={() => handleLanguageRemove(index)}
                          className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Special Info Tab */}
            {!globalSearch && activeTab === 'special' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Special Circumstances</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.specialInfo.firstGen}
                        onChange={(e) => setData({
                          ...data,
                          specialInfo: { ...data.specialInfo, firstGen: e.target.checked }
                        })}
                        className="h-4 w-4 text-privacy-teal focus:ring-privacy-teal border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-gray-700 font-medium">First-Generation College Student</span>
                        <p className="text-sm text-gray-500">Neither parent has completed a 4-year college degree</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.specialInfo.military}
                        onChange={(e) => setData({
                          ...data,
                          specialInfo: { ...data.specialInfo, military: e.target.checked }
                        })}
                        className="h-4 w-4 text-privacy-teal focus:ring-privacy-teal border-gray-300 rounded"
                      />
                      <div>
                        <span className="text-gray-700 font-medium">Military Family</span>
                        <p className="text-sm text-gray-500">Active duty, veteran, or military dependent</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Additional Information</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Select any that apply to help us find more relevant scholarships:
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {specialInfoOptions.map((circumstance) => {
                      const isSelected = data.specialInfo.circumstances.includes(circumstance);
                      return (
                        <button
                          key={circumstance}
                          onClick={() => handleSpecialInfoToggle(circumstance)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            isSelected 
                              ? 'bg-privacy-teal text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {circumstance}
                        </button>
                      );
                    })}
                  </div>

                  {/* Clear Selection */}
                  {data.specialInfo.circumstances.length > 0 && (
                    <button
                      onClick={() => setData({
                        ...data,
                        specialInfo: { ...data.specialInfo, circumstances: [] }
                      })}
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-privacy-teal">
                  {getActivityCount() + data.interests.career.length + data.interests.hobbies.length + data.languages.length}
                </span> items added
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEnhancementModal;