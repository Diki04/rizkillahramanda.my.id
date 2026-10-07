'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  id,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
