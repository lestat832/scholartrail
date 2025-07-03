import React, { useEffect, useState } from 'react';

interface ParentCongratulationsModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

const ParentCongratulationsModal: React.FC<ParentCongratulationsModalProps> = ({ 
  isOpen, 
  onContinue
}) => {
  const [confettiPieces, setConfettiPieces] = useState<Confetti[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti pieces
      const pieces: Confetti[] = [];
      const colors = ['#45818E', '#E85A9B', '#27AE60', '#3498DB', '#F7F9FB'];
      
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * -100 - 10,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5
        });
      }
      
      setConfettiPieces(pieces);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8 overflow-hidden">
          {/* Confetti Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiPieces.map((piece) => (
              <div
                key={piece.id}
                className="absolute w-3 h-3 animate-confetti rounded-sm"
                style={{
                  left: `${piece.x}%`,
                  top: `${piece.y}%`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                  animationDelay: `${piece.delay}s`
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center relative z-10">
            {/* Success Icon */}
            <div className="mx-auto mb-6 w-20 h-20 bg-verified-green rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Header */}
            <h2 className="text-4xl font-serif font-bold text-vault-blue mb-6">
              Congratulations!!!
            </h2>
            
            {/* Copy */}
            <p className="text-lg text-gray-600 mb-8">
              Let's start your child's scholarship search
            </p>

            {/* Continue Button */}
            <button
              onClick={onContinue}
              className="w-full py-3 px-6 bg-privacy-teal text-white rounded-md font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentCongratulationsModal;