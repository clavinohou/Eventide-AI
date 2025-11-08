import { Metadata } from 'next';
import FaqPageClient from './FaqPageClient';

export const metadata: Metadata = {
  title: 'FAQ - Eventide AI | Common Questions',
  description: 'Get answers to frequently asked questions about Eventide AI, including AI accuracy, security, calendar integrations, and more.',
  openGraph: {
    title: 'FAQ - Eventide AI',
    description: 'Get answers to frequently asked questions about Eventide AI, including AI accuracy, security, calendar integrations, and more.',
  },
};

export default function FAQPage() {
  const faqs = [
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
    {
      question: 'Can I capture events from any source?',
      answer: 'Yes! Eventide AI supports photos of flyers, PDF files, website links, and plain text. Our AI can extract event information from virtually any format.',
    },
    {
      question: 'How does conflict detection work?',
      answer: 'Before adding any event to your calendar, Eventide AI checks for scheduling conflicts with existing events. You&apos;ll get a clear warning if there are any overlaps, allowing you to resolve them before saving.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Eventide AI is available as a mobile app for both iOS and Android, making it easy to capture events on the go using your phone&apos;s camera.',
    },
    {
      question: 'How much does Eventide AI cost?',
      answer: 'We&apos;re currently in beta testing with a free tier for early users. After the beta, we&apos;ll offer both free and premium plans based on your usage needs.',
    },
    {
      question: 'Can I use Eventide AI for business events?',
      answer: 'Absolutely! Eventide AI works great for both personal and business events. Our AI can handle professional conferences, meetings, and corporate events just as well as social gatherings.',
    },
    {
      question: 'What languages does Eventide AI support?',
      answer: 'Our AI can process events in over 30 languages, making Eventide AI perfect for international events and multilingual environments.',
    },
  ];

  return (
    <>
      <main className="py-20 bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h1 className="text-display-lg text-neutral-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about Eventide AI
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="text-heading-sm text-neutral-900 mb-2">{faq.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-neutral-600 mb-6">
              Still have questions? We&apos;re here to help.
            </p>
            <a 
              href="mailto:support@eventide-ai.com" 
              className="btn btn-primary"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <FaqPageClient />
    </>
  );
}
