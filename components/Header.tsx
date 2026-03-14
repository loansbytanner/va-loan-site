'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import Button from './ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'VA Loan Guide', href: '/blog/va-loan-eligibility-requirements' },
  { name: 'Eligibility', href: '/blog/how-to-get-va-certificate-of-eligibility' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-deep/95 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* Logo placeholder - American flag inspired mark */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-primary to-gold-dark">
                <span className="text-xl font-bold text-navy-deep">VA</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">Cornerstone</span>
                <span className="ml-1 text-sm text-gold-primary">VA Loans</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-gold-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href="tel:480-420-4918"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-gold-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>(480) 420-4918</span>
            </a>
            <Link href="/#quiz">
              <Button size="md">
                Get Pre-Qualified
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-4 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 space-y-3 px-4">
                <a
                  href="tel:480-420-4918"
                  className="flex items-center gap-2 text-base font-medium text-white/80"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>(480) 420-4918</span>
                </a>
                <Link href="/#quiz" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="md" className="w-full">
                    Get Pre-Qualified
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
