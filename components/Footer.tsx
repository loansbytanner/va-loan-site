import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  'VA Loan Info': [
    { name: 'VA Loan Guide', href: '/guide' },
    { name: 'Eligibility Requirements', href: '/eligibility' },
    { name: 'VA Loan Rates', href: '/rates' },
    { name: 'VA Funding Fee', href: '/blog/va-funding-fee-explained' },
    { name: 'IRRRL Refinance', href: '/blog/va-irrrl-streamline-refinance' },
  ],
  'Resources': [
    { name: 'Blog', href: '/blog' },
    { name: 'VA Loan Calculator', href: '/calculator' },
    { name: 'Get Your COE', href: '/blog/how-to-get-coe' },
    { name: 'FAQs', href: '/faq' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Licensing', href: '/licensing' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-primary to-gold-dark">
                <span className="text-xl font-bold text-navy-deep">VA</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Cornerstone</span>
                <span className="ml-1 text-sm text-gold-primary">VA Loans</span>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-6">
              They served for us. Now we serve them. Helping veterans achieve homeownership with VA loans — no lender overlays, direct to VA guidelines.
            </p>
            <div className="space-y-3">
              <a
                href="tel:480-420-4918"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-gold-primary transition-colors"
              >
                <Phone className="h-4 w-4 text-gold-primary" aria-hidden="true" />
                (480) 420-4918
              </a>
              <a
                href="mailto:va@cfmtg.com"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-gold-primary transition-colors"
              >
                <Mail className="h-4 w-4 text-gold-primary" aria-hidden="true" />
                va@cfmtg.com
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-gold-primary mt-0.5" aria-hidden="true" />
                <span>
                  Cornerstone First Mortgage<br />
                  Licensed in 49 States
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gold-primary uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-gold-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* NMLS Disclosure & Legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-4 text-xs text-white/50">
            {/* NMLS Disclosure - Required */}
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="font-semibold text-white/70 mb-2">NMLS Disclosure</p>
              <p>
                Cornerstone First Mortgage Corporation | NMLS #173855 | Equal Housing Lender |{' '}
                <a
                  href="https://www.nmlsconsumeraccess.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gold-primary"
                >
                  NMLS Consumer Access
                </a>
              </p>
              <p className="mt-2">
                This is not a commitment to lend. Programs, rates, terms, and conditions are subject to change without notice. All loans are subject to credit approval. Other restrictions may apply.
              </p>
            </div>

            {/* VA Loan Disclaimer */}
            <p>
              VA loans are provided by private lenders and guaranteed by the U.S. Department of Veterans Affairs (VA). The VA does not make direct loans to veterans. Cornerstone First Mortgage is not affiliated with or acting on behalf of or at the direction of the VA or HUD/FHA.
            </p>

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
              <p>&copy; {currentYear} Cornerstone First Mortgage Corporation. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1 text-gold-primary">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    <path d="M10 6a1 1 0 011 1v3a1 1 0 01-2 0V7a1 1 0 011-1z" />
                    <path d="M10 12a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                  Equal Housing Lender
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
