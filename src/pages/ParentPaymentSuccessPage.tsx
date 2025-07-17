import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const ParentPaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('parentPaymentSuccess');
    if (data) {
      setSuccessData(JSON.parse(data));
      // Clear the success data after reading
      localStorage.removeItem('parentPaymentSuccess');
    } else {
      // If no success data, redirect to home
      navigate('/');
    }
  }, [navigate]);

  if (!successData) {
    return null;
  }

  const handleGoToDashboard = () => {
    // In a real app, this would log the parent in automatically
    navigate('/dashboard', { 
      state: { 
        userType: 'parent',
        isNewAccount: true,
        email: successData.email,
        firstName: successData.firstName
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Logo variant="horizontal" />
        </div>
      </div>

      {/* Success Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-verified-green bg-opacity-10 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-verified-green bg-opacity-20 rounded-full mb-4">
              <svg className="w-10 h-10 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Complete!</h1>
            <p className="text-lg text-gray-600">Thank you for supporting {successData.studentName}'s education</p>
          </div>

          {/* Details */}
          <div className="p-8 space-y-6">
            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Transaction Details</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Amount Paid:</dt>
                  <dd className="font-semibold text-gray-900">$34.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subscription:</dt>
                  <dd className="font-semibold text-gray-900">Annual ScholarTrail</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Student:</dt>
                  <dd className="font-semibold text-gray-900">{successData.studentName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Receipt sent to:</dt>
                  <dd className="font-semibold text-gray-900">{successData.email}</dd>
                </div>
              </dl>
            </div>

            {/* Account Created Notice */}
            {successData.createAccount && (
              <div className="border-2 border-privacy-teal rounded-lg p-6">
                <h2 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-privacy-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Parent Account Created
                </h2>
                <p className="text-gray-600 mb-3">
                  We've created a parent account for you to track {successData.studentName}'s scholarship progress.
                </p>
                <div className="bg-gray-50 rounded p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {successData.email}
                  </p>
                  {successData.temporaryPassword && (
                    <p className="text-sm">
                      <span className="font-medium">Temporary Password:</span>{' '}
                      <code className="bg-gray-200 px-2 py-1 rounded text-trust-pink font-mono">
                        {successData.temporaryPassword}
                      </code>
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Please change your password after logging in for the first time.
                </p>
              </div>
            )}

            {/* What's Next */}
            <div className="bg-info-blue bg-opacity-10 rounded-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-3">What happens next?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{successData.studentName} now has full access to ScholarTrail</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>You'll receive a receipt via email</span>
                </li>
                {successData.createAccount && (
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    </svg>
                    <span>You can track scholarship applications and progress</span>
                  </li>
                )}
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Subscription renews automatically in one year</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {successData.createAccount && (
                <button
                  onClick={handleGoToDashboard}
                  className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
                >
                  Go to Parent Dashboard
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition-all"
              >
                Return to Homepage
              </button>
            </div>

            {/* Support */}
            <div className="text-center text-sm text-gray-600 pt-4 border-t">
              <p>Questions? Contact us at support@scholartrail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPaymentSuccessPage;