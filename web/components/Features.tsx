'use client';

import type { MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  details: string[];
  accent: string;
  icon: ReactNode;
}

const features: Feature[] = [
  {
    title: 'Multimodal Intake',
    description:
      'Bring events in from photos, files, links, or text. AIATL unifies camera capture, uploads, and clipboard intake into one flow.',
    details: [
      'Camera, gallery, and document uploads with auto-enhance',
      'Share-sheet capture from any app plus smart parsing of pasted text',
    ],
    accent: 'from-primary-500 to-secondary-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="1.8" />
        <path d="M14 14h7v3a4 4 0 01-4 4h-3v-7z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI Extraction Engine',
    description:
      'Vision + language models cooperate to identify titles, venues, times, and metadata. Everything is normalized before you ever review it.',
    details: [
      'Understands flyers, PDFs, and event pages in over 30 languages',
      'Autofills structured fields with confidence scoring for review',
    ],
    accent: 'from-secondary-500 to-purple-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8v4l2.5 2.5"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'Conflict Intelligence',
    description:
      'AIATL compares proposed events with your existing calendar, travel windows, and focus blocks to surface potential conflicts instantly.',
    details: [
      'Live Google Calendar scan for double bookings and travel gaps',
      'Buffer recommendations with visual warnings before you confirm',
    ],
    accent: 'from-amber-500 to-accent-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="1.8" />
        <path d="M8 2v4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 2v4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 13l3 3 7-7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Calendar Sync',
    description:
      'Push finished events to the right calendar with reminders, attendees, and color labels already dialed in.',
    details: [
      'One-tap handoff to Google Calendar, shared calendars, or delegated inboxes',
      'Automatic reminders, labels, and RSVP tracking based on your presets',
    ],
    accent: 'from-success-500 to-primary-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M16 16l5 5M21 16l-5 5"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="3" y="4" width="14" height="17" rx="2" strokeWidth="1.8" />
        <path d="M8 2v4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 10h10" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Location & Timezone IQ',
    description:
      'Resolve venues, travel durations, and attendee timezones automatically so your calendar always reflects reality.',
    details: [
      'Google Maps lookup with live travel estimates and parking context',
      'Timezone normalization for distributed teams and shared invites',
    ],
    accent: 'from-primary-500 to-cyan-500',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 21s6-4.5 6-9a6 6 0 10-12 0c0 4.5 6 9 6 9z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2" strokeWidth="1.8" />
        <path d="M21 5l-2 2" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 5l2 2" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Privacy & Control',
    description:
      'You approve every change. OAuth-secured integrations, transparent logs, and human review keep your calendar in your hands.',
    details: [
      'OAuth scopes limited to what scheduling requires—nothing more',
      'Full audit history plus manual overrides before anything is saved',
    ],
    accent: 'from-neutral-900 to-secondary-600',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 3l7 4v5c0 3.87-2.91 7.43-7 8-4.09-.57-7-4.13-7-8V7l7-4z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11v4" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
  shouldReduceMotion: boolean;
  itemVariants: Variants;
}

function FeatureCard({ feature, index, shouldReduceMotion, itemVariants }: FeatureCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 160, damping: 20, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 160, damping: 20, mass: 0.6 });

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateAmountX = ((relativeY - centerY) / centerY) * -6;
    const rotateAmountY = ((relativeX - centerX) / centerX) * 6;

    rotateX.set(rotateAmountX);
    rotateY.set(rotateAmountY);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: shouldReduceMotion ? undefined : 1200 }}>
      <motion.article
        role="article"
        className="group relative h-full overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:border-primary-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        onBlur={resetTilt}
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
              }
        }
        variants={itemVariants}
        custom={index}
        whileHover={shouldReduceMotion ? undefined : { y: -8 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg`}
              aria-hidden="true"
            >
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-heading-sm font-semibold text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.description}</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-neutral-600">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2 leading-relaxed">
                <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

interface FeaturesProps {
  className?: string;
}

export default function Features({ className = '' }: FeaturesProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: shouldReduceMotion ? 0 : custom * 0.05,
      },
    }),
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="text-center"
      >
        <motion.span
          variants={itemVariants}
          custom={0}
          className="inline-flex items-center justify-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700"
        >
          Features
        </motion.span>
        <motion.h2
          variants={itemVariants}
          custom={1}
          className="mt-6 text-display-md text-neutral-900"
        >
          Everything You Need to Trust AIATL
        </motion.h2>
        <motion.p
          variants={itemVariants}
          custom={2}
          className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600"
        >
          From the way you capture events to the moment they hit your calendar, every capability is designed for
          reliability, transparency, and speed.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
            itemVariants={itemVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}
