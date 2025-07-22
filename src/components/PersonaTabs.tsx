import React, { useState } from 'react';

interface PersonaTabsProps {
  onLoginClick: () => void;
}

const PersonaTabs: React.FC<PersonaTabsProps> = ({ onLoginClick }) => {
  const [activeTab, setActiveTab] = useState<'parent' | 'educator'>('parent');

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-protected-bg p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab('parent')}
              className={`px-8 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'parent'
                  ? 'bg-white text-privacy-teal shadow-sm'
                  : 'text-neutral-gray hover:text-vault-blue'
              }`}
            >
              Parent
            </button>
            <button
              onClick={() => setActiveTab('educator')}
              className={`px-8 py-3 rounded-md font-semibold transition-all ${
                activeTab === 'educator'
                  ? 'bg-white text-privacy-teal shadow-sm'
                  : 'text-neutral-gray hover:text-vault-blue'
              }`}
            >
              Educator
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Placeholder */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-full h-64 bg-protected-bg rounded-md flex items-center justify-center">
                <p className="text-neutral-gray">
                  {activeTab === 'parent' ? 'Parent View Illustration' : 'Educator View Illustration'}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            {activeTab === 'parent' ? (
              <>
                <h2 className="text-3xl font-serif font-bold text-vault-blue mb-4">
                  Empowering Parents
                </h2>
                <p className="text-lg text-neutral-gray mb-8">
                  Take control of your child's scholarship search. Get a clear view of what's 
                  available and what's worth applying to.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-serif font-bold text-vault-blue mb-4">
                  Supporting Educators
                </h2>
                <p className="text-lg text-neutral-gray mb-8">
                  Help your students discover funding without the distractions or data harvesting.
                </p>
              </>
            )}
            <button 
              onClick={onLoginClick}
              className="bg-privacy-teal text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all"
            >
              Search for Scholarships
            </button>
          </div>
        </div>

        {/* Data Security Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold text-vault-blue mb-6">
              Why Data Security Matters
            </h2>
            <p className="text-xl text-neutral-gray max-w-4xl mx-auto mb-12 leading-relaxed">
              Every time you share information with a site — like your GPA, interests, and even your parents' 
              income — that info is being saved. And without you even knowing, many sites sell that data to 
              marketers, advertisers, schools, or even lenders.
            </p>
            <p className="text-xl text-vault-blue font-medium mb-12">
              That didn't feel right to us, and that's why we created ScholarTrail.
            </p>

            {/* Security Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-protected-bg p-8 rounded-lg">
                <div className="w-16 h-16 bg-privacy-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-vault-blue mb-3">Your Data Stays Private</h3>
                <p className="text-neutral-gray">
                  We never sell your personal information to third parties. Your data is used only to match you with relevant scholarships.
                </p>
              </div>

              <div className="bg-protected-bg p-8 rounded-lg">
                <div className="w-16 h-16 bg-verified-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-vault-blue mb-3">501(c)(3) Nonprofit</h3>
                <p className="text-neutral-gray">
                  As a nonprofit organization, we're mission-driven, not profit-driven. Our only goal is helping students succeed.
                </p>
              </div>

              <div className="bg-protected-bg p-8 rounded-lg">
                <div className="w-16 h-16 bg-information-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-vault-blue mb-3">No Ads, No Spam</h3>
                <p className="text-neutral-gray">
                  Our platform is clean and focused. No distracting advertisements or promotional emails cluttering your experience.
                </p>
              </div>

              <div className="bg-protected-bg p-8 rounded-lg">
                <div className="w-16 h-16 bg-trust-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-vault-blue mb-3">Family-First Approach</h3>
                <p className="text-neutral-gray">
                  Built by families, for families. We understand the importance of privacy when it comes to your personal information.
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-privacy-teal text-white font-semibold px-8 py-4 rounded-md hover:bg-opacity-90 transition-all">
                How ScholarTrail Protects Your Data
              </button>
              <button className="bg-white text-privacy-teal border-2 border-privacy-teal font-semibold px-8 py-4 rounded-md hover:bg-gray-50 transition-all">
                Learn more about Data Monetization
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaTabs;