import React from 'react';

interface HeaderProps {
  onSignUpClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignUpClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-serif font-bold text-vault-blue">ScholarTrail</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              About Us
            </a>
            <a href="#" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-privacy-teal hover:text-opacity-80 font-medium border border-privacy-teal px-4 py-2 rounded-md transition-all hover:bg-privacy-teal hover:bg-opacity-10">
              Login
            </button>
            <button 
              onClick={onSignUpClick}
              className="bg-privacy-teal text-white font-medium px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;