import React from 'react';

interface HeroProps {
  onLoginClick: () => void;
  onConnectWithParent?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick, onConnectWithParent }) => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="heading-hero mb-6">
              Find scholarships without selling your soul—or your data.
            </h1>
            <p className="text-body text-lg mb-8">
              ScholarTrail is the only platform that puts students and families first. 
              No ads. No spam. Just scholarships.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onLoginClick}
                className="btn-primary text-lg px-8 py-4"
              >
                Search for Scholarships
              </button>
              {onConnectWithParent && (
                <button 
                  onClick={onConnectWithParent}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Connect with Parent
                </button>
              )}
            </div>
          </div>

          {/* Illustration Placeholder */}
          <div className="flex-1">
            <div className="card card-feature">
              <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500">Parent and Student Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;