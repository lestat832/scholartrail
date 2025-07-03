import React, { useState, useEffect } from 'react';
import { generateGPAValues } from '../utils/gpaValues';

interface AddChildAcademicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => void;
  onPrevious: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const AddChildAcademicInfoModal: React.FC<AddChildAcademicInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onContinue,
  onPrevious,
  currentStep = 3,
  totalSteps = 4
}) => {
  const [gradeLevel, setGradeLevel] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [gpa, setGpa] = useState('');
  const gpaValues = generateGPAValues();

  const handleContinue = () => {
    onContinue({ gradeLevel, schoolType, gpa });
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
              Add Academic Info
            </h2>
            <p className="text-sm text-gray-500">
              Tell us about your child's academic profile to find scholarships that match your educational level and achievements.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
            <div className="space-y-6 mb-8">
              {/* Grade Level */}
              <div>
                <label 
                  htmlFor="gradeLevel" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Grade Level
                </label>
                <select
                  id="gradeLevel"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                >
                  <option value="">Select grade level</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate Student</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* School Type */}
              <div>
                <label 
                  htmlFor="schoolType" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  School Type
                </label>
                <select
                  id="schoolType"
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                >
                  <option value="">Select school type</option>
                  <option value="high-school">High School</option>
                  <option value="college">College</option>
                  <option value="graduate-school">Graduate School</option>
                  <option value="trade-school">Trade School</option>
                  <option value="adult-school">Adult School</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* GPA */}
              <div>
                <label 
                  htmlFor="gpa" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  GPA
                </label>
                <select
                  id="gpa"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                >
                  <option value="">Select GPA</option>
                  {gpaValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
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

export default AddChildAcademicInfoModal;