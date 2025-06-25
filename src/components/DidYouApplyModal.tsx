import React from 'react';

interface DidYouApplyModalProps {
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
  scholarshipName: string;
}

export default function DidYouApplyModal({ isOpen, onYes, onNo, scholarshipName }: DidYouApplyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-vault-blue mb-4">Did you apply?</h2>
          <p className="text-neutral-gray mb-8">
            Did you successfully apply for the {scholarshipName}?
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={onNo}
              className="bg-white border-2 border-neutral-gray text-neutral-gray px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Not yet
            </button>
            <button
              onClick={onYes}
              className="bg-verified-green text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
            >
              Yes, I applied!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}