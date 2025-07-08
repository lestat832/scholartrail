import React, { useState, useEffect } from 'react';

interface ShareChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  childId: string;
  onShare: (method: 'email' | 'sms' | 'copy', invitationCode: string) => void;
}

const ShareChildProfileModal: React.FC<ShareChildProfileModalProps> = ({ 
  isOpen, 
  onClose,
  childName,
  childId,
  onShare
}) => {
  const [invitationCode, setInvitationCode] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'sms' | 'copy' | null>(null);

  // Generate invitation code when modal opens
  useEffect(() => {
    if (isOpen) {
      // Check if invitation already exists for this child
      const storedChildren = localStorage.getItem('childrenProfiles');
      if (storedChildren) {
        const children = JSON.parse(storedChildren);
        const child = children.find((c: any) => c.id === childId);
        if (child?.invitation?.code) {
          setInvitationCode(child.invitation.code);
        } else {
          // Generate new code
          const code = generateInvitationCode();
          setInvitationCode(code);
        }
      }
      // Reset states
      setCopiedToClipboard(false);
      setShareMethod(null);
    }
  }, [isOpen, childId]);

  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'SCHOLAR-';
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += '-';
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const getInvitationLink = () => {
    return `https://scholartrail.com/join/${invitationCode}`;
  };

  const getEmailTemplate = () => {
    const subject = `Join me on ScholarTrail - Scholarship Opportunities for ${childName}`;
    const body = `Hi ${childName},

I've created a profile for you on ScholarTrail to help you find scholarship opportunities!

ScholarTrail is a privacy-first platform that matches students with scholarships without selling your data.

Click here to activate your account and connect with me:
${getInvitationLink()}

Your invitation code is: ${invitationCode}

This invitation expires in 7 days.

Let's work together to find great scholarship opportunities!

Best,
Your Parent`;

    return { subject, body };
  };

  const getSMSTemplate = () => {
    return `Hi ${childName}! I created a ScholarTrail profile to help you find scholarships. Join here: ${getInvitationLink()} Code: ${invitationCode}`;
  };

  const handleEmailShare = () => {
    const { subject, body } = getEmailTemplate();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setShareMethod('email');
    onShare('email', invitationCode);
  };

  const handleSMSShare = () => {
    const message = getSMSTemplate();
    const smsLink = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
    setShareMethod('sms');
    onShare('sms', invitationCode);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getInvitationLink());
      setCopiedToClipboard(true);
      setShareMethod('copy');
      onShare('copy', invitationCode);
      
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-vault-blue">
              Share Profile with {childName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Invitation Code Display */}
            <div className="bg-protected-bg rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Invitation Code</p>
              <p className="text-2xl font-mono font-bold text-privacy-teal">{invitationCode}</p>
              <p className="text-xs text-gray-500 mt-2">Expires in 7 days</p>
            </div>

            {/* Instructions */}
            <p className="text-gray-600">
              Share this profile with {childName} so they can create their own account and connect with you. They'll have control over what information you can see.
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
                onClick={handleSMSShare}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-info-blue hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-info-blue bg-opacity-10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-info-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Text Message</p>
                    <p className="text-sm text-gray-500">Send via SMS</p>
                  </div>
                </div>
                {shareMethod === 'sms' && (
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
                    <p className="font-semibold text-gray-900">Copy Link</p>
                    <p className="text-sm text-gray-500">
                      {copiedToClipboard ? 'Copied to clipboard!' : 'Share manually'}
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