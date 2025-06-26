import React, { useState, useEffect } from 'react';

interface NeedFinancialAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { notes: string }) => void;
}

const NeedFinancialAssistanceModal: React.FC<NeedFinancialAssistanceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [notes, setNotes] = useState('');

  // Check if required field is filled
  const isFormValid = notes.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ notes });
      // Reset form
      setNotes('');
    }
  };

  const handleCancel = () => {
    // Reset form
    setNotes('');
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
          <div className="text-center mb-6">
            <h2 className="text-3xl font-serif font-bold text-vault-blue mb-4">
              Apply for Sponsorship
            </h2>
            <p className="text-gray-600 text-sm">
              Our sponsorship program helps students who need financial assistance accessing scholarship opportunities. Fill out this brief application to be considered.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              {/* Notes */}
              <div>
                <label 
                  htmlFor="notes" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Why do you need sponsorship?
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly explain your financial situation and why you need assistance..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-white border-2 border-neutral-gray text-neutral-gray px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                  isFormValid
                    ? 'bg-privacy-teal text-white hover:bg-opacity-90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NeedFinancialAssistanceModal;