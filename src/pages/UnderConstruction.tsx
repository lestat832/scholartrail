import React, { useState } from 'react';

const UnderConstruction: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to a backend
      console.log('Email submitted:', email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-protected-bg to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-vault-blue mb-8">
          ScholarTrail
        </h1>

        {/* Status Badge */}
        <div className="inline-flex items-center space-x-2 bg-privacy-teal bg-opacity-10 text-privacy-teal px-4 py-2 rounded-full mb-8">
          <div className="w-2 h-2 bg-privacy-teal rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Coming Soon</span>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl md:text-4xl font-serif text-vault-blue mb-6">
          We're building something special
        </h2>
        <p className="text-lg text-neutral-gray mb-12 max-w-lg mx-auto">
          The first scholarship platform that puts your privacy first. 
          No ads, no data selling, just opportunities for your education.
        </p>

        {/* Email Signup */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-privacy-teal focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-privacy-teal text-white font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-all"
              >
                Get Early Access
              </button>
            </div>
            <p className="text-sm text-neutral-gray mt-4">
              🔒 We'll never share or sell your email. Privacy is our promise.
            </p>
          </form>
        ) : (
          <div className="bg-verified-green bg-opacity-10 text-verified-green p-6 rounded-lg max-w-md mx-auto mb-12">
            <p className="font-semibold">Thank you for joining us!</p>
            <p className="text-sm mt-2">We'll notify you as soon as we launch.</p>
          </div>
        )}

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-privacy-teal bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-privacy-teal text-xl">🔒</span>
            </div>
            <h3 className="font-semibold text-vault-blue mb-2">Privacy First</h3>
            <p className="text-sm text-neutral-gray">Your data stays yours. No tracking, no selling.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-trust-pink bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-trust-pink text-xl">🎓</span>
            </div>
            <h3 className="font-semibold text-vault-blue mb-2">Real Opportunities</h3>
            <p className="text-sm text-neutral-gray">Curated scholarships worth your time.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-verified-green bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-verified-green text-xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="font-semibold text-vault-blue mb-2">Family Friendly</h3>
            <p className="text-sm text-neutral-gray">Tools for parents and educators too.</p>
          </div>
        </div>

        {/* Preview Link */}
        <div className="pt-8 border-t border-gray-200">
          <a
            href="/preview"
            className="text-privacy-teal hover:text-opacity-80 font-medium inline-flex items-center space-x-2 transition-colors"
          >
            <span>Preview our full site</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;