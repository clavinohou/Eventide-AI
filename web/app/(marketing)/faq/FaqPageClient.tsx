'use client';

import { useCtaClick } from '@/lib/CtaContext';

export default function FaqPageClient() {
  const handleCtaClick = useCtaClick();

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-primary-50">
      <div className="container-max text-center">
        <h2 className="text-display-md mb-4 text-neutral-900">
          Ready to Transform Your Calendar?
        </h2>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join our beta community and experience the future of calendar management.
        </p>
        <button
          onClick={handleCtaClick}
          className="btn btn-primary px-8 py-4 text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
        >
          Get Started Free
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
