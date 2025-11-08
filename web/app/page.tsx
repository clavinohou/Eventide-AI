import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="container-max py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="text-lg font-bold text-neutral-900">CAL-MGR</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-neutral-600 hover:text-primary-600 transition-colors"
            >
              Pricing
            </Link>
          </div>
          <button className="btn btn-primary text-sm">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-primary-50 via-white to-white pt-20 pb-32">
        <div className="container-max text-center">
          <h1 className="text-display-lg mb-6 text-neutral-900 leading-tight">
            Transform Any Content Into Calendar Events
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Share a flyer, URL, or text description. Our AI extracts event details, verifies availability, and saves to your Google Calendar—all in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn btn-primary px-8 py-3 text-base">
              Download App
            </button>
            <button className="btn btn-outline px-8 py-3 text-base">
              Watch Demo
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="bg-neutral-100 rounded-2xl w-full max-w-4xl mx-auto aspect-video flex items-center justify-center border border-neutral-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-neutral-500 text-sm">App screenshot placeholder</p>
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
            Everything you need to manage your calendar intelligently
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
                className="p-6 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all"
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
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-heading-sm text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-max text-center">
          <h2 className="text-display-md mb-4 text-neutral-900">
            Ready to Transform Your Calendar?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Download CAL-MGR and turn any content into verified calendar events instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="btn btn-primary px-8 py-3 text-base">
              Download for iOS
            </button>
            <button className="btn btn-primary px-8 py-3 text-base bg-secondary-600 hover:bg-secondary-700">
              Download for Android
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="font-bold text-neutral-900">CAL-MGR</span>
              </div>
              <p className="text-sm text-neutral-600">
                Transform any content into verified calendar events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} CAL-MGR. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary-600 text-sm"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary-600 text-sm"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
