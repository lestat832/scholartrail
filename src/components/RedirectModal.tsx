
interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function RedirectModal({ isOpen, onClose, onContinue }: RedirectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Heads up!</h2>
          <p className="text-gray-600 mb-8">
            We are directing you off ScholarTrail to apply for this scholarship in a new tab/window.
          </p>
          <button
            onClick={onContinue}
            className="bg-info-blue text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}