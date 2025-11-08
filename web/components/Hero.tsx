'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';

interface HeroProps {
  onSignupClick?: () => void;
  onDemoClick?: () => void;
}

export default function Hero({ onSignupClick, onDemoClick }: HeroProps) {
  const containerVariants = {
    hidden: { y: 0 },
    visible: {
      y: 0,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.95 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Clean Background - Removed blob animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle static gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-pink-100/20 to-purple-100/20" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container-max relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Social Proof Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary-300 rounded-full shadow-md">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-neutral-800">
                  Join <span className="text-primary-600 font-semibold">500+</span> beta users
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6"
            >
              Turn Any Event Into Your{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent">
                Calendar
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Snap a flyer, paste a link, or share event details. Our AI extracts everything, checks for conflicts, and adds it to Google Calendar—instantly.
            </motion.p>

            {/* Feature Highlights */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              {[
                { icon: '⚡', text: 'AI-Powered' },
                { icon: '✓', text: 'Conflict Detection' },
                { icon: '🔒', text: 'Secure & Private' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-neutral-300 rounded-full text-sm font-medium text-neutral-800 shadow-sm"
                >
                  <span className="text-base">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onSignupClick}
                variant="primary"
                size="lg"
                className="px-8 py-4 text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                Join Beta Waitlist
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
              <Button
                onClick={onDemoClick}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* App Screenshot Mockup */}
            <div className="relative">
              {/* Floating Card - Calendar Event */}
              <motion.div
                initial={{ y: 40, rotate: -3 }}
                animate={{ y: 0, rotate: -3 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -top-6 -left-6 z-10 bg-white rounded-2xl shadow-2xl p-4 border border-neutral-300 max-w-[280px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 text-sm truncate">Tech Conference 2024</p>
                    <p className="text-xs text-neutral-600 mt-1">Nov 15 · 2:00 PM</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-success-500" />
                      <span className="text-xs text-neutral-700">No conflicts</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Visual */}
              <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl border-2 border-neutral-300 shadow-2xl overflow-hidden aspect-[4/5]">
                {/* Phone Frame */}
                <div className="absolute inset-4 bg-white rounded-2xl shadow-inner">
                  {/* Status Bar */}
                  <div className="h-6 bg-neutral-900 rounded-t-2xl" />
                  
                  {/* App Content */}
                  <div className="p-4 space-y-3">
                    {/* Header */}
                    <div className="h-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg" />
                    
                    {/* Image Preview */}
                    <div className="h-32 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-xl relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className="h-6 bg-neutral-200 rounded-lg w-3/4" />
                      <div className="h-4 bg-neutral-100 rounded w-1/2" />
                      <div className="h-4 bg-neutral-100 rounded w-2/3" />
                    </div>
                    
                    {/* Action Button */}
                    <div className="h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl mt-4" />
                  </div>
                </div>
              </div>

              {/* Floating Card - AI Processing */}
              <motion.div
                initial={{ y: 40, rotate: 3 }}
                animate={{ y: 0, rotate: 3 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 z-10 bg-white rounded-2xl shadow-2xl p-4 border border-neutral-300 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-900">AI Extracting...</p>
                    <div className="mt-2 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-500 to-accent-600"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-neutral-400">
          <span className="text-xs font-medium">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
