import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const ParentPaymentEmailPreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get('token') || '';
  const studentName = searchParams.get('studentName') || 'Your child';
  const parentEmail = searchParams.get('parentEmail') || 'parent@email.com';
  const parentName = searchParams.get('parentName') || '';
  const message = searchParams.get('message') || '';

  const paymentLink = `/parent-payment/${token}`;

  const handleViewPaymentPage = () => {
    navigate(paymentLink);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Email Client Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">ScholarTrail Mail (Demo)</h1>
          <Link to="/dashboard" className="text-sm hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Email Container */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Email Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">From:</span>
              <span className="text-gray-800">ScholarTrail &lt;payments@scholartrail.com&gt;</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">To:</span>
              <span className="text-gray-800">{parentEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">Subject:</span>
              <span className="text-gray-800 font-medium">
                {studentName} needs your help with ScholarTrail
              </span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-privacy-teal rounded-lg"></div>
              <span className="text-2xl font-serif font-bold text-vault-blue">ScholarTrail</span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              {parentName ? `Hi ${parentName},` : 'Hi there,'}
            </p>

            <p className="text-gray-700 mb-6">
              {studentName} is requesting your help to get a ScholarTrail subscription. ScholarTrail helps students find and apply for scholarships that match their unique profile.
            </p>

            {message && (
              <div className="bg-info-blue bg-opacity-10 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-vault-blue mb-1">Personal message from {studentName}:</p>
                <p className="text-gray-700 italic">"{message}"</p>
              </div>
            )}

            {/* Subscription Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-vault-blue mb-4">What you're paying for:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Annual ScholarTrail subscription - $34/year</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access to thousands of scholarship opportunities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personalized scholarship matching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Application tracking and deadline reminders</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your own parent account to track progress</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleViewPaymentPage}
                className="inline-flex items-center px-8 py-4 bg-trust-pink text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Complete Secure Payment
              </button>
              <p className="text-sm text-gray-500 mt-2">
                This link expires in 48 hours
              </p>
            </div>

            {/* Footer */}
            <div className="border-t pt-6 text-center text-sm text-gray-600">
              <p className="mb-4">
                Questions? Contact us at support@scholartrail.com
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs">
                <span>🔒 Secure Payment</span>
                <span>•</span>
                <span>Privacy Protected</span>
                <span>•</span>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="max-w-4xl mx-auto mt-4 text-center text-sm text-gray-600">
        <p>This is a demo email preview. In production, this would be sent to {parentEmail}</p>
      </div>
    </div>
  );
};

export default ParentPaymentEmailPreview;