import Link from 'next/link';
import { ChevronRight, Shield, Award, Users, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

const trustIndicators = [
  {
    icon: Shield,
    title: 'No Lender Overlays',
    description: 'We underwrite directly to VA guidelines',
  },
  {
    icon: Award,
    title: 'No 620 Credit Requirement',
    description: "Unlike other lenders, we don't add credit score minimums",
  },
  {
    icon: Users,
    title: 'In-House VA Specialists',
    description: 'Dedicated team that understands veteran needs',
  },
];

const quickStats = [
  { value: '49', label: 'States Licensed' },
  { value: '0%', label: 'Down Payment' },
  { value: '24hr', label: 'Pre-Approval' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-primary/5 blur-3xl" />
      <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-od-green/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-4 py-2 mb-6">
              <span className="text-gold-primary text-sm font-medium">
                Proudly Serving Those Who Served
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              They Served For Us.
              <br />
              <span className="text-gradient-gold">Now We Serve Them.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-white/70 sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Get your VA home loan with <strong className="text-white">no lender overlays</strong> and{' '}
              <strong className="text-white">no minimum credit score requirements</strong>.
              We underwrite directly to VA guidelines — the way it should be.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/#quiz">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Pre-Qualified Now
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/blog/va-loan-eligibility-requirements">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn About VA Loans
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex justify-center lg:justify-start gap-8">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-gold-primary">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Trust Indicators Card */}
          <div className="relative">
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-6">
                Why Veterans Choose Cornerstone
              </h2>

              <div className="space-y-6">
                {trustIndicators.map((indicator) => (
                  <div key={indicator.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-primary/20">
                        <indicator.icon className="h-6 w-6 text-gold-primary" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{indicator.title}</h3>
                      <p className="text-sm text-white/60">{indicator.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Differentiator Callout */}
              <div className="mt-8 rounded-xl bg-od-green/20 border border-od-green/30 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-od-green-light mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Most lenders require 620+ credit score
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      We don&apos;t add overlays. If you&apos;re eligible for a VA loan, we can help —
                      regardless of credit score.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-gradient-to-br from-navy-medium to-navy-light border-2 border-navy-deep flex items-center justify-center"
                      >
                        <span className="text-xs text-white/70">★</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gold-primary">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-white/60 mt-1">Trusted by veterans nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
