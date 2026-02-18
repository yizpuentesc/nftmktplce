'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

const navLinks = [
  { href: '/market', label: 'Market' },
  { href: '/create', label: 'Create' },
  { href: '/my-nfts', label: 'My NFTs' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-border"
      role="banner"
    >
      <nav
        className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-text-primary font-bold text-xl tracking-tight hover:text-accent transition-colors duration-200"
        >
          Exury
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-text-secondary hover:text-accent transition-colors duration-200 text-[15px] font-medium"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="md" variant="primary">
            <Link href="/connect">Connect Wallet</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-text-primary hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background-alt/98 backdrop-blur-md border-b border-border transition-all duration-300 ease-out ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="max-w-content-wide mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block py-2 text-text-primary hover:text-accent transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild variant="primary" className="w-full justify-center">
              <Link href="/connect" onClick={() => setMobileOpen(false)}>
                Connect Wallet
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
