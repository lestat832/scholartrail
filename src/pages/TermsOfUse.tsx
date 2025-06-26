import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfUse: React.FC = () => {
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
            Terms of Use
          </h1>
          <p className="text-lg text-gray-600">
            Effective Date: June 26, 2025
          </p>
        </div>

        {/* Agreement */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Agreement to Terms
          </h2>
          <p className="text-gray-700 mb-4">
            Welcome to ScholarTrail! By accessing or using our platform, you agree to be bound by these 
            Terms of Use. If you disagree with any part of these terms, please do not use our services.
          </p>
          <p className="text-gray-700">
            ScholarTrail is operated by ScholarTrail, Inc., a 501(c)(3) nonprofit organization dedicated 
            to making scholarship opportunities accessible to all students while protecting their privacy.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Eligibility
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>To use ScholarTrail, you must:</p>
            
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Be at least 13 years old</li>
              <li>Be a student, parent/guardian of a student, educator, or scholarship provider</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service for legitimate educational purposes</li>
            </ul>
            
            <div className="mt-4 p-4 bg-information-blue/10 rounded-lg">
              <p className="text-sm">
                <strong>Note for Users Under 18:</strong> We encourage you to review these terms with 
                a parent or guardian before using ScholarTrail.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Our Services
          </h2>
          
          <p className="text-gray-700 mb-4">ScholarTrail provides:</p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">Free Basic Service</h3>
              <p className="text-gray-700 text-sm mt-1">
                Access to scholarship search, basic matching, and application tracking at no cost
              </p>
            </div>
            
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">Premium Features (Optional)</h3>
              <p className="text-gray-700 text-sm mt-1">
                Advanced matching algorithms, priority notifications, and additional support tools
              </p>
            </div>
            
            <div className="border-l-4 border-privacy-teal pl-4">
              <h3 className="font-semibold text-vault-blue">Educational Resources</h3>
              <p className="text-gray-700 text-sm mt-1">
                Guides, tips, and tools to help with scholarship applications
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 mt-6">
            We strive to maintain accurate scholarship information, but cannot guarantee the availability 
            or terms of third-party scholarships.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Your Responsibilities
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-vault-blue mb-3">
                Acceptable Use
              </h3>
              <p className="text-gray-700 mb-2">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide truthful, accurate information</li>
                <li>Use ScholarTrail only for legitimate scholarship searches</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Keep your login credentials secure</li>
                <li>Notify us of any unauthorized account use</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-vault-blue mb-3">
                Prohibited Activities
              </h3>
              <p className="text-gray-700 mb-2">You may not:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Create false or misleading profiles</li>
                <li>Attempt to access other users' accounts</li>
                <li>Use automated systems to scrape or collect data</li>
                <li>Interfere with the platform's operation</li>
                <li>Use the service for any illegal purpose</li>
                <li>Harass, spam, or abuse other users</li>
                <li>Circumvent security measures</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800 text-sm">
              <strong>Violation of these terms may result in immediate account termination.</strong>
            </p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Intellectual Property
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-vault-blue mb-2">Our Content</h3>
              <p>
                All ScholarTrail content, including text, graphics, logos, and software, is protected by 
                copyright and other intellectual property laws. You may not reproduce, modify, or distribute 
                our content without written permission.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-vault-blue mb-2">Your Content</h3>
              <p>
                You retain ownership of the information you provide. By using ScholarTrail, you grant us 
                a limited license to use your information solely to provide our services and match you 
                with scholarships.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-vault-blue mb-2">Third-Party Content</h3>
              <p>
                Scholarship descriptions and requirements are provided by third parties. We don't endorse 
                or guarantee the accuracy of this information.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Your privacy is fundamental to our mission. Our use of your information is governed by our{' '}
            <button 
              onClick={() => navigate('/privacy')}
              className="text-information-blue hover:underline font-semibold"
            >
              Privacy Policy
            </button>
            , which is incorporated into these Terms of Use.
          </p>
          <div className="bg-privacy-teal/10 border-l-4 border-privacy-teal p-4 rounded">
            <p className="text-gray-700">
              <span className="font-semibold">Remember:</span> We never sell your data. Period.
            </p>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Disclaimers and Limitations
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">No Guarantee of Scholarships</h3>
              <p className="text-sm">
                While we work hard to match you with opportunities, we cannot guarantee you'll receive 
                any scholarships. Award decisions are made by individual scholarship providers.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Information Accuracy</h3>
              <p className="text-sm">
                We strive for accuracy but cannot guarantee that all scholarship information is current 
                or complete. Always verify details with the scholarship provider.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Service Availability</h3>
              <p className="text-sm">
                We aim for 24/7 availability but cannot guarantee uninterrupted service. We may need 
                to perform maintenance or updates.
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-vault-blue mb-2">Limitation of Liability</h3>
              <p className="text-sm">
                To the maximum extent permitted by law, ScholarTrail is not liable for any indirect, 
                incidental, or consequential damages arising from your use of our service.
              </p>
            </div>
          </div>
        </section>

        {/* Account Termination */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Account Termination
          </h2>
          <p className="text-gray-700 mb-4">
            We may suspend or terminate accounts that violate these terms. You may also delete your 
            account at any time through your account settings or by contacting us.
          </p>
          <p className="text-gray-700">
            Upon termination, your right to use ScholarTrail ceases immediately. We'll handle your 
            data according to our Privacy Policy.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Governing Law
          </h2>
          <p className="text-gray-700">
            These Terms are governed by the laws of [State], without regard to conflict of law principles. 
            Any disputes shall be resolved in the courts of [County, State].
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 mb-4">
            We may update these terms to reflect changes in our services or legal requirements. 
            We'll notify you of significant changes via email or platform notification.
          </p>
          <p className="text-gray-700">
            Continued use after changes means you accept the new terms. If you disagree with changes, 
            please stop using ScholarTrail and contact us about closing your account.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-vault-blue font-playfair mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-6">
            Questions about these Terms of Use? We're here to help:
          </p>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              📧 Email:{' '}
              <a href="mailto:legal@scholartrail.org" className="text-information-blue hover:underline">
                legal@scholartrail.org
              </a>
            </p>
            <p className="text-gray-700">
              📮 Mail: ScholarTrail Legal Team<br />
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
          
          <div className="mt-6 p-4 bg-verified-green/10 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Thank you for choosing ScholarTrail!</strong> We're honored to be part of your 
              educational journey and committed to protecting your privacy every step of the way.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;