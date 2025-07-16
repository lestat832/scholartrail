import React, { useState, useEffect } from 'react';
import { usePayment } from '../contexts/PaymentContext';
import NeedFinancialAssistanceModal from './NeedFinancialAssistanceModal';
import ApplicationSubmissionModal from './ApplicationSubmissionModal';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  onRequestPayment: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, onPurchase, onRequestPayment }) => {
  const { subscription } = usePayment();
  const [isAnnual, setIsAnnual] = useState(true);
  const [showCouponCode, setShowCouponCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'more' | 'parent'>('credit');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFinancialAssistanceModal, setShowFinancialAssistanceModal] = useState(false);
  const [showApplicationSubmissionModal, setShowApplicationSubmissionModal] = useState(false);
  
  // Form fields
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [couponCode, setCouponCode] = useState('');

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreedToTerms && paymentMethod === 'credit') {
      onPurchase();
    }
  };

  const handleFinancialAssistanceClick = () => {
    setShowFinancialAssistanceModal(true);
  };

  const handleNeedAssistanceContinue = () => {
    setShowFinancialAssistanceModal(false);
    setShowApplicationSubmissionModal(true);
  };

  const handleApplicationSubmitted = () => {
    setShowApplicationSubmissionModal(false);
    onClose();
  };

  if (!isOpen) return null;

  const isTrialExpired = subscription.status === 'free' && subscription.trialEndsAt;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-vault-blue mb-2">
                  {isTrialExpired ? 'Your Free Trial Has Ended' : (isAnnual ? 'A Year of Scholarships!' : 'A Month of Scholarships!')}
                </h2>
                {/* Header image placeholder */}
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mt-4"></div>
              </div>

              {/* Pricing Options */}
              <div className="mb-6">
                {/* Single Price Display */}
                <div className="border-2 border-privacy-teal bg-privacy-teal bg-opacity-5 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-vault-blue mb-2">
                      {isAnnual ? '$34' : '$2.99'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isAnnual 
                        ? '$34 USD per year, billed in advance, auto-renewal' 
                        : '$2.99 USD per month, auto-renewal'
                      }
                    </div>
                  </div>
                </div>

                {/* Change Plan Link - Centered */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsAnnual(!isAnnual)}
                    className="text-privacy-teal hover:underline text-sm font-medium"
                  >
                    {isAnnual ? 'Change to Monthly Plan' : 'Change to Annual Plan'}
                  </button>
                </div>
              </div>

              {/* Need Financial Assistance */}
              <div className="bg-info-blue bg-opacity-10 rounded-lg p-6 mb-6 text-center">
                <h3 className="font-semibold text-vault-blue mb-3 text-lg">Need Financial Assistance?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Apply for a sponsored membership. Our sponsors help deserving students access scholarships.
                </p>
                <button 
                  type="button" 
                  onClick={handleFinancialAssistanceClick}
                  className="px-6 py-2 bg-info-blue text-white rounded-md font-medium hover:bg-opacity-90 transition-all"
                >
                  Apply for Sponsorship
                </button>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowCouponCode(!showCouponCode)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <svg 
                    className={`w-4 h-4 mr-1 transition-transform ${showCouponCode ? 'rotate-90' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Have a coupon code?
                </button>
                {showCouponCode && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-vault-blue mb-4">Payment Options</h3>
                
                {/* Credit Card */}
                <div className="space-y-4">
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'credit' ? 'border-privacy-teal' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                          paymentMethod === 'credit' ? 'border-privacy-teal bg-privacy-teal' : 'border-gray-300'
                        }`}>
                          {paymentMethod === 'credit' && (
                            <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">Credit or Debit Card</span>
                      </div>
                      <div className="flex space-x-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">VISA</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">MC</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">AMEX</span>
                      </div>
                    </div>

                    {paymentMethod === 'credit' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              value={expirationDate}
                              onChange={(e) => setExpirationDate(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* More Payment Options */}
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'more' ? 'border-privacy-teal' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('more')}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        paymentMethod === 'more' ? 'border-privacy-teal bg-privacy-teal' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'more' && (
                          <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">More Payment Options</span>
                    </div>

                    {paymentMethod === 'more' && (
                      <div className="mt-4 space-y-3">
                        <button className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                          </svg>
                          Apple Pay
                        </button>
                        <button className="w-full py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google Pay
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Ask my parent to pay */}
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'parent' ? 'border-privacy-teal' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('parent')}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                        paymentMethod === 'parent' ? 'border-privacy-teal bg-privacy-teal' : 'border-gray-300'
                      }`}>
                        {paymentMethod === 'parent' && (
                          <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">Ask My Parents To Pay</span>
                    </div>

                    {paymentMethod === 'parent' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          We'll send your parent an email with a secure payment link for your ScholarTrail subscription.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-privacy-teal focus:ring-privacy-teal border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    By purchasing, you authorize us to automatically charge the membership fee to your chosen payment method on a recurring basis and agree to the Terms of Sale. You can cancel or change your membership at any time on your Account page.
                  </span>
                </label>
              </div>

              {/* Purchase Button */}
              {paymentMethod !== 'parent' ? (
                <button
                  type="submit"
                  disabled={!agreedToTerms}
                  className={`w-full py-3 px-6 rounded-md font-semibold transition-all ${
                    agreedToTerms 
                      ? 'bg-privacy-teal text-white hover:bg-opacity-90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Purchase
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onRequestPayment}
                  className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
                >
                  Continue
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Financial Assistance Modals */}
      {showFinancialAssistanceModal && (
        <NeedFinancialAssistanceModal
          isOpen={showFinancialAssistanceModal}
          onClose={() => setShowFinancialAssistanceModal(false)}
          onContinue={handleNeedAssistanceContinue}
        />
      )}

      {showApplicationSubmissionModal && (
        <ApplicationSubmissionModal
          isOpen={showApplicationSubmissionModal}
          onClose={() => setShowApplicationSubmissionModal(false)}
          onSubmit={handleApplicationSubmitted}
        />
      )}
    </>
  );
};

export default PaywallModal;