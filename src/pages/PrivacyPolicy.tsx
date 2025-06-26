import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-protected-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vault-blue font-playfair mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: June 26, 2025
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            At ScholarTrail, privacy isn't just a feature—it's our foundation. As a nonprofit organization, 
            we exist solely to help students find scholarship opportunities without compromising their personal data. 
            We will never sell, rent, or share your information with third parties for marketing purposes.
          </p>
          <div className="bg-privacy-teal/10 border-l-4 border-privacy-teal p-4 rounded">
            <p className="text-gray-700 font-medium">
              <span className="text-privacy-teal">🔒 Our Promise:</span> Your data belongs to you. 
              We only use it to match you with relevant scholarships.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Information We Collect
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-vault-blue mb-3">
                1. Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Basic profile information (name, email, date of birth)</li>
                <li>Academic information (GPA, school, field of study)</li>
                <li>Demographic information for scholarship matching (optional)</li>
                <li>Financial information for need-based matching (optional and encrypted)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-vault-blue mb-3">
                2. Information We Don't Collect
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Social Security Numbers (unless required for specific scholarship applications)</li>
                <li>Credit card information (we're a free service)</li>
                <li>Browsing history from other websites</li>
                <li>Third-party tracking cookies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-vault-blue mb-3">
                3. Automatically Collected Information
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Basic usage data to improve our service</li>
                <li>Device type and browser information for compatibility</li>
                <li>IP address for security purposes only</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            How We Use Your Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-verified-green rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="ml-3 text-gray-700">
                <strong>Scholarship Matching:</strong> We use your profile to find relevant scholarship opportunities
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-verified-green rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="ml-3 text-gray-700">
                <strong>Communication:</strong> Send you scholarship alerts and important updates about your applications
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-verified-green rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="ml-3 text-gray-700">
                <strong>Service Improvement:</strong> Analyze anonymous usage patterns to enhance our platform
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-verified-green rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="ml-3 text-gray-700">
                <strong>Security:</strong> Protect against fraud and unauthorized access
              </p>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            How We Protect Your Data
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Encryption</h3>
              <p className="text-gray-700 text-sm">
                All sensitive data is encrypted both in transit and at rest using industry-standard protocols
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Access Control</h3>
              <p className="text-gray-700 text-sm">
                Strict authentication and limited access to personal data on a need-to-know basis
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Regular Audits</h3>
              <p className="text-gray-700 text-sm">
                Security assessments and third-party audits to ensure data protection standards
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Data Minimization</h3>
              <p className="text-gray-700 text-sm">
                We only collect and retain data that's necessary for scholarship matching
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Your Rights and Choices
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="font-semibold">You have complete control over your data:</p>
            
            <div className="ml-4 space-y-3">
              <p>• <strong>Access:</strong> Request a copy of all data we have about you</p>
              <p>• <strong>Correction:</strong> Update or correct any inaccurate information</p>
              <p>• <strong>Deletion:</strong> Request deletion of your account and associated data</p>
              <p>• <strong>Portability:</strong> Export your data in a standard format</p>
              <p>• <strong>Opt-out:</strong> Unsubscribe from non-essential communications</p>
            </div>
            
            <div className="mt-6 p-4 bg-information-blue/10 rounded-lg">
              <p className="text-sm">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@scholartrail.org" className="text-information-blue hover:underline">
                  privacy@scholartrail.org
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            When We Share Information
          </h2>
          
          <p className="text-gray-700 mb-4">
            We only share your information in these limited circumstances:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">With Your Consent</h3>
              <p className="text-gray-700 text-sm mt-1">
                When you apply for a scholarship, we share only the required information with that specific provider
              </p>
            </div>
            
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">Service Providers</h3>
              <p className="text-gray-700 text-sm mt-1">
                Trusted partners who help us operate (e.g., email services) under strict confidentiality agreements
              </p>
            </div>
            
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">Legal Requirements</h3>
              <p className="text-gray-700 text-sm mt-1">
                If required by law or to protect the rights and safety of our users
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800 font-semibold">
              We NEVER sell your data to advertisers, data brokers, or marketing companies.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            ScholarTrail is designed for students 13 and older. For users under 18:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>We encourage parental involvement in the scholarship search process</li>
            <li>Parents can request access to their child's account information</li>
            <li>We don't knowingly collect data from children under 13</li>
          </ul>
        </section>

        {/* Updates */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Policy Updates
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this policy to reflect changes in our practices or legal requirements. 
            We'll notify you of significant changes via email and post updates on this page.
          </p>
          <p className="text-gray-700">
            Your continued use of ScholarTrail after updates means you accept the revised policy.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-6">
            Questions about our privacy practices? We're here to help:
          </p>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              📧 Email:{' '}
              <a href="mailto:privacy@scholartrail.org" className="text-information-blue hover:underline">
                privacy@scholartrail.org
              </a>
            </p>
            <p className="text-gray-700">
              📮 Mail: ScholarTrail Privacy Team<br />
              <span className="ml-10">[Address to be added]</span>
            </p>
            <p className="text-gray-700">
              🔗 General inquiries:{' '}
              <button 
                onClick={() => navigate('/contact')}
                className="text-information-blue hover:underline"
              >
                Contact Us
              </button>
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;