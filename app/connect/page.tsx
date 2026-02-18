import Link from 'next/link';

export default function ConnectPage() {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
      <h1 className="font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
        Connect Wallet
      </h1>
      <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
        Connect your Ethereum wallet to list, buy, and manage NFTs.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-accent hover:text-accent-hover transition-colors font-medium"
      >
        ← Back to home
      </Link>
    </section>
  );
}
