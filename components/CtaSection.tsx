import Link from 'next/link';
import { Button } from './ui/Button';

export function CtaSection() {
  return (
    <section
      className="py-20 sm:py-24 lg:py-32 border-t border-border"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="cta-heading"
          className="font-bold text-4xl sm:text-5xl text-text-primary tracking-tight"
        >
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-xl mx-auto">
          Connect your wallet and start exploring or listing in minutes.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="primary">
            <Link href="/connect">Connect Wallet</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
