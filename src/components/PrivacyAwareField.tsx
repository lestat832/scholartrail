import React from 'react';

interface PrivacyAwareFieldProps {
  label: string;
  value: string | undefined;
  isVisible: boolean;
  inline?: boolean;
}

const PrivacyAwareField: React.FC<PrivacyAwareFieldProps> = ({ 
  label, 
  value, 
  isVisible,
  inline = false 
}) => {
  if (inline) {
    return (
      <span className="inline-flex items-center">
        <span className="font-medium">{label}:</span>
        {isVisible ? (
          <span className="ml-1">{value || 'Not specified'}</span>
        ) : (
          <span className="ml-1 text-gray-400 italic flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private
          </span>
        )}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="font-medium text-gray-700">{label}</span>
      {isVisible ? (
        <span className="text-gray-900">{value || 'Not specified'}</span>
      ) : (
        <span className="text-gray-400 italic flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Private
        </span>
      )}
    </div>
  );
};

export default PrivacyAwareField;