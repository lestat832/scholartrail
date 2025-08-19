import React, { useState, useEffect } from 'react';
import { nationalities } from '../utils/countries';
import { searchCities } from '../utils/cityData';

interface AddChildPersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { gender?: string; nationality?: string; cityState?: string; hasFinancialNeed?: boolean }) => void;
  onPrevious: () => void;
  currentStep?: number;
  totalSteps?: number;
  mode?: 'add' | 'edit';
  initialData?: { gender?: string; nationality?: string; cityState?: string; hasFinancialNeed?: boolean };
  childName?: string;
}

const AddChildPersonalInfoModal: React.FC<AddChildPersonalInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue,
  onPrevious,
  currentStep = 2,
  totalSteps = 4,
  mode = 'add',
  initialData,
  childName
}) => {
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [cityState, setCityState] = useState('');
  const [hasFinancialNeed, setHasFinancialNeed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Prepopulate fields when in edit mode
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      setGender(initialData.gender || '');
      setNationality(initialData.nationality || '');
      setCityState(initialData.cityState || '');
      setHasFinancialNeed(initialData.hasFinancialNeed || false);
    } else if (isOpen && mode === 'add') {
      // Reset fields for add mode
      setGender('');
      setNationality('');
      setCityState('');
      setHasFinancialNeed(false);
    }
  }, [isOpen, mode, initialData]);

  const handleContinue = () => {
    onContinue({ gender, nationality, cityState, hasFinancialNeed });
  };

  const handleCityStateChange = (value: string) => {
    setCityState(value);
    if (value.length >= 3) {
      const suggestions = searchCities(value);
      setCitySuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    setCityState(city);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSuggestions]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.tooltip-container')) {
        setShowTooltip(false);
      }
    };
    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTooltip]);

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {mode === 'edit' ? `Edit ${childName}'s Personal Info` : 'Add Personal Info'}
            </h2>
            <p className="text-sm text-gray-500">
              This information helps us find scholarships that match your child's background, location, and financial situation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
            <div className="space-y-6 mb-8">
              {/* Gender */}
              <div>
                <label 
                  htmlFor="gender" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-st-purple-400 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label 
                  htmlFor="nationality" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nationality
                </label>
                <select
                  id="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-st-purple-400 focus:border-transparent"
                >
                  <option value="">Select nationality</option>
                  {nationalities.map((nat) => (
                    <option key={nat} value={nat}>
                      {nat}
                    </option>
                  ))}
                </select>
              </div>

              {/* City, State */}
              <div className="relative">
                <label 
                  htmlFor="cityState" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City, State
                </label>
                <input
                  type="text"
                  id="cityState"
                  value={cityState}
                  onChange={(e) => handleCityStateChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Start typing city name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-st-purple-400 focus:border-transparent"
                />
                
                {/* Autocomplete suggestions */}
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {citySuggestions.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectCity(city)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Scholarship Type Preference */}
              <div className="relative tooltip-container">
                <div className="flex items-center gap-2 mb-3">
                  <label 
                    htmlFor="hasFinancialNeed" 
                    className="text-sm font-medium text-gray-700"
                  >
                    Scholarship Type Preference
                  </label>
                  <button
                    type="button"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                    className="w-4 h-4 rounded-full border border-gray-400 text-gray-500 hover:text-gray-700 hover:border-gray-600 flex items-center justify-center text-xs font-medium transition-colors"
                  >
                    ?
                  </button>
                </div>
                
                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-20 transform -translate-y-full -translate-y-2">
                    <div className="relative">
                      Check this box if your child has financial need. When checked, you'll see both need-based and merit-based scholarships. When unchecked, you'll see only merit-based scholarships. You can change this anytime in your profile settings.
                      <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}

                <label className="flex items-start space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    id="hasFinancialNeed"
                    checked={hasFinancialNeed}
                    onChange={(e) => setHasFinancialNeed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-st-purple-400 bg-white border-gray-300 rounded focus:ring-st-purple-400 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    My child has financial need and I want to see need-based scholarships
                  </span>
                </label>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index < currentStep
                      ? 'bg-st-purple-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {/* Continue Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-st-purple-400 text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
              >
                Continue
              </button>

              {/* Previous Link */}
              <button
                type="button"
                onClick={onPrevious}
                className="w-full text-st-purple-400 hover:text-opacity-80 font-medium transition-colors"
              >
                Previous
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChildPersonalInfoModal;