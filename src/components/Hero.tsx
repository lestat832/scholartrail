import React from 'react';

interface HeroProps {
  onLoginClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
  return (
    <section className="bg-protected-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-vault-blue leading-tight mb-6">
              Find scholarships without selling your soul—or your data.
            </h1>
            <p className="text-lg text-neutral-gray mb-8">
              ScholarTrail is the only platform that puts students and families first. 
              No ads. No spam. Just scholarships.
            </p>
            <button 
              onClick={onLoginClick}
              className="bg-privacy-teal text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all text-lg"
            >
              Search for Scholarships
            </button>
          </div>

          {/* Illustration Placeholder */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-full h-64 bg-protected-bg rounded-md flex items-center justify-center">
                <p className="text-neutral-gray">Parent and Student Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;