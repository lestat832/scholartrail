import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';

interface InvitationData {
  childEmail: string;
  childFirstName: string;
  parentName: string;
  parentId: string;
  childId: string;
  profileData: any;
  scholarshipStats: {
    count: number;
    totalAmount: number;
  };
}

const InvitationAcceptancePage: React.FC = () => {
  const { invitationToken } = useParams<{ invitationToken: string }>();
  const navigate = useNavigate();
  
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (invitationToken) {
      try {
        // Decode the token
        const decodedData = JSON.parse(atob(invitationToken));
        
        // In a real app, you would validate the token and fetch additional data from API
        // For demo, we'll use the decoded data and add mock details
        const mockData: InvitationData = {
          childEmail: `${decodedData.childName.toLowerCase().replace(/\s/g, '')}@example.com`,
          childFirstName: decodedData.childName,
          parentName: decodedData.parentName,
          parentId: decodedData.parentId,
          childId: decodedData.childId,
          profileData: {
            // This would come from the parent's setup
            birthday: '2008-05-15',
            gradeLevel: '10th Grade',
            gpa: '3.8'
          },
          scholarshipStats: {
            count: 47,
            totalAmount: 125000
          }
        };
        
        setInvitationData(mockData);
        setFirstName(mockData.childFirstName);
      } catch (err) {
        console.error('Error decoding token:', err);
        setError('Invalid invitation link');
      }
    }
    setLoading(false);
  }, [invitationToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate account creation
    setTimeout(() => {
      // In real app, create account with API
      // Store user data and parent connection
      localStorage.setItem('userProfile', JSON.stringify({
        firstName,
        email: invitationData?.childEmail,
        ...invitationData?.profileData
      }));
      
      localStorage.setItem('parentConnection', JSON.stringify({
        parentId: invitationData?.parentId,
        parentName: invitationData?.parentName
      }));
      
      // Navigate to dashboard with parent connection
      navigate('/dashboard', {
        state: {
          firstName,
          isFromInvitation: true,
          parentConnection: {
            parentId: invitationData?.parentId,
            childId: invitationData?.childId,
            parentName: invitationData?.parentName
          }
        }
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-privacy-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error && !invitationData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/preview"
            className="inline-block px-6 py-3 bg-privacy-teal text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Sign Up Instead
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Logo variant="horizontal" size={100} />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-privacy-teal to-info-blue rounded-t-lg p-8 text-white text-center">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Hi {invitationData?.childFirstName}! 👋
            </h1>
            <p className="text-xl opacity-90">
              Your parent <span className="font-semibold">{invitationData?.parentName}</span> has set up a ScholarTrail account to help you find scholarships
            </p>
          </div>

          {/* Value Preview */}
          <div className="p-8 border-b">
            <h2 className="text-xl font-semibold text-vault-blue mb-4 text-center">
              What's waiting for you:
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-info-blue bg-opacity-10 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-vault-blue">
                  {invitationData?.scholarshipStats.count}
                </div>
                <div className="text-gray-600">Scholarship Matches</div>
              </div>
              <div className="bg-verified-green bg-opacity-10 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-vault-blue">
                  ${invitationData?.scholarshipStats.totalAmount.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Value</div>
              </div>
            </div>
            <p className="text-center text-gray-600">
              Your parent has already added your profile information to get you started!
            </p>
          </div>

          {/* Account Creation Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-xl font-semibold text-vault-blue mb-6">
              Create your account to get started
            </h2>

            {/* Email (Read-only) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={invitationData?.childEmail}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
                <div className="absolute right-3 top-2.5 flex items-center text-verified-green">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm ml-1">Verified</span>
                </div>
              </div>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-privacy-teal focus:border-privacy-teal pr-10"
                  placeholder="At least 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>


            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-privacy-teal mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">You control your privacy</p>
                  <p className="text-sm text-gray-600 mt-1">
                    You can choose what information to share with your parent through privacy controls in your account settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 mr-3 h-4 w-4 text-privacy-teal focus:ring-privacy-teal border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-privacy-teal hover:text-opacity-80 underline">
                    Terms of Use
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-privacy-teal hover:text-opacity-80 underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-md font-semibold transition-all ${
                submitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-trust-pink text-white hover:bg-opacity-90'
              }`}
            >
              {submitting ? 'Creating Account...' : 'Create Account & View Scholarships'}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/preview" className="text-privacy-teal hover:text-opacity-80">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvitationAcceptancePage;