import { Metadata } from 'next';
import Features from '@/components/Features';
import FeaturesPageClient from './FeaturesPageClient';

export const metadata: Metadata = {
  title: 'Features - Eventide AI | AI-Powered Calendar Management',
  description: 'Discover powerful features of Eventide AI: multimodal intake, AI extraction, conflict detection, and smart calendar integration.',
  openGraph: {
    title: 'Features - Eventide AI',
    description: 'Discover powerful features of Eventide AI: multimodal intake, AI extraction, conflict detection, and smart calendar integration.',
  },
};

export default function FeaturesPage() {

  return (
    <>
      <main className="py-20 bg-neutral-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h1 className="text-display-lg text-neutral-900 mb-4">
              Powerful Features for Smart Calendar Management
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Eventide AI combines cutting-edge AI with intuitive design to transform how you manage events and schedules
            </p>
          </div>
          
          <Features />
        </div>
      </main>

      {/* CTA Section */}
      <FeaturesPageClient />
    </>
  );
}
