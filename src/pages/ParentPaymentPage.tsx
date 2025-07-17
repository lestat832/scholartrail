import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentRequestByToken } from '../utils/paymentService';
import Logo from '../components/Logo';

const ParentPaymentPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  
  // Payment form fields
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [zip, setZip] = useState('');
  
  // Parent account fields
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (token) {
      const request = getPaymentRequestByToken(token);
      if (request) {
        if (request.status === 'completed') {
          setError('This payment link has already been used.');
        } else if (new Date(request.expiresAt) < new Date()) {
          setError('This payment link has expired.');
        } else {
          setPaymentRequest(request);
          setEmail(request.parentEmail);
          setFirstName(request.parentName || '');
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
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Store payment success data
      const successData = {
        email,
        firstName,
        studentName: paymentRequest?.studentName,
        createAccount: true,
        temporaryPassword: Math.random().toString(36).slice(-8)
      };
      
      localStorage.setItem('parentPaymentSuccess', JSON.stringify(successData));
      navigate('/parent-payment-success');
    }, 2000);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Link Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo variant="horizontal" />
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Payment Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Complete Payment for {paymentRequest?.studentName}
            </h1>
            <p className="text-gray-600">
              Secure payment for ScholarTrail annual subscription
            </p>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Amount Display */}
            <div className="bg-info-blue bg-opacity-10 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Amount to pay</p>
              <p className="text-3xl font-bold text-vault-blue">$34.00</p>
              <p className="text-sm text-gray-600 mt-1">Annual subscription</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                required
              />
            </div>

            {/* Card Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Information
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-t-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    maxLength={19}
                    required
                  />
                  <div className="flex">
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-bl-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                      maxLength={5}
                      required
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      placeholder="CVC"
                      className="w-1/2 px-4 py-2 border border-l-0 border-gray-300 rounded-br-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing ZIP Code
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, '').substring(0, 5))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                  maxLength={5}
                  required
                />
              </div>
            </div>

            {/* Parent Account Creation */}
            <div className="border-t pt-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">Create Your Parent Account</h3>
                <p className="text-sm text-gray-600">
                  Track {paymentRequest?.studentName}'s scholarship progress and manage the subscription
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                    minLength={8}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing || !email || !cardNumber || !expiryDate || !cvc || !nameOnCard || !zip || !firstName || !password || password.length < 8}
              className={`w-full py-3 rounded-md font-semibold transition-all ${
                processing || !email || !cardNumber || !expiryDate || !cvc || !nameOnCard || !zip || !firstName || !password || password.length < 8
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-privacy-teal text-white hover:bg-opacity-90'
              }`}
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Complete Payment'
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>Your payment information is secure and encrypted</p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  SSL Encrypted
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-verified-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  PCI Compliant
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentPaymentPage;