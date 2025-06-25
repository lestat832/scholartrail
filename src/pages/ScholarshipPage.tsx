import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Scholarship {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  deadline: string;
  amount: string;
  matchStrength: number;
}

// Mock data - in a real app, this would come from an API
const scholarshipsData: { [key: string]: Scholarship } = {
  'merit-excellence-scholarship': {
    id: '1',
    name: 'Merit Excellence Scholarship',
    description: 'Awarded to high-achieving students demonstrating exceptional academic performance and leadership.',
    fullDescription: `The Merit Excellence Scholarship is a prestigious award designed to recognize and support outstanding students who have demonstrated exceptional academic achievement and leadership potential. This scholarship aims to provide financial assistance to deserving students who have shown dedication to their studies and have made significant contributions to their communities.

Eligibility Requirements:
• Minimum GPA of 3.5 or higher
• Demonstrated leadership in school or community activities
• Strong letters of recommendation from teachers or mentors
• Essay submission on personal achievements and future goals

The scholarship committee looks for students who not only excel academically but also show promise as future leaders in their chosen fields. Recipients of this scholarship have gone on to attend top universities and have made significant impacts in various professional fields.

Application Process:
1. Complete the online application form
2. Submit official transcripts
3. Provide two letters of recommendation
4. Write a 500-word essay on your achievements and aspirations
5. Optional: Include a portfolio of relevant work or achievements

This scholarship is renewable for up to four years, provided recipients maintain a minimum GPA of 3.0 and continue to demonstrate leadership qualities.`,
    deadline: 'March 15, 2025',
    amount: '$10,000',
    matchStrength: 5
  },
  'stem-innovation-grant': {
    id: '2',
    name: 'STEM Innovation Grant',
    description: 'Supporting students pursuing degrees in Science, Technology, Engineering, or Mathematics fields.',
    fullDescription: `The STEM Innovation Grant is dedicated to supporting the next generation of scientists, technologists, engineers, and mathematicians. This grant recognizes the critical importance of STEM education in driving innovation and solving global challenges.

Eligibility Requirements:
• Enrolled or planning to enroll in a STEM degree program
• Demonstrated interest and achievement in STEM subjects
• Participation in STEM-related extracurricular activities
• Commitment to pursuing a career in a STEM field

The grant provides not only financial support but also access to mentorship programs, internship opportunities, and networking events with industry professionals.

Special Consideration:
Priority is given to students from underrepresented groups in STEM fields, including women, minorities, and first-generation college students.

Application Components:
• Academic transcripts showing strong performance in math and science
• Personal statement explaining your passion for STEM
• Description of any STEM projects or research you've conducted
• Letters of recommendation from STEM teachers or mentors

Recipients of this grant have access to exclusive summer research programs and are encouraged to present their work at student conferences.`,
    deadline: 'April 1, 2025',
    amount: '$15,000',
    matchStrength: 4
  },
  'community-leadership-award': {
    id: '3',
    name: 'Community Leadership Award',
    description: 'For students who have made significant contributions to their local communities through volunteer work.',
    fullDescription: `The Community Leadership Award celebrates students who have demonstrated exceptional commitment to serving their communities. This award recognizes that true leadership is shown through service to others and making a positive impact on society.

Eligibility Requirements:
• Minimum of 100 hours of documented community service
• Leadership role in at least one community organization
• Demonstrated positive impact on the community
• Plans to continue community involvement in college

We believe that students who are actively engaged in their communities develop valuable skills that will serve them well in their academic and professional careers.

Types of Service Recognized:
• Volunteer work with nonprofit organizations
• Organizing community events or fundraisers
• Mentoring younger students
• Environmental conservation efforts
• Social justice initiatives

Application Requirements:
1. Detailed log of community service hours
2. Letter of verification from organization supervisors
3. Essay describing your most impactful community project
4. Plan for continuing community service in college
5. Two references from community leaders

This award can be combined with other scholarships and is renewable based on continued community involvement.`,
    deadline: 'February 28, 2025',
    amount: '$5,000',
    matchStrength: 4
  }
};

const ScholarshipPage: React.FC = () => {
  const { scholarshipSlug } = useParams<{ scholarshipSlug: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = React.useState(false);

  // Get scholarship data based on URL slug
  const scholarship = scholarshipSlug ? scholarshipsData[scholarshipSlug] : null;

  if (!scholarship) {
    // Redirect to dashboard if scholarship not found
    navigate('/dashboard');
    return null;
  }

  const renderMatchStrength = (strength: number) => {
    return (
      <div className="flex flex-col items-center justify-center w-32 h-32">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-3 ${
                level <= 2 ? 'h-8' : level <= 4 ? 'h-12' : 'h-16'
              } ${
                level <= strength ? 'bg-privacy-teal' : 'bg-gray-200'
              } rounded-t`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-protected-bg">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="w-24 h-8 bg-gray-300 rounded" /> {/* Logo placeholder */}
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-900 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a>
              </nav>
            </div>
            <div className="w-10 h-10 bg-gray-400 rounded-full" /> {/* Profile placeholder */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-info-blue hover:underline"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Scholarship Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Header with centered content */}
          <div className="flex flex-col items-center mb-8">
            {renderMatchStrength(scholarship.matchStrength)}
            <h1 className="text-3xl font-serif font-bold text-vault-blue mt-4 text-center">
              {scholarship.name}
            </h1>
          </div>

          {/* Action Buttons - Top */}
          <div className="flex justify-center space-x-4 mb-8">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`px-8 py-2.5 border rounded-md transition-all font-medium flex items-center ${
                isSaved 
                  ? 'bg-verified-green text-white border-verified-green hover:bg-opacity-90' 
                  : 'text-info-blue border-info-blue hover:bg-info-blue hover:text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Saved
                </>
              ) : (
                'Save'
              )}
            </button>
            <button className="px-8 py-3 bg-info-blue text-white rounded-md hover:bg-opacity-90 font-medium transform hover:scale-105 transition-all">
              Apply Now
            </button>
          </div>

          {/* Key Information Card */}
          <div className="bg-protected-bg rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Award Amount</h3>
                <p className="text-2xl text-privacy-teal font-bold">{scholarship.amount}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Application Deadline</h3>
                <p className="text-lg text-vault-blue font-medium">{scholarship.deadline}</p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="max-w-4xl mx-auto">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed text-base">
              {scholarship.fullDescription}
            </div>
          </div>

          {/* Action Buttons - Bottom */}
          <div className="flex justify-center space-x-4 mt-8 pt-8 border-t border-gray-200">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`px-8 py-2.5 border rounded-md transition-all font-medium flex items-center ${
                isSaved 
                  ? 'bg-verified-green text-white border-verified-green hover:bg-opacity-90' 
                  : 'text-info-blue border-info-blue hover:bg-info-blue hover:text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Saved
                </>
              ) : (
                'Save'
              )}
            </button>
            <button className="px-8 py-3 bg-info-blue text-white rounded-md hover:bg-opacity-90 font-medium transform hover:scale-105 transition-all">
              Apply Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 ScholarTrail. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScholarshipPage;