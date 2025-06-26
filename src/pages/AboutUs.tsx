import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FounderCard from '../components/FounderCard';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const values = [
    {
      title: 'Privacy First',
      description: 'Your data belongs to you. We never sell or share your personal information.',
      icon: (
        <svg className="w-12 h-12 text-privacy-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Equity & Access',
      description: 'Breaking down barriers to ensure every student has equal opportunity to find funding.',
      icon: (
        <svg className="w-12 h-12 text-privacy-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Transparency',
      description: 'Clear, honest communication about how we operate and protect your information.',
      icon: (
        <svg className="w-12 h-12 text-privacy-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Supporting students, families, and educators in their journey to higher education.',
      icon: (
        <svg className="w-12 h-12 text-privacy-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const founders = [
    {
      name: 'Founder Name 1',
      title: 'Co-Founder & CEO',
      bio: 'Passionate about education equity and data privacy. Former educator with 10+ years of experience helping students navigate the scholarship landscape.',
      image: '/placeholder-founder-1.jpg',
      linkedin: 'https://linkedin.com/in/founder1',
    },
    {
      name: 'Founder Name 2',
      title: 'Co-Founder & CTO',
      bio: 'Privacy advocate and technologist. Built secure systems for Fortune 500 companies before dedicating skills to protecting student data.',
      image: '/placeholder-founder-2.jpg',
      linkedin: 'https://linkedin.com/in/founder2',
    },
    {
      name: 'Founder Name 3',
      title: 'Co-Founder & CPO',
      bio: 'First-generation college graduate who understands the challenges of finding scholarships. Committed to making the process easier for all students.',
      image: '/placeholder-founder-3.jpg',
      linkedin: 'https://linkedin.com/in/founder3',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header 
        onSignUpClick={() => navigate('/preview', { state: { openSignUp: true } })}
        onLoginClick={() => navigate('/preview', { state: { openLogin: true } })}
      />
      
      {/* Hero Section */}
      <section className="bg-protected-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-vault-blue mb-6">
            Empowering Students Without Compromising Privacy
          </h1>
          <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
            ScholarTrail is a nonprofit platform that believes every student deserves access to scholarships 
            without sacrificing their personal data or being bombarded with spam.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-vault-blue mb-8">Our Mission</h2>
            <p className="text-lg text-neutral-gray mb-6">
              ScholarTrail is a mission-driven, privacy-first nonprofit platform that empowers students, 
              families, and educators to unlock higher-education funding without sacrificing personal data.
            </p>
            <p className="text-lg text-neutral-gray mb-6">
              By combining a tailored matching engine with family and teacher collaboration tools, 
              ScholarTrail removes the noise and inequities of today's scholarship landscape while 
              operating under a sustainable 501(c)(3) model.
            </p>
            <p className="text-lg font-semibold text-vault-blue">
              No ads. No spam. No data harvesting. Just scholarships.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-20 bg-protected-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-vault-blue text-center mb-12">
            The Problem We're Solving
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-vault-blue mb-4">The Current Landscape</h3>
              <ul className="space-y-3 text-neutral-gray">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Students' personal data sold to highest bidders</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Endless spam emails and marketing calls</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Complex, confusing application processes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Inequitable access to opportunities</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-vault-blue mb-4">The ScholarTrail Difference</h3>
              <ul className="space-y-3 text-neutral-gray">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Your data stays yours - always</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zero spam - we never share your information</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Streamlined, student-friendly experience</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-verified-green mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Equal access for all students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-vault-blue text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-vault-blue mb-3">{value.title}</h3>
                <p className="text-neutral-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-protected-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-vault-blue text-center mb-12">
            The People Behind ScholarTrail
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-vault-blue mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-neutral-gray mb-8">
            Join thousands of students who are finding scholarships the right way - 
            with privacy, dignity, and respect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/preview', { state: { openLogin: true } })}
              className="bg-privacy-teal text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all"
            >
              Start Your Scholarship Search
            </button>
            <button className="bg-white border-2 border-privacy-teal text-privacy-teal font-semibold px-8 py-3 rounded-md hover:bg-protected-bg transition-all">
              Support Our Mission
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;