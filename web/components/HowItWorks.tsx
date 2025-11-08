'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface Step {
  title: string;
  tagline: string;
  description: string;
  details: string[];
  icon: ReactNode;
}

const steps: Step[] = [
  {
    title: 'Capture',
    tagline: 'Multimodal intake in seconds',
    description:
      'Snap a flyer, forward an email, paste a link, or drop a PDF. AIATL cleans and normalizes every artifact the moment it arrives.',
    details: [
      'Camera, gallery, and document uploads with smart crop and glare correction',
      'One-tap share sheet intake from any app or browser tab',
    ],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="5" width="16" height="14" rx="2" strokeWidth="1.8" />
        <path d="M9 5l1.5-2h3L15 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'Understand',
    tagline: 'AI extraction + validation',
    description:
      'Vision and language models cooperate to identify every detail—title, venue, schedule, RSVP links—then normalize them for review.',
    details: [
      'Cross-checks time expressions, abbreviations, and locales automatically',
      'Confidence scores flag anything the human reviewer should double-check',
    ],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 3a9 9 0 019 9 8.94 8.94 0 01-3 6.7L21 21" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="6" strokeWidth="1.8" />
        <path d="M9 12h6" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 9v6" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Resolve',
    tagline: 'Conflict checks & context',
    description:
      'AIATL compares the structured event against your calendar, travel buffers, and focus blocks so you can make confident decisions.',
    details: [
      'Live conflict detection with travel-time and prep-window insights',
      'Policy-aware suggestions for reschedules, notes, or attendee updates',
    ],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 3h14a2 2 0 012 2v5H3V5a2 2 0 012-2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 10l2 10h14l2-10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 10v6" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 10v6" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15.5 15.5l2.5 2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5 11.5l2 2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Schedule',
    tagline: 'One-tap calendar sync',
    description:
      'Approve the plan and AIATL pushes the event—and any follow-ups—back to your calendar with reminders, labels, and sharing intact.',
    details: [
      'Syncs to personal or shared Google Calendars with color-coding and reminders',
      'Generates follow-up tasks or attendee summaries straight from the timeline',
    ],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="1.8" />
        <path d="M8 2v4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 2v4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 9h18" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 13h4" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 17h8" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface StepCardProps {
  step: Step;
  index: number;
  isLast: boolean;
  shouldReduceMotion: boolean;
  itemVariants: Variants;
}

function StepCard({ step, index, isLast, shouldReduceMotion, itemVariants }: StepCardProps) {
  const pulseAnimation = shouldReduceMotion
    ? undefined
    : {
        scale: [1, 1.12, 1],
        opacity: [1, 0.65, 1],
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
      };

  return (
    <div className={`group relative pl-16 ${isLast ? '' : 'pb-12 lg:pb-16'}`}>
      <div className="pointer-events-none absolute left-4 top-0 flex h-full w-12 flex-col items-center">
        <motion.span
          className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-white shadow-md"
          animate={pulseAnimation}
          aria-hidden="true"
        >
          <span className="text-primary-600">{index + 1}</span>
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
        </motion.span>
        {!isLast && (
          <span className="mt-3 w-px flex-1 bg-gradient-to-b from-primary-200 via-secondary-200 to-accent-200" />
        )}
      </div>
      <motion.article
        variants={itemVariants}
        custom={index}
        className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur hover:border-primary-200"
        whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-70" aria-hidden="true" />
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
              {step.icon}
              <span>Step {index + 1}</span>
            </span>
            <span className="text-sm font-medium text-neutral-500">{step.tagline}</span>
          </div>
          <h3 className="text-heading-md text-neutral-900">{step.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-600">{step.description}</p>
          <ul className="space-y-2 text-sm text-neutral-600">
            {step.details.map((detail) => (
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

interface HowItWorksProps {
  className?: string;
}

export default function HowItWorks({ className = '' }: HowItWorksProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.18,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: shouldReduceMotion ? 0 : custom * 0.04,
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
          className="inline-flex items-center justify-center rounded-full bg-secondary-100 px-4 py-2 text-sm font-semibold text-secondary-700"
        >
          How it works
        </motion.span>
        <motion.h2
          variants={itemVariants}
          custom={1}
          className="mt-6 text-display-md text-neutral-900"
        >
          From intake to calendar in four orchestrated steps
        </motion.h2>
        <motion.p
          variants={itemVariants}
          custom={2}
          className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600"
        >
          Each stage of the AIATL pipeline builds trust—capturing messy context, understanding intent, resolving conflicts,
          and scheduling with approvals intact.
        </motion.p>
      </motion.div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="relative overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white shadow-2xl lg:sticky lg:top-32"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-primary-500/40 blur-3xl" />
            <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-secondary-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12)_0,_rgba(255,255,255,0)_60%)]" />
          </div>
          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Pipeline overview
            </span>
            <h3 className="text-3xl font-semibold leading-tight">AIATL orchestrates clarity before anything hits your calendar.</h3>
            <p className="text-sm leading-relaxed text-white/80">
              The mobile app and agent network collaborate so you can focus on decisions, not data entry. Review a single
              stream of truth with contextual signals from intake to scheduling.
            </p>

            <div className="space-y-4 pt-2">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="text-white/60">{step.tagline}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-8 flex items-center gap-3 text-sm text-white/70"
              animate={shouldReduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={shouldReduceMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <span className="h-3 w-3 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400" />
              </span>
              <span>Continuous data lineage keeps every step auditable.</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-0"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              shouldReduceMotion={shouldReduceMotion}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
