import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
  firstName?: string;
}

interface Scholarship {
  id: string;
  name: string;
  description: string;
  deadline: string;
  amount: string;
  matchStrength: number; // 1-5
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const firstName = state?.firstName || 'Student';
  
  const [filter, setFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Mock data for scholarships
  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'Merit Excellence Scholarship',
      description: 'Awarded to high-achieving students demonstrating exceptional academic performance and leadership.',
      deadline: 'March 15, 2025',
      amount: '$10,000',
      matchStrength: 5
    },
    {
      id: '2',
      name: 'STEM Innovation Grant',
      description: 'Supporting students pursuing degrees in Science, Technology, Engineering, or Mathematics fields.',
      deadline: 'April 1, 2025',
      amount: '$15,000',
      matchStrength: 4
    },
    {
      id: '3',
      name: 'Community Leadership Award',
      description: 'For students who have made significant contributions to their local communities through volunteer work.',
      deadline: 'February 28, 2025',
      amount: '$5,000',
      matchStrength: 4
    }
  ];

  const stats = {
    numberOfMatches: 47,
    amountInMatches: '$125,000'
  };

  const renderMatchStrength = (strength: number) => {
    return (
      <div className="flex flex-col items-center justify-center w-32 h-32">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-3 ${
                level <= 2 ? 'h-8' : level <= 4 ? 'h-12' : 'h-16'
              } ${
                level <= strength ? 'bg-privacy-teal' : 'bg-gray-200'
              } rounded-t`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-protected-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="w-24 h-8 bg-gray-300 rounded" /> {/* Logo placeholder */}
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-900 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a>
              </nav>
            </div>
            <div className="w-10 h-10 bg-gray-400 rounded-full" /> {/* Profile placeholder */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-vault-blue mb-2">
            Hi {firstName}! 🎓
          </h1>
          <p className="text-gray-600">
            Here's a brief overview of your personalized matches.
          </p>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 mb-12">
          <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
            <div className="text-3xl font-bold text-vault-blue">{stats.numberOfMatches}</div>
            <div className="text-sm text-gray-600 text-center mt-2">Number<br />of<br />Matches</div>
          </div>
          <div className="bg-white rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-md">
            <div className="text-3xl font-bold text-vault-blue">{stats.amountInMatches}</div>
            <div className="text-sm text-gray-600 text-center mt-2">Amount<br />in<br />Matches</div>
          </div>
        </div>

        {/* Feed Section */}
        <div className="relative">
          {/* Filter Dropdown */}
          <div className="absolute right-0 -top-12">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="capitalize">{filter === 'all' ? 'All' : filter}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => { setFilter('all'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      All
                    </button>
                    <button
                      onClick={() => { setFilter('saved'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Saved
                    </button>
                    <button
                      onClick={() => { setFilter('applied'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Applied
                    </button>
                    <button
                      onClick={() => { setFilter('archived'); setShowFilterDropdown(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Archived
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scholarship List */}
          <div className="space-y-4">
            {scholarships.map((scholarship) => (
              <div key={scholarship.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start space-x-6">
                  {/* Match Strength */}
                  <div className="flex-shrink-0">
                    {renderMatchStrength(scholarship.matchStrength)}
                  </div>
                  
                  {/* Scholarship Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-vault-blue mb-2">
                          {scholarship.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {scholarship.description.length > 100 
                            ? scholarship.description.substring(0, 100) + '...'
                            : scholarship.description
                          }
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-500">
                          <span>Deadline: {scholarship.deadline}</span>
                        </div>
                      </div>
                      
                      {/* Amount */}
                      <div className="text-2xl font-bold text-privacy-teal ml-6">
                        {scholarship.amount}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-6 mt-4">
                      <button className="text-info-blue hover:underline">View More</button>
                      <button className="text-info-blue hover:underline">Save</button>
                      <button className="px-6 py-2 bg-info-blue text-white rounded-md hover:bg-opacity-90">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Subscription Promo */}
            <div className="bg-trust-pink bg-opacity-10 border-2 border-trust-pink rounded-lg p-8 text-center">
              <h3 className="text-2xl font-serif font-bold text-vault-blue mb-4">
                Unlock Your Full Potential! 🚀
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                You have 44 more scholarships waiting for you! Subscribe to ScholarTrail Premium 
                to access all your matches and maximize your funding opportunities.
              </p>
              <button className="px-8 py-3 bg-trust-pink text-white rounded-md font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;