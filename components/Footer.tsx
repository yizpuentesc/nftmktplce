import Link from 'next/link';

const footerLinks = {
  product: [
    { href: '/market', label: 'Market' },
    { href: '/create', label: 'Create' },
    { href: '/my-nfts', label: 'My NFTs' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/docs', label: 'Docs' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ],
};

export function Footer() {
  return (
    <footer
      className="bg-background-alt border-t border-border mt-auto"
      role="contentinfo"
    >
      <div className="max-w-content-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-text-primary font-bold text-lg tracking-tight"
            >
              Exury
            </Link>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed max-w-xs">
              Premium NFT marketplace for serious collectors.
            </p>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Exury. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
