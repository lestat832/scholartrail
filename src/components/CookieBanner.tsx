import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setCookieConsent } from '../utils/cookieConsent';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // TODO: For testing - always show banner. Remove this before production
    // const shouldShow = shouldShowBanner();
    // if (shouldShow) {
    setShowBanner(true);
    // Delay for animation
    setTimeout(() => setIsVisible(true), 100);
    // }
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700 space-y-2 text-center sm:text-left">
            <p>
              We use cookies to provide you with an awesome experience and for us to understand if you actually like our site.
            </p>
            <p>
              We do not sell or share your personal information for marketing purposes, but we're still required to give you access to this form:{' '}
              <Link to="/do-not-sell" className="text-privacy-teal hover:underline font-medium">
                Do Not Sell or Share My Info
              </Link>.
            </p>
            <p>
              Wanna learn more about how we protect you and your data:{' '}
              <Link to="/privacy" className="text-privacy-teal hover:underline font-medium">
                Privacy Policy link
              </Link>.
            </p>
          </div>
          
          <div className="shrink-0">
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-colors"
            >
              Cool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;