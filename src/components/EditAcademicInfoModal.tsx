import React, { useState, useEffect } from 'react';
import { generateGPAValues } from '../utils/gpaValues';

interface EditAcademicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { gradeLevel?: string; schoolType?: string; gpa?: string }) => void;
  currentData: { gradeLevel?: string; schoolType?: string; gpa?: string };
}

const EditAcademicInfoModal: React.FC<EditAcademicInfoModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  currentData
}) => {
  const [gradeLevel, setGradeLevel] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [gpa, setGpa] = useState('');
  const gpaValues = generateGPAValues();

  // Initialize form with current data when modal opens
  useEffect(() => {
    if (isOpen && currentData) {
      setGradeLevel(currentData.gradeLevel || '');
      setSchoolType(currentData.schoolType || '');
      setGpa(currentData.gpa || '');
    }
  }, [isOpen, currentData]);

  const handleSave = () => {
    onSave({ gradeLevel, schoolType, gpa });
  };

  const handleCancel = () => {
    // Reset form to original values
    setGradeLevel(currentData.gradeLevel || '');
    setSchoolType(currentData.schoolType || '');
    setGpa(currentData.gpa || '');
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
              Edit Academic Info
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
                className="flex-1 py-3 px-6 rounded-md font-semibold transition-all bg-privacy-teal text-white hover:bg-opacity-90"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAcademicInfoModal;