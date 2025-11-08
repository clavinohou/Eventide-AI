'use client';

import { useState } from 'react';
import MarketingLayout from '@/components/MarketingLayout';
import Hero from '@/components/Hero';
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
      <section id="problem" className="py-20 bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-md mb-6 text-neutral-900">
              Managing Your Calendar Shouldn&apos;t Be This Hard
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Tired of manually typing event details? Frustrated with copy-pasting from flyers, emails, and websites? 
              Missing important events because calendar entry feels like a chore?
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '⏰', title: 'Time-Consuming', description: 'Manual entry takes minutes per event' },
                { icon: '❌', title: 'Error-Prone', description: 'Typos and wrong timezones are common' },
                { icon: '😓', title: 'Tedious', description: 'Switching between apps and tabs' },
              ].map((problem, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-4xl mb-3">{problem.icon}</div>
                  <h3 className="text-heading-sm text-neutral-900 mb-2">{problem.title}</h3>
                  <p className="text-sm text-neutral-600">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-display-md mb-6 text-neutral-900">
              One Snap. Zero Hassle.
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed">
              CAL-MGR uses advanced AI to instantly extract event details from any source—photos, links, or text. 
              No typing. No errors. Just verified events in your calendar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: '📸',
                  title: 'Snap a Photo',
                  description: 'Take a picture of any event flyer, poster, or screen. Our AI reads everything.',
                },
                {
                  icon: '🔗',
                  title: 'Share a Link',
                  description: 'Paste any URL and we\'ll fetch and parse the event details automatically.',
                },
                {
                  icon: '💬',
                  title: 'Type or Speak',
                  description: 'Just describe the event naturally. "Dinner with John next Friday at 7pm."',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <div className="text-3xl shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-heading-sm text-neutral-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <p className="text-lg font-semibold text-neutral-900">AI Magic Happens Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-display-md text-center mb-4 text-neutral-900">
            Powerful Features
          </h2>
          <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto text-lg">
            Everything you need for intelligent calendar management
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📸',
                title: 'Smart Image Recognition',
                description: 'Upload event flyers and our AI instantly extracts all details—title, date, time, and location.',
              },
              {
                icon: '🔗',
                title: 'URL Expansion',
                description: 'Paste a shortened link and we fetch event information from the target webpage automatically.',
              },
              {
                icon: '✅',
                title: 'Conflict Detection',
                description: 'Before saving, we check your Google Calendar for overlapping events and notify you.',
              },
              {
                icon: '🗺️',
                title: 'Location Intelligence',
                description: 'Verify venue addresses and automatically calculate travel time to other events.',
              },
              {
                icon: '🌍',
                title: 'Timezone Handling',
                description: 'Events from different regions? We handle timezone conversion automatically.',
              },
              {
                icon: '📱',
                title: 'Mobile-First Design',
                description: 'Fully native mobile app for iOS and Android with offline support.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-heading-sm mb-2 text-neutral-900">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-neutral-50">
        <div className="container-max">
          <h2 className="text-display-md text-center mb-4 text-neutral-900">
            How It Works
          </h2>
          <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto text-lg">
            Simple, fast, and intelligent
          </p>

          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: '1',
                title: 'Share',
                description: 'Capture an image, paste a link, or type event details',
              },
              {
                step: '2',
                title: 'Extract',
                description: 'AI analyzes the content and pulls event information',
              },
              {
                step: '3',
                title: 'Review',
                description: 'Verify details and check for calendar conflicts',
              },
              {
                step: '4',
                title: 'Save',
                description: 'One tap to add the event to your Google Calendar',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-heading-sm text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
