import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentRequestByToken, updatePaymentRequestStatus } from '../utils/paymentService';
import Logo from '../components/Logo';

const PaymentLandingPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Form fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingName, setBillingName] = useState('');
  const [billingZip, setBillingZip] = useState('');

  useEffect(() => {
    if (token) {
      const request = getPaymentRequestByToken(token);
      if (request) {
        if (request.status === 'completed') {
          setError('This payment link has already been used.');
        } else if (new Date(request.expiresAt) < new Date()) {
          setError('This payment link has expired.');
          updatePaymentRequestStatus(token, 'expired');
        } else {
          setPaymentRequest(request);
          setBillingName(request.parentName || '');
        }
      } else {
        setError('Invalid payment link.');
      }
      setLoading(false);
    }
  }, [token]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\s/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update payment request status
    if (token) {
      updatePaymentRequestStatus(token, 'completed');
    }

    setPaymentComplete(true);
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-privacy-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Link Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-privacy-teal text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-verified-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-vault-blue mb-3">Payment Successful!</h2>
            <p className="text-gray-600">
              You've successfully activated ScholarTrail Premium for {paymentRequest?.studentName}
            </p>
          </div>

          <div className="bg-info-blue bg-opacity-10 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-vault-blue mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {paymentRequest?.studentName} now has full access to all premium features
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                A confirmation email has been sent to {paymentRequest?.parentEmail}
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                You can manage your subscription anytime from your account
              </li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Want to track {paymentRequest?.studentName}'s progress?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a free parent account to monitor scholarship applications and provide support.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/signup?userType=parent')}
                className="w-full px-6 py-3 bg-trust-pink text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
              >
                Create Parent Account
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-2 text-privacy-teal hover:text-opacity-80 transition-colors"
              >
                No thanks, I'm done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h1 className="text-2xl font-serif font-bold text-vault-blue mb-6">
                Complete Your Payment
              </h1>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Activating premium for:</p>
                <p className="font-semibold text-gray-900">{paymentRequest?.studentName}</p>
                {paymentRequest?.message && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Message from {paymentRequest.studentName}:</p>
                    <p className="text-sm text-gray-800 italic mt-1">"{paymentRequest.message}"</p>
                  </div>
                )}
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                      required
                    />
                  </div>
                </div>

                {/* Billing Name */}
                <div>
                  <label htmlFor="billingName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="billingName"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    required
                  />
                </div>

                {/* Billing Zip */}
                <div>
                  <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700 mb-1">
                    Billing ZIP Code
                  </label>
                  <input
                    type="text"
                    id="billingZip"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value.replace(/\D/g, '').substring(0, 5))}
                    placeholder="12345"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-4 rounded-md font-semibold transition-all ${
                    processing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-trust-pink text-white hover:bg-opacity-90'
                  }`}
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${paymentRequest?.amount || '34'}`
                  )}
                </button>
              </form>

              {/* Security badges */}
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-vault-blue mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">ScholarTrail Premium</p>
                    <p className="text-sm text-gray-600">Annual subscription</p>
                  </div>
                  <p className="font-semibold text-gray-900">$34</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="text-gray-900">$34</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Tax</p>
                    <p className="text-gray-900">$0.00</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900">Total</p>
                    <p className="text-lg font-semibold text-gray-900">$34</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Billed annually</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-3">Included benefits:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Unlimited scholarship access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Advanced matching algorithm</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Application tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-verified-green mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
              </div>

              {/* Trust badge */}
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600 mb-2">501(c)(3) Nonprofit</p>
                <p className="text-xs text-gray-500">Your payment supports our mission to make education accessible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLandingPage;