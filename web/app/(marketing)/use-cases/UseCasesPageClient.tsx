'use client';

import { useCtaClick } from '@/lib/CtaContext';

export default function UseCasesPageClient() {
  const handleCtaClick = useCtaClick();

  return (
    <section className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 text-white text-center">
      <div className="container-max">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Simplify Your Schedule?
        </h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Join thousands of users who have transformed their calendar management with CAL-MGR
        </p>
        <button 
          onClick={handleCtaClick}
          className="inline-flex btn bg-white text-primary-600 hover:bg-neutral-50 px-8 py-3 font-semibold"
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
