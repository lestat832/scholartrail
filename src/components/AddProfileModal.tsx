import React, { useState, useEffect } from 'react';

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { firstName: string; birthday: string }) => void;
  currentStep?: number;
  totalSteps?: number;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue,
  currentStep = 1,
  totalSteps = 4
}) => {
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('');

  const isFormValid = firstName.trim() !== '' && birthday !== '';

  const handleContinue = () => {
    if (isFormValid) {
      onContinue({ firstName, birthday });
    }
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
          {/* Step indicator */}
          <div className="text-center text-sm text-gray-500 mb-6">
            Step {currentStep} of {totalSteps}
          </div>

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
            <h2 className="text-3xl font-serif font-bold text-vault-blue mb-2">
              Add Profile
            </h2>
            <h3 className="text-xl text-gray-700 mb-4">
              Tell Us About You
            </h3>
            <p className="text-sm text-gray-500">
              Required fields
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
            <div className="space-y-6 mb-8">
              {/* First Name */}
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name (required)
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                  required
                />
              </div>

              {/* Birthday */}
              <div>
                <label 
                  htmlFor="birthday" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Birthday (required)
                </label>
                <input
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                  required
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

            {/* Continue Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-md font-semibold transition-all ${
                isFormValid
                  ? 'bg-privacy-teal text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;