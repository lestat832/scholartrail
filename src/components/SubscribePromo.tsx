import React from 'react';

interface SubscribePromoProps {
  onFinishChildProfile: () => void;
}

const SubscribePromo: React.FC<SubscribePromoProps> = ({ onFinishChildProfile }) => {
  return (
    <div className="bg-trust-pink bg-opacity-10 border-2 border-trust-pink rounded-lg p-8 text-center">
      <h3 className="text-2xl font-serif font-bold text-vault-blue mb-4">
        Unlock Your Full Potential! 🚀
      </h3>
      <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
        Finish your child's profile so you can access their matches and maximize their funding opportunities.
      </p>
      <button
        onClick={onFinishChildProfile}
        className="px-8 py-3 bg-trust-pink text-white rounded-md font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all"
      >
        Finish Child Profile
      </button>
    </div>
  );
};

export default SubscribePromo;