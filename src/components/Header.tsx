import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignUpClick, onLoginClick }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/preview">
              <Logo variant="horizontal" size="sm" className="hover:opacity-90 transition-opacity" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/preview" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-neutral-gray hover:text-privacy-teal font-medium transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className="text-privacy-teal hover:text-opacity-80 font-medium border border-privacy-teal px-4 py-2 rounded-md transition-all hover:bg-privacy-teal hover:bg-opacity-10"
            >
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