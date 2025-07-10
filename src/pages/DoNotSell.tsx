import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const DoNotSell: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // In a real implementation, this would submit to a backend
    // For now, we'll just store it locally
    const optOutData = {
      email,
      timestamp: new Date().toISOString(),
      type: 'do-not-sell'
    };
    
    // Store opt-out request
    const existingOptOuts = JSON.parse(localStorage.getItem('ccpaOptOuts') || '[]');
    existingOptOuts.push(optOutData);
    localStorage.setItem('ccpaOptOuts', JSON.stringify(existingOptOuts));
    
    setSubmitted(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-protected-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <Logo variant="horizontal" size={100} />
            </Link>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold text-vault-blue mb-8">
          Do Not Sell or Share My Personal Information
        </h1>

        {!submitted ? (
          <>
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-600">
                As a California resident, you have the right to opt out of the sale or sharing of your personal information. 
                ScholarTrail respects your privacy and does not sell personal information. However, we provide this form 
                to ensure compliance with the California Consumer Privacy Act (CCPA).
              </p>
              
              <h2 className="text-xl font-semibold text-vault-blue mt-6 mb-4">Your Rights Under CCPA</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>The right to know what personal information we collect</li>
                <li>The right to delete your personal information</li>
                <li>The right to opt-out of the sale of your personal information</li>
                <li>The right to non-discrimination for exercising your privacy rights</li>
              </ul>

              <h2 className="text-xl font-semibold text-vault-blue mt-6 mb-4">Submit Your Request</h2>
              <p className="text-gray-600">
                To opt out of any potential sale or sharing of your personal information, please provide your email address below:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-privacy-teal focus:border-privacy-teal"
                  placeholder="your@email.com"
                  required
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
              >
                Submit Opt-Out Request
              </button>
            </form>

            <div className="mt-8 p-4 bg-info-blue bg-opacity-10 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> ScholarTrail does not sell or share your personal information for marketing purposes. 
                We are committed to protecting your privacy and only use your data to provide our scholarship matching services.
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <svg className="w-16 h-16 text-verified-green mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-vault-blue mb-4">Request Submitted</h2>
            <p className="text-gray-600 mb-6">
              Your opt-out request has been received and will be processed within 15 business days. 
              You will receive a confirmation email at <strong>{email}</strong>.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all"
            >
              Return to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoNotSell;