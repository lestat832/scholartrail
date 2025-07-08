import React, { useState, useEffect } from 'react';
import { searchMajors } from '../utils/majors';

interface AddChildSchoolInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { major?: string; degree?: string; graduationYear?: string }) => void;
  onPrevious: () => void;
  currentStep?: number;
  totalSteps?: number;
  mode?: 'add' | 'edit';
  initialData?: { major?: string; degree?: string; graduationYear?: string };
  childName?: string;
}

const AddChildSchoolInfoModal: React.FC<AddChildSchoolInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue,
  onPrevious,
  currentStep = 4,
  totalSteps = 4,
  mode = 'add',
  initialData,
  childName
}) => {
  const [major, setMajor] = useState('');
  const [degree, setDegree] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [majorSuggestions, setMajorSuggestions] = useState<string[]>([]);
  const [showMajorSuggestions, setShowMajorSuggestions] = useState(false);

  // Prepopulate fields when in edit mode
  useEffect(() => {
    if (isOpen && mode === 'edit' && initialData) {
      setMajor(initialData.major || '');
      setDegree(initialData.degree || '');
      setGraduationYear(initialData.graduationYear || '');
    } else if (isOpen && mode === 'add') {
      // Reset fields for add mode
      setMajor('');
      setDegree('');
      setGraduationYear('');
    }
  }, [isOpen, mode, initialData]);

  const handleContinue = () => {
    onContinue({ major, degree, graduationYear });
  };

  const handleMajorChange = (value: string) => {
    setMajor(value);
    if (value.length >= 3) {
      const suggestions = searchMajors(value);
      setMajorSuggestions(suggestions);
      setShowMajorSuggestions(suggestions.length > 0);
    } else {
      setShowMajorSuggestions(false);
    }
  };

  const selectMajor = (selectedMajor: string) => {
    setMajor(selectedMajor);
    setShowMajorSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMajorSuggestions(false);
    };
    if (showMajorSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMajorSuggestions]);

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
              {mode === 'edit' ? `Edit ${childName}'s School Info` : 'Add School Info'}
            </h2>
            <p className="text-sm text-gray-500">
              Tell us about your child's academic profile to find scholarships that match their educational level and achievements.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
            <div className="space-y-6 mb-8">
              {/* Major */}
              <div className="relative">
                <label 
                  htmlFor="major" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Major
                </label>
                <input
                  type="text"
                  id="major"
                  value={major}
                  onChange={(e) => handleMajorChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Start typing major..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                />
                
                {/* Major autocomplete suggestions */}
                {showMajorSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {majorSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectMajor(suggestion)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Degree */}
              <div>
                <label 
                  htmlFor="degree" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Degree
                </label>
                <select
                  id="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                >
                  <option value="">Select degree</option>
                  <option value="high-school">High School Diploma</option>
                  <option value="associate">Associate's Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="doctorate">Doctorate Degree</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Graduation Year */}
              <div>
                <label 
                  htmlFor="graduationYear" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Graduation Year
                </label>
                <input
                  type="text"
                  id="graduationYear"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  placeholder="Example: 2025"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                />
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
                {mode === 'edit' ? 'Save' : 'Continue'}
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

export default AddChildSchoolInfoModal;