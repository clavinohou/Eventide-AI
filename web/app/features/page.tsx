import { Metadata } from 'next';
import Features from '@/components/Features';

export const metadata: Metadata = {
  title: 'Features - CAL-MGR | AI-Powered Calendar Management',
  description: 'Discover powerful features of CAL-MGR: multimodal intake, AI extraction, conflict detection, and smart calendar integration.',
  openGraph: {
    title: 'Features - CAL-MGR',
    description: 'Discover powerful features of CAL-MGR: multimodal intake, AI extraction, conflict detection, and smart calendar integration.',
  },
};

export default function FeaturesPage() {
  return (
    <main className="py-20 bg-neutral-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-display-lg text-neutral-900 mb-4">
            Powerful Features for Smart Calendar Management
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            CAL-MGR combines cutting-edge AI with intuitive design to transform how you manage events and schedules
          </p>
        </div>
        
        <Features />
      </div>
    </main>
  );
}