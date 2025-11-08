'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'neutral-50' | 'primary-50' | 'gradient-primary';
}

export default function Section({ 
  id, 
  children, 
  className = '', 
  background = 'white' 
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, 0]);

  const getBackgroundClasses = () => {
    switch (background) {
      case 'neutral-50':
        return 'bg-white/70 backdrop-blur-sm';
      case 'primary-50':
        return 'bg-white/60 backdrop-blur-sm';
      case 'gradient-primary':
        return 'bg-gradient-to-b from-white/60 to-white/80 backdrop-blur-sm';
      default:
        return 'bg-white/50';
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-20 relative ${getBackgroundClasses()} ${className}`}
      style={{ 
        opacity: shouldReduceMotion ? 1 : opacity,
        y: shouldReduceMotion ? 0 : y
      }}
    >
      <div className="container-max relative z-10">
        {children}
      </div>
    </motion.section>
  );
}