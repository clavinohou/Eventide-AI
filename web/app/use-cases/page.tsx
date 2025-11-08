import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases - CAL-MGR | Real-World Applications',
  description: 'Explore real-world scenarios where CAL-MGR saves time and reduces stress in event management for professionals, students, and families.',
  openGraph: {
    title: 'Use Cases - CAL-MGR',
    description: 'Explore real-world scenarios where CAL-MGR saves time and reduces stress in event management for professionals, students, and families.',
  },
};

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'Busy Professionals',
      description: 'Never miss important meetings or industry events',
      scenarios: [
        'Capture conference schedules from event websites',
        'Add networking events from flyers and emails',
        'Sync team meetings from shared documents',
        'Import client appointments from various sources',
      ],
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      accent: 'from-primary-500 to-secondary-500',
    },
    {
      title: 'Students & Academics',
      description: 'Stay on top of classes, assignments, and campus events',
      scenarios: [
        'Import class schedules from PDF timetables',
        'Add assignment deadlines from course syllabi',
        'Capture campus events from bulletin boards',
        'Sync study group meetings from group chats',
      ],
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      accent: 'from-secondary-500 to-purple-500',
    },
    {
      title: 'Event Planners',
      description: 'Coordinate multiple events without the administrative headache',
      scenarios: [
        'Import vendor schedules from contracts',
        'Add venue booking confirmations',
        'Capture client meetings from emails',
        'Sync team availability for event coordination',
      ],
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      accent: 'from-accent-500 to-orange-600',
    },
    {
      title: 'Families',
      description: 'Keep everyone&apos;s schedules organized and in sync',
      scenarios: [
        'Add school events from newsletters',
        'Capture sports practice schedules',
        'Import doctor appointments from reminder cards',
        'Sync family gatherings from invitation texts',
      ],
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      accent: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <main className="py-20 bg-neutral-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h1 className="text-display-lg text-neutral-900 mb-4">
            CAL-MGR in Action
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover how people from all walks of life use CAL-MGR to save time and reduce stress
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.accent} flex items-center justify-center flex-shrink-0`}>
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-neutral-600">
                    {useCase.description}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {useCase.scenarios.map((scenario, scenarioIdx) => (
                  <li key={scenarioIdx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-600">{scenario}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Simplify Your Schedule?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who have transformed their calendar management with CAL-MGR
          </p>
          <a 
            href="/"
            className="inline-flex btn bg-white text-primary-600 hover:bg-neutral-50 px-8 py-3 font-semibold"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}