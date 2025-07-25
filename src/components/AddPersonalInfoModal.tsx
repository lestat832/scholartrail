import React, { useState, useEffect } from 'react';
import { nationalities } from '../utils/countries';
import { searchCities } from '../utils/cityData';

interface AddPersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { gender?: string; nationality?: string; cityState?: string }) => void;
  onPrevious: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const AddPersonalInfoModal: React.FC<AddPersonalInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue,
  onPrevious,
  currentStep = 2,
  totalSteps = 4
}) => {
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [cityState, setCityState] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleContinue = () => {
    onContinue({ gender, nationality, cityState });
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
            <h2 className="text-3xl font-serif font-bold text-vault-blue mb-4">
              Add Personal Info
            </h2>
            <p className="text-sm text-gray-500">
              This information helps us find scholarships that match your background and location.
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
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
            </div>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index < currentStep
                      ? 'bg-privacy-teal'
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
                className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
              >
                Continue
              </button>

              {/* Previous Link */}
              <button
                type="button"
                onClick={onPrevious}
                className="w-full text-privacy-teal hover:text-opacity-80 font-medium transition-colors"
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

export default AddPersonalInfoModal;