'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarketingLayout from '@/components/MarketingLayout';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
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

      {/* Cross-links to dedicated pages */}
      <Section id="explore" background="neutral-50">
        <div className="text-center">
          <h2 className="text-display-md text-neutral-900 mb-4">
            Explore CAL-MGR
          </h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
            Dive deeper into how CAL-MGR transforms your calendar management
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/features"
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Features</h3>
              <p className="text-neutral-600">Discover powerful capabilities that make calendar management effortless</p>
            </Link>

            <Link 
              href="/how-it-works"
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">How It Works</h3>
              <p className="text-neutral-600">See the AI-powered workflow that saves you hours each week</p>
            </Link>

            <Link 
              href="/faq"
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">FAQ</h3>
              <p className="text-neutral-600">Get answers to common questions about CAL-MGR</p>
            </Link>

            <Link 
              href="/use-cases"
              className="p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Use Cases</h3>
              <p className="text-neutral-600">Real-world scenarios where CAL-MGR makes a difference</p>
            </Link>
          </div>
        </div>
      </Section>

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