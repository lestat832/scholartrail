import React, { useState, useEffect } from 'react';

interface ShareChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  childId: string;
  onShare: (method: 'email' | 'copy') => void;
}

const ShareChildProfileModal: React.FC<ShareChildProfileModalProps> = ({ 
  isOpen, 
  onClose,
  childName,
  childId,
  onShare
}) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'copy' | null>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setCopiedToClipboard(false);
      setShareMethod(null);
    }
  }, [isOpen]);

  const getEmailTemplate = () => {
    const subject = `Join me on ScholarTrail - Scholarship Opportunities for ${childName}`;
    const body = `Hi ${childName},

I've created a profile for you on ScholarTrail to help you find scholarship opportunities!

ScholarTrail is a privacy-first platform that matches students with scholarships without selling your data.

Visit ScholarTrail.com to create your account and connect with me. You'll have full control over your profile and can choose what information to share.

Let's work together to find great scholarship opportunities!

Best,
Your Parent`;

    return { subject, body };
  };

  const handleEmailShare = () => {
    const { subject, body } = getEmailTemplate();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setShareMethod('email');
    onShare('email');
  };

  const handleCopyLink = async () => {
    try {
      const message = `I've created a ScholarTrail profile for ${childName}. Visit ScholarTrail.com to connect and find scholarship opportunities together!`;
      await navigator.clipboard.writeText(message);
      setCopiedToClipboard(true);
      setShareMethod('copy');
      onShare('copy');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedToClipboard(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
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
          <div className="relative flex items-center justify-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-vault-blue text-center">
              Share Profile with {childName}
            </h2>
            <button
              onClick={onClose}
              className="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Instructions */}
            <p className="text-gray-600">
              Share this profile with {childName} so they can create their own account and connect with you. They'll have full control over their profile and can choose what information to share.
            </p>

            {/* Share Options */}
            <div className="space-y-3">
              <button
                onClick={handleEmailShare}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-info-blue hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-info-blue bg-opacity-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-info-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Email Invitation</p>
                    <p className="text-sm text-gray-500">Send via email application</p>
                  </div>
                </div>
                {shareMethod === 'email' && (
                  <svg className="w-5 h-5 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-info-blue hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-info-blue bg-opacity-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-info-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Copy Message</p>
                    <p className="text-sm text-gray-500">
                      {copiedToClipboard ? 'Copied to clipboard!' : 'Copy invitation message'}
                    </p>
                  </div>
                </div>
                {copiedToClipboard && (
                  <svg className="w-5 h-5 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <div className="bg-privacy-teal bg-opacity-10 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-privacy-teal mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="font-semibold text-privacy-teal">Privacy First</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {childName} will have full control over their profile and can choose what information to share with you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-md font-semibold hover:bg-gray-200 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareChildProfileModal;