import { Metadata } from 'next';
import HowItWorks from '@/components/HowItWorks';

export const metadata: Metadata = {
  title: 'How It Works - CAL-MGR | AI Calendar Automation',
  description: 'Learn how CAL-MGR uses AI to extract events from flyers, websites, and text, then automatically adds them to your calendar.',
  openGraph: {
    title: 'How It Works - CAL-MGR',
    description: 'Learn how CAL-MGR uses AI to extract events from flyers, websites, and text, then automatically adds them to your calendar.',
  },
};

export default function HowItWorksPage() {
  return (
    <main className="py-20 bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-display-lg text-neutral-900 mb-4">
            How CAL-MGR Works
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From capturing event information to syncing with your calendar, see how our AI-powered workflow saves you time
          </p>
        </div>
        
        <HowItWorks />
      </div>
    </main>
  );
}