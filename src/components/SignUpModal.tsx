import React, { useState, useEffect } from 'react';

type UserType = 'student' | 'parent' | 'educator' | null;

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (userType: 'student' | 'parent' | 'educator') => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onContinue }) => {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType);
      onClose();
    }
  };

  const userTypes = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Find scholarships that match your profile',
    },
    {
      id: 'parent' as const,
      title: 'Parent',
      description: 'Help your child find and track scholarships',
    },
    {
      id: 'educator' as const,
      title: 'Educator',
      description: 'Support students without the ads or clutter',
    },
  ];

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

  const renderIcon = (userType: string) => {
    if (userType === 'student') {
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="30" r="15" fill="#8B5CF6"/>
          <path d="M40 10 L25 20 L40 25 L55 20 Z" fill="#6366F1"/>
          <path d="M25 50 Q25 45 30 45 L50 45 Q55 45 55 50 L55 70 L25 70 Z" fill="#8B5CF6"/>
        </svg>
      );
    } else if (userType === 'parent') {
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="30" cy="25" r="10" fill="#8B5CF6"/>
          <circle cx="50" cy="30" r="8" fill="#8B5CF6"/>
          <path d="M20 45 Q20 40 25 40 L35 40 Q40 40 40 45 L40 70 L20 70 Z" fill="#8B5CF6"/>
          <path d="M40 50 Q40 45 45 45 L55 45 Q60 45 60 50 L60 70 L40 70 Z" fill="#8B5CF6"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="25" r="12" fill="#8B5CF6"/>
          <path d="M25 45 Q25 40 30 40 L50 40 Q55 40 55 45 L55 60 Q55 65 50 65 L30 65 Q25 65 25 60 Z" fill="#8B5CF6"/>
          <rect x="35" y="55" width="10" height="15" fill="#6366F1"/>
        </svg>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
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
          <h2 className="heading-section text-center mb-10">
            Who are you signing up as?
          </h2>

          {/* User Type Cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-2xl border-2 transition-all hover-lift ${
                  selectedType === type.id
                    ? 'border-st-purple-400 bg-st-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-3">
                  {renderIcon(type.id)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {type.title}
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  {type.description}
                </p>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`w-full btn-primary ${
              !selectedType
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;