'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-gradient-hero pattern-grid"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1
          id="hero-heading"
          className="font-extrabold text-hero tracking-tight text-text-primary"
        >
          Own the future of digital assets
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-text-secondary leading-relaxed">
          A premium NFT marketplace. Secure, transparent, built for serious collectors and creators.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" variant="primary">
            <Link href="/market">Explore Market</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/create">Create NFT</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
