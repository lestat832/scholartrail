import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vault-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Brand */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-serif font-bold mb-2">ScholarTrail</h3>
            <p className="text-sm text-gray-300">Privacy-first scholarship search platform</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-300">
            © 2025 ScholarTrail. All rights reserved.
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-verified-green rounded-full"></div>
            <p className="text-sm text-gray-300">
              Your data is safe with us. No ads. No spam. Just scholarships.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;