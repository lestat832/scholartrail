import React, { useState, useEffect } from 'react';

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { firstName: string; birthday: string }) => void;
  currentData: { firstName: string; birthday: string };
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  currentData
}) => {
  const [firstName, setFirstName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form with current data when modal opens
  useEffect(() => {
    if (isOpen && currentData) {
      setFirstName(currentData.firstName || '');
      setBirthday(currentData.birthday || '');
      setHasChanges(false);
    }
  }, [isOpen, currentData]);

  // Check if form has changes
  useEffect(() => {
    const firstNameChanged = firstName !== (currentData.firstName || '');
    const birthdayChanged = birthday !== (currentData.birthday || '');
    setHasChanges(firstNameChanged || birthdayChanged);
  }, [firstName, birthday, currentData.firstName, currentData.birthday]);

  const isFormValid = firstName.trim() !== '' && birthday !== '';

  const handleSave = () => {
    if (isFormValid && hasChanges) {
      onSave({ firstName, birthday });
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    setFirstName(currentData.firstName || '');
    setBirthday(currentData.birthday || '');
    onClose();
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={handleCancel}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-vault-blue">
              Edit Account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="space-y-6 mb-8">
              {/* First Name */}
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
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
                  Birthday
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

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || !hasChanges}
                className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all ${
                  isFormValid && hasChanges
                    ? 'bg-privacy-teal text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccountModal;