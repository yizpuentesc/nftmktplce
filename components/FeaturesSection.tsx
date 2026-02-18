import { Card, CardIcon, CardTitle, CardDescription } from './ui/Card';
import { Shield, Zap, Wallet } from 'lucide-react';

const features = [
  {
    icon: <Shield strokeWidth={1.5} className="text-accent" />,
    title: 'Secure & audited',
    description:
      'Smart contracts built on battle-tested standards. Your assets and funds are protected.',
  },
  {
    icon: <Zap strokeWidth={1.5} className="text-accent" />,
    title: 'Instant settlement',
    description:
      'Transactions settle on-chain. No intermediaries, no delays—just you and the network.',
  },
  {
    icon: <Wallet strokeWidth={1.5} className="text-accent" />,
    title: 'You stay in control',
    description:
      'Connect your wallet. List, buy, and resell without handing over custody of your NFTs.',
  },
];

export function FeaturesSection() {
  return (
    <section
      className="py-20 sm:py-24 lg:py-32"
      aria-labelledby="features-heading"
    >
      <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2
            id="features-heading"
            className="font-bold text-4xl sm:text-5xl text-text-primary tracking-tight"
          >
            Why Exury
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-text-secondary leading-relaxed">
            Built for trust and performance. No gimmicks—just a serious marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map(({ icon, title, description }) => (
            <Card key={title} as="article">
              <CardIcon icon={icon} />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
