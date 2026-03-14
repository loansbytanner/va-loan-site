import {
  Shield,
  Users,
  CreditCard,
  Clock,
  FileCheck,
  HeartHandshake,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const valueProps = [
  {
    icon: Shield,
    title: 'No Lender Overlays',
    description:
      "Most VA lenders add their own restrictions on top of VA guidelines — we don't. We underwrite directly to VA standards, giving you access to the full benefits you've earned.",
    highlights: [
      'Direct to VA guidelines',
      'No additional lender restrictions',
      'Maximum flexibility for veterans',
    ],
  },
  {
    icon: CreditCard,
    title: 'No 620 Credit Score Requirement',
    description:
      "The VA doesn't set a minimum credit score, but most lenders require 620-640. We don't add these overlays. If you're eligible for a VA loan, we work to get you approved.",
    highlights: [
      'No minimum credit score overlay',
      'We work with your situation',
      'Case-by-case underwriting',
    ],
  },
  {
    icon: Users,
    title: 'In-House VA Specialists',
    description:
      "Our underwriting team specializes exclusively in VA loans. They understand the unique needs of veterans and know how to navigate complex situations that other lenders won't touch.",
    highlights: [
      'Dedicated VA loan experts',
      'In-house underwriting',
      'Faster decisions, fewer surprises',
    ],
  },
  {
    icon: Clock,
    title: 'Fast, Efficient Closings',
    description:
      "With our experienced team and streamlined process, we close VA loans quickly. Pre-approval in 24 hours, clear communication throughout, and a team that respects your time.",
    highlights: [
      '24-hour pre-approval',
      'Clear communication',
      'On-time closings',
    ],
  },
  {
    icon: FileCheck,
    title: 'Full VA Benefits Access',
    description:
      "0% down payment, no PMI, competitive rates — we ensure you get every benefit the VA loan program offers. Your service earned these benefits; we make sure you receive them.",
    highlights: [
      'Zero down payment',
      'No private mortgage insurance',
      'Competitive interest rates',
    ],
  },
  {
    icon: HeartHandshake,
    title: 'We Honor Your Service',
    description:
      "You served our country with honor. We believe you deserve a lender who treats you with the same respect. No pressure, no games — just honest guidance.",
    highlights: [
      'Transparent process',
      'No high-pressure tactics',
      'Your advocate, not just a lender',
    ],
  },
];

// Comparison showing what others require vs what we require
const comparisonItems = [
  { feature: 'Minimum Credit Score', others: '620-640', cornerstone: 'None (VA guidelines)' },
  { feature: 'Debt-to-Income Ratio', others: '41-45%', cornerstone: 'Up to 60%+' },
  { feature: 'Employment Gap Restrictions', others: 'Strict limits', cornerstone: 'Case-by-case' },
  { feature: 'Recent Credit Events', others: 'Long waiting periods', cornerstone: 'Flexible review' },
  { feature: 'Self-Employment Income', others: '2 years required', cornerstone: '1 year may qualify' },
];

export default function ValueProps() {
  return (
    <section className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-navy-deep text-sm font-semibold uppercase tracking-wider mb-3">
            Why Cornerstone
          </span>
          <h2 className="text-3xl font-bold text-navy-deep sm:text-4xl lg:text-5xl">
            The VA Loan Experience You Deserve
          </h2>
          <p className="mt-4 text-lg text-slate-dark max-w-3xl mx-auto">
            We don&apos;t just process VA loans — we specialize in them. Our commitment is to help
            every eligible veteran achieve homeownership, regardless of credit challenges.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-deep/5 mb-6">
                <prop.icon className="h-7 w-7 text-gold-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-navy-deep mb-3">{prop.title}</h3>
              <p className="text-slate-dark mb-6">{prop.description}</p>
              <ul className="space-y-2">
                {prop.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 text-sm text-slate-dark">
                    <CheckCircle2 className="h-4 w-4 text-od-green" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-navy-deep sm:text-3xl">
              The Overlay Difference
            </h3>
            <p className="mt-3 text-slate-dark max-w-2xl mx-auto">
              See how lender overlays limit your options — and how we remove those barriers.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-deep text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Requirement</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Most Lenders</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold bg-gold-primary text-navy-deep">
                    Cornerstone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonItems.map((item, index) => (
                  <tr key={item.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-navy-deep">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                        <span className="text-sm text-slate-dark">{item.others}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center bg-gold-primary/5">
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-od-green" aria-hidden="true" />
                        <span className="text-sm font-medium text-navy-deep">{item.cornerstone}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-dark mb-4">
              Don&apos;t let overlay restrictions keep you from the home you&apos;ve earned.
            </p>
            <a
              href="/#quiz"
              className="inline-flex items-center gap-2 text-navy-deep font-semibold hover:text-navy-deep/80 underline decoration-gold-primary decoration-2 underline-offset-4 transition-colors"
            >
              See if you qualify
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
