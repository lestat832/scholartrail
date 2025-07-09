import React, { useState } from 'react';

interface PrivacyControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  privacySettings: PrivacySettings;
  onSave: (settings: PrivacySettings) => void;
}

export interface PrivacySettings {
  gender: boolean;
  nationality: boolean;
  cityState: boolean;
  gradeLevel: boolean;
  schoolType: boolean;
  gpa: boolean;
  major: boolean;
  degree: boolean;
  graduationYear: boolean;
  scholarships: boolean;
}

const PrivacyControlsModal: React.FC<PrivacyControlsModalProps> = ({
  isOpen,
  onClose,
  privacySettings,
  onSave
}) => {
  const [settings, setSettings] = useState<PrivacySettings>(privacySettings);

  const privacyOptions = [
    { key: 'gender' as keyof PrivacySettings, label: 'Gender' },
    { key: 'nationality' as keyof PrivacySettings, label: 'Nationality' },
    { key: 'cityState' as keyof PrivacySettings, label: 'City, State' },
    { key: 'gradeLevel' as keyof PrivacySettings, label: 'Grade Level' },
    { key: 'schoolType' as keyof PrivacySettings, label: 'School Type' },
    { key: 'gpa' as keyof PrivacySettings, label: 'GPA' },
    { key: 'major' as keyof PrivacySettings, label: 'Major' },
    { key: 'degree' as keyof PrivacySettings, label: 'Degree' },
    { key: 'graduationYear' as keyof PrivacySettings, label: 'Graduation Year' },
    { key: 'scholarships' as keyof PrivacySettings, label: 'Scholarships' },
  ];

  const handleToggle = (key: keyof PrivacySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-vault-blue">
              Privacy Controls
            </h2>
            <p className="text-gray-600 mt-2">
              Control what your parent sees via these toggles
            </p>
          </div>

          {/* Share label */}
          <div className="flex justify-end mb-4">
            <span className="text-sm font-medium text-gray-700">Share</span>
          </div>

          {/* Privacy Options */}
          <div className="space-y-4">
            {privacyOptions.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-900">{label}</span>
                <button
                  onClick={() => handleToggle(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[key] ? 'bg-privacy-teal' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings[key]}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Asterisk Note */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              • Scholarships that are matched via a parameter that has been selected to not be shared with the parent will not be shown
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-privacy-teal text-white rounded-md hover:bg-opacity-90 transition-all font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControlsModal;