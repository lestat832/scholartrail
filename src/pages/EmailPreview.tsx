import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const EmailPreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get('parentId') || '1';
  const childId = searchParams.get('childId') || '1';
  const childName = searchParams.get('childName') || 'Student';
  const parentName = searchParams.get('parentName') || 'Your Parent';

  // Generate a unique invitation token
  const invitationToken = btoa(JSON.stringify({
    parentId,
    childId,
    childName,
    parentName,
    timestamp: Date.now()
  }));
  
  const invitationLink = `/invitation/${invitationToken}`;
  
  console.log('EmailPreview - Creating invitation link:', {
    parentId,
    childId,
    childName,
    invitationLink
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Email Client Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">ScholarTrail Mail (Test)</h1>
          <Link to="/preview" className="text-sm hover:underline">
            ← Back to Site
          </Link>
        </div>
      </div>

      {/* Email Container */}
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Email Header */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">From:</span>
              <span className="text-gray-800">parent@scholartrail.com</span>
              <span className="text-gray-500">({parentName})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">To:</span>
              <span className="text-gray-800">{childName.toLowerCase()}@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">Subject:</span>
              <span className="text-gray-800">Join me on ScholarTrail - Scholarship Opportunities for {childName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-600">Date:</span>
              <span className="text-gray-800">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">Hi {childName},</p>
            
            <p className="text-gray-700 mb-4">
              I've created a profile for you on ScholarTrail to help you find scholarship opportunities!
            </p>
            
            <p className="text-gray-700 mb-4">
              ScholarTrail is a privacy-first platform that matches students with scholarships without selling your data.
            </p>
            
            <p className="text-gray-700 mb-6">
              Visit ScholarTrail.com to create your account and connect with me. You'll have full control over your profile and can choose what information to share.
            </p>

            {/* CTA Button */}
            <div className="my-8 text-center">
              <Link 
                to={invitationLink}
                className="inline-block bg-privacy-teal text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all"
              >
                Accept Invitation & Create Account
              </Link>
            </div>

            <p className="text-gray-700 mb-4">
              Or click this link: {' '}
              <Link to={invitationLink} className="text-info-blue hover:underline break-all">
                {window.location.origin}{invitationLink}
              </Link>
            </p>
            
            <p className="text-gray-700 mb-4">
              Let's work together to find great scholarship opportunities!
            </p>
            
            <p className="text-gray-700">
              Best,<br />
              {parentName}
            </p>
          </div>

          {/* Email Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              This is a test email preview for ScholarTrail. In production, this would be sent to the student's actual email address.
            </p>
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="max-w-4xl mx-auto mt-4 mb-8 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 font-mono">
          Debug: parentId={parentId}, childId={childId}, childName={childName}
        </p>
      </div>
    </div>
  );
};

export default EmailPreview;