import React, { useState } from 'react';
import { 
  createPaymentRequest, 
  sendPaymentRequestEmail, 
  isValidEmail,
  hasPendingPaymentRequest,
  getMostRecentPendingRequest
} from '../utils/paymentService';

interface RequestPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

const RequestPaymentModal: React.FC<RequestPaymentModalProps> = ({ 
  isOpen, 
  onClose,
  studentName 
}) => {
  const [parentEmail, setParentEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Check if there's already a pending request
  const existingRequest = getMostRecentPendingRequest();
  const hasExistingRequest = hasPendingPaymentRequest();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!isValidEmail(parentEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create payment request
      const request = createPaymentRequest(
        studentName,
        parentEmail,
        parentName,
        message
      );

      // Send email
      const emailSent = await sendPaymentRequestEmail(request);

      if (emailSent) {
        setShowSuccess(true);
      } else {
        setError('Failed to send email. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setParentEmail('');
    setParentName('');
    setMessage('');
    setShowSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleClose} />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!showSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-info-blue bg-opacity-10 rounded-full mb-3">
                  <svg className="w-6 h-6 text-info-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-bold text-vault-blue mb-2">
                  Request Payment from Parent
                </h2>
                <p className="text-gray-600">
                  We'll send your parent an email with a secure payment link
                </p>
              </div>

              {/* Existing Request Warning */}
              {hasExistingRequest && existingRequest && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-yellow-800">
                        You already sent a payment request to <strong>{existingRequest.parentEmail}</strong>
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Sending a new request will replace the previous one.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Email Address *
                  </label>
                  <input
                    type="email"
                    id="parentEmail"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    placeholder="parent@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                    Parent's Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    placeholder="Mom, Dad, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal resize-none"
                    placeholder="Hi Mom, I need ScholarTrail to help find scholarships..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !parentEmail}
                    className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all ${
                      isSubmitting || !parentEmail
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-trust-pink text-white hover:bg-opacity-90'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-verified-green bg-opacity-10 rounded-full mb-4">
                <svg className="w-8 h-8 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-vault-blue mb-3">
                Payment Request Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent an email to <strong>{parentEmail}</strong> with instructions to complete your subscription.
              </p>

              <div className="bg-info-blue bg-opacity-10 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-vault-blue mb-2">What happens next?</h4>
                <ol className="text-sm text-gray-700 space-y-2">
                  <li>1. Your parent will receive an email within a few minutes</li>
                  <li>2. They'll click the secure payment link</li>
                  <li>3. Once payment is complete, you'll get instant access</li>
                  <li>4. Check your email for confirmation</li>
                </ol>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
                >
                  Got it!
                </button>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full px-6 py-2 text-privacy-teal hover:text-opacity-80 transition-colors text-sm"
                >
                  Send to a different email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestPaymentModal;