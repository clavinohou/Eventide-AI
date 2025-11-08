'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface ProblemProps {
  className?: string;
}

export default function Problem({ className = '' }: ProblemProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const problems = [
    {
      icon: '⏰',
      title: 'Time-Consuming',
      description: 'Manual entry takes minutes per event, adding up to hours wasted each month.',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: '❌',
      title: 'Error-Prone',
      description: 'Typos, wrong timezones, and missing details lead to missed appointments and confusion.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: '😓',
      title: 'Tedious',
      description: 'Constantly switching between apps, tabs, and devices just to add one event to your calendar.',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: '📱',
      title: 'Context Switching',
      description: 'Losing focus and productivity when you have to stop what you&apos;re doing to manually add events.',
      color: 'from-yellow-500 to-lime-500',
    },
    {
      icon: '🗑️',
      title: 'Lost Information',
      description: 'Event flyers, screenshots, and links pile up with no good way to process them systematically.',
      color: 'from-lime-500 to-green-500',
    },
    {
      icon: '🤯',
      title: 'Mental Overhead',
      description: 'Remembering to transfer event details later creates unnecessary cognitive load and stress.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-display-md mb-6 text-neutral-900"
        >
          Managing Your Calendar Shouldn&apos;t Be This Hard
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto"
        >
          Tired of manually typing event details? Frustrated with copy-pasting from flyers, emails, and websites? 
          Missing important events because calendar entry feels like a chore?
        </motion.p>
      </motion.div>

      {/* Problems Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {problems.map((problem, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="group relative p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-300 hover:border-neutral-400 hover:shadow-xl transition-all duration-300"
          >
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                {problem.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-heading-sm text-neutral-900 mb-3 font-semibold">
                {problem.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-neutral-700 leading-relaxed">
                {problem.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full border border-primary-300 shadow-sm backdrop-blur-sm">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-semibold text-primary-900">
            There&apos;s a better way. Let&apos;s fix this.
          </span>
        </div>
      </motion.div>
    </div>
  );
}