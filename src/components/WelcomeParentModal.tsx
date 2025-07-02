import React, { useEffect, useState } from 'react';

interface WelcomeParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChild: () => void;
  onBrowseScholarships: () => void;
}

const WelcomeParentModal: React.FC<WelcomeParentModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddChild, 
  onBrowseScholarships 
}) => {
  const [showChildTooltip, setShowChildTooltip] = useState(false);
  const [showBrowseTooltip, setShowBrowseTooltip] = useState(false);

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
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-3xl font-bold font-playfair text-vault-blue mb-4">
              Welcome!
            </h2>
            <p className="text-xl text-neutral-gray mb-8">
              Help Your Child Get Off On The Right Foot
            </p>

            {/* CTAs */}
            <div className="space-y-4">
              {/* Add Child Profile */}
              <div className="relative">
                <button
                  onClick={onAddChild}
                  className="w-full bg-trust-pink text-white font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center"
                >
                  <span>Add Child Profile</span>
                  <div 
                    className="ml-2 relative"
                    onMouseEnter={() => setShowChildTooltip(true)}
                    onMouseLeave={() => setShowChildTooltip(false)}
                  >
                    <svg className="w-5 h-5 text-white opacity-80 hover:opacity-100 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {showChildTooltip && (
                      <div className="absolute z-10 w-64 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-8 transform -translate-y-full">
                        <p>Create a profile to get personalized scholarship matches based on your child's academic interests, achievements, and background</p>
                        <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 bottom-0 left-2 translate-y-1/2"></div>
                      </div>
                    )}
                  </div>
                </button>
              </div>

              {/* Browse Non-Personalized Scholarships */}
              <div className="relative">
                <button
                  onClick={onBrowseScholarships}
                  className="w-full text-information-blue font-medium py-3 px-4 rounded-md hover:underline transition-all flex items-center justify-center"
                >
                  <span>Browse Non-Personalized Scholarships</span>
                  <div 
                    className="ml-2 relative"
                    onMouseEnter={() => setShowBrowseTooltip(true)}
                    onMouseLeave={() => setShowBrowseTooltip(false)}
                  >
                    <svg className="w-5 h-5 text-information-blue opacity-80 hover:opacity-100 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {showBrowseTooltip && (
                      <div className="absolute z-10 w-64 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-8 transform -translate-y-full">
                        <p>View general scholarship opportunities. Results won't be tailored to your child's specific profile</p>
                        <div className="absolute w-3 h-3 bg-gray-900 transform rotate-45 bottom-0 left-2 translate-y-1/2"></div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeParentModal;