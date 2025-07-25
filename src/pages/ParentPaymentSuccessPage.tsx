import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { PRICING_PLANS, SubscriptionType } from '../utils/paymentService';

const ParentPaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const data = localStorage.getItem('parentPaymentSuccess');
    console.log('ParentPaymentSuccess - localStorage data:', data);
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('ParentPaymentSuccess - parsed data:', parsedData);
      setSuccessData(parsedData);
      // Don't clear immediately - wait for component to fully load
      // localStorage.removeItem('parentPaymentSuccess');
    }
  }, []);

  if (!successData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-6">
            Your payment session has expired. Please return to the payment page and try again.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-privacy-teal text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const subscriptionType = successData.subscriptionType || 'student';
  const billingPeriod = successData.billingPeriod || 'monthly';
  const plan = PRICING_PLANS[subscriptionType as SubscriptionType];
  const isParentPlan = subscriptionType === 'parent';

  const handleGoToDashboard = () => {
    // Clear the success data before navigating
    localStorage.removeItem('parentPaymentSuccess');
    
    // In a real app, this would log the parent in automatically
    navigate('/dashboard', { 
      state: { 
        userType: 'parent',
        isNewAccount: true,
        email: successData.email,
        studentName: successData.studentName,
        accountType: successData.accountType, // Added missing accountType
        subscriptionType: successData.subscriptionType || 'student',
        billingPeriod: successData.billingPeriod || 'monthly',
        parentAccount: successData.parentAccount,
        fromPaymentSuccess: true
      } 
    });
  };

  // Auto-redirect to dashboard after 5 seconds
  useEffect(() => {
    if (successData && successData.createAccount) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            handleGoToDashboard();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdownTimer);
    }
  }, [successData]);

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
                  <dd className="font-semibold text-gray-900">
                    ${(successData.price || 34).toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Plan:</dt>
                  <dd className="font-semibold text-gray-900">
                    {isParentPlan ? 'Parent Plan' : 'Student Plan'}
                    {isParentPlan && <span className="ml-1 text-xs bg-trust-pink text-white px-2 py-0.5 rounded-full">PREMIUM</span>}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Billing:</dt>
                  <dd className="font-semibold text-gray-900 capitalize">
                    {billingPeriod}
                    {billingPeriod === 'annual' && <span className="text-xs text-verified-green ml-1">(Save 2 months)</span>}
                  </dd>
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
                  {isParentPlan ? 'Parent Account Created' : 'Basic Parent Account Created'}
                </h2>
                <p className="text-gray-600 mb-3">
                  {isParentPlan 
                    ? `You now have full parent dashboard access to track progress for up to ${plan.limits.studentProfiles} students, starting with ${successData.studentName}.`
                    : `We've created a basic parent account for payment management and limited progress tracking for ${successData.studentName}.`
                  }
                </p>
                
                {/* Plan Features */}
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Your Plan Includes:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {plan.features.slice(0, isParentPlan ? 4 : 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-verified-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {!isParentPlan && (
                    <div className="mt-3 p-3 bg-info-blue bg-opacity-10 rounded border border-info-blue">
                      <p className="text-sm text-info-blue font-medium">
                        💡 Upgrade to Parent Plan to unlock full dashboard, progress tracking, and support for up to 3 students!
                      </p>
                    </div>
                  )}
                </div>

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
                    <span>
                      {isParentPlan 
                        ? 'Access your full parent dashboard with progress tracking'
                        : 'View basic scholarship progress and manage your subscription'
                      }
                    </span>
                  </li>
                )}
                {isParentPlan && successData.createAccount && (
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add up to 2 more student profiles to your account</span>
                  </li>
                )}
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-info-blue mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    Subscription renews automatically in one {billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {successData.createAccount && (
                <div className="space-y-2">
                  <button
                    onClick={handleGoToDashboard}
                    className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
                  >
                    {isParentPlan ? 'Go to Parent Dashboard' : 'Go to Basic Dashboard'}
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    Redirecting in {countdown} seconds...
                  </p>
                </div>
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