import React, { useState } from 'react';

const PersonaTabs: React.FC = () => {
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
            <button className="bg-privacy-teal text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all">
              Search for Scholarships
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaTabs;