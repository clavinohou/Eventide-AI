'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface SolutionProps {
  className?: string;
}

export default function Solution({ className = '' }: SolutionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
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

  const features = [
    {
      icon: '📸',
      title: 'Snap a Photo',
      description: 'Take a picture of any event flyer, poster, or screen. Our AI reads and understands everything.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🔗',
      title: 'Share a Link',
      description: 'Paste any URL and we&apos;ll fetch and parse the event details automatically from the webpage.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '💬',
      title: 'Type or Speak',
      description: 'Just describe the event naturally. "Dinner with John next Friday at 7pm." We get it.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const metrics = [
    { value: '95%', label: 'AI Accuracy' },
    { value: '3sec', label: 'Avg. Processing' },
    { value: '500+', label: 'Beta Users' },
    { value: '0', label: 'Manual Entry' },
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
          One Snap. Zero Hassle.
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
        >
          AIATL uses advanced AI to instantly extract event details from any source—photos, links, or text. 
          No typing. No errors. Just verified events in your calendar.
        </motion.p>
      </motion.div>

      {/* Metrics Strip */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-neutral-600">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group flex gap-4 p-6 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-heading-sm text-neutral-900 mb-2 font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column - Visual */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Device Mockup Frame */}
          <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-3xl p-2 shadow-2xl">
            {/* Device Screen */}
            <div className="bg-white rounded-2xl overflow-hidden aspect-[4/5] relative">
              {/* Status Bar */}
              <div className="h-8 bg-neutral-900 flex items-center justify-between px-4">
                <span className="text-white text-xs font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-3 bg-white rounded-sm" />
                  <div className="w-4 h-3 bg-white rounded-sm" />
                  <div className="w-4 h-3 bg-white rounded-sm" />
                </div>
              </div>
              
              {/* App Content */}
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="text-center">
                  <h4 className="text-lg font-bold text-neutral-900 mb-1">AIATL</h4>
                  <p className="text-xs text-neutral-500">Smart Event Extraction</p>
                </div>
                
                {/* Event Preview Card */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.5 }}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-900 text-sm">Tech Conference 2024</p>
                      <p className="text-xs text-neutral-600 mt-1">Nov 15 · 2:00 PM</p>
                      <p className="text-xs text-neutral-500 mt-1">Convention Center</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* AI Processing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: 0.5 }}
                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-900">AI Processing Complete</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-success-500" />
                      <span className="text-xs text-neutral-600">No conflicts detected</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1, duration: 0.5 }}
                    className="h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-semibold">Add to Calendar</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 1.1, duration: 0.5 }}
                    className="h-10 bg-neutral-100 rounded-xl flex items-center justify-center"
                  >
                    <span className="text-neutral-700 text-sm font-medium">Edit Details</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: 0.5 }}
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-3xl">✨</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}