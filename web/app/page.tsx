'use client';

import { useState } from 'react';
import MarketingLayout from '@/components/MarketingLayout';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SignupModal from '@/components/SignupModal';

export default function Home() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleSignupClick = () => {
    setSignupModalOpen(true);
  };

  const handleDemoClick = () => {
    console.log('Demo video would play here');
  };

  return (
    <MarketingLayout onCtaClick={handleSignupClick}>
      {/* Hero Section */}
      <Hero onSignupClick={handleSignupClick} onDemoClick={handleDemoClick} />

      {/* Problem Section */}
      <Section id="problem" background="white">
        <Problem />
      </Section>

      {/* Solution Section */}
      <Section id="solution" background="gradient-primary">
        <Solution />
      </Section>

      {/* Features Section */}
      <Section id="features" background="neutral-50">
        <Features />
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" background="white">
        <HowItWorks />
      </Section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-display-md text-center mb-4 text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto text-lg">
            Everything you need to know about CAL-MGR
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How accurate is the AI extraction?',
                answer: 'Our AI achieves over 95% accuracy in extracting event details from flyers, websites, and text. We use advanced natural language processing and computer vision models trained on millions of events.',
              },
              {
                question: 'Is my calendar data secure?',
                answer: 'Absolutely. We use OAuth 2.0 for Google Calendar integration and never store your calendar data on our servers. All processing happens securely, and we follow industry-standard security practices.',
              },
              {
                question: 'What if the AI makes a mistake?',
                answer: 'You always review and can edit event details before saving to your calendar. Our conflict detection also alerts you to any scheduling issues.',
              },
              {
                question: 'Which calendar services do you support?',
                answer: 'Currently, we support Google Calendar. Support for Outlook, Apple Calendar, and other services is coming soon.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="text-heading-sm text-neutral-900 mb-2">{faq.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-max text-center">
          <h2 className="text-display-md mb-4 text-neutral-900">
            Ready to Transform Your Calendar?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of users who are already managing their calendars smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleSignupClick}
              className="btn btn-primary px-8 py-4 text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
            >
              Join Beta Waitlist
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={handleDemoClick}
              className="btn btn-outline px-8 py-4 text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal isOpen={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
    </MarketingLayout>
  );
}
