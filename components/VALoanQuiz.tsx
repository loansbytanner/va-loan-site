'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Lock,
  Shield,
  Phone,
  Calendar,
} from 'lucide-react';
import Button from './ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// US States for property location
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const steps = [
  {
    id: 'loanPurpose',
    question: "What's your loan purpose?",
    subtitle: 'How do you plan to use your VA loan benefit?',
    options: [
      { value: 'purchase', label: 'Purchase', sublabel: 'Buy a new home' },
      { value: 'refinance', label: 'Rate & Term Refi', sublabel: 'Lower your rate' },
      { value: 'cashout', label: 'Cash-Out Refi', sublabel: 'Access your equity' },
      { value: 'irrrl', label: 'VA IRRRL', sublabel: 'Streamline refinance' },
    ],
  },
  {
    id: 'serviceStatus',
    question: 'What is your military status?',
    subtitle: 'This helps us understand your VA loan eligibility',
    options: [
      { value: 'veteran', label: 'Veteran', sublabel: 'Honorably discharged' },
      { value: 'active', label: 'Active Duty', sublabel: 'Currently serving' },
      { value: 'reserve', label: 'Reserve/Guard', sublabel: 'Selected Reserve' },
      { value: 'spouse', label: 'Surviving Spouse', sublabel: 'Of eligible veteran' },
    ],
  },
  {
    id: 'serviceBranch',
    question: 'Which branch did you serve?',
    subtitle: 'Thank you for your service',
    options: [
      { value: 'army', label: 'Army', sublabel: '' },
      { value: 'navy', label: 'Navy', sublabel: '' },
      { value: 'airforce', label: 'Air Force', sublabel: '' },
      { value: 'marines', label: 'Marines', sublabel: '' },
      { value: 'coastguard', label: 'Coast Guard', sublabel: '' },
      { value: 'spaceforce', label: 'Space Force', sublabel: '' },
    ],
  },
  {
    id: 'propertyState',
    question: 'Where is the property located?',
    subtitle: 'Select the state where you want to buy or refinance',
    options: [],
    isStateSelect: true,
  },
  {
    id: 'propertyType',
    question: 'What type of property?',
    subtitle: 'Select the property type',
    options: [
      { value: 'sfr', label: 'Single Family', sublabel: '1 unit home' },
      { value: 'condo', label: 'Condo/Townhome', sublabel: 'VA-approved' },
      { value: 'multiunit', label: '2-4 Unit', sublabel: 'Live in one, rent others' },
      { value: 'manufactured', label: 'Manufactured', sublabel: 'Permanent foundation' },
    ],
  },
  {
    id: 'hasProperty',
    question: 'Do you have a property in mind?',
    subtitle: 'Let us know your timeline',
    options: [
      { value: 'yes-contract', label: 'Yes, Under Contract', sublabel: 'Ready to close' },
      { value: 'yes-shopping', label: 'Yes, Still Shopping', sublabel: 'Found some options' },
      { value: 'no', label: 'Not Yet', sublabel: 'Just getting started' },
      { value: 'refinance', label: 'Refinancing Current Home', sublabel: 'I own the property' },
    ],
  },
  {
    id: 'creditScore',
    question: "What's your estimated credit score?",
    subtitle: "Remember: We don't require a 620 minimum like other lenders",
    options: [
      { value: '720-plus', label: '720+', sublabel: 'Excellent' },
      { value: '680-719', label: '680-719', sublabel: 'Good' },
      { value: '620-679', label: '620-679', sublabel: 'Fair' },
      { value: '580-619', label: '580-619', sublabel: 'We can help!' },
      { value: 'below-580', label: 'Below 580', sublabel: "Let's talk options" },
    ],
  },
  {
    id: 'loanAmount',
    question: 'Estimated loan amount?',
    subtitle: 'Approximate purchase price or refinance amount',
    options: [
      { value: 'under-250k', label: 'Under $250K', sublabel: '' },
      { value: '250k-400k', label: '$250K - $400K', sublabel: '' },
      { value: '400k-600k', label: '$400K - $600K', sublabel: '' },
      { value: '600k-1m', label: '$600K - $1M', sublabel: '' },
      { value: 'over-1m', label: 'Over $1M', sublabel: 'VA Jumbo available' },
    ],
  },
];

export default function VALoanQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [trackingParams, setTrackingParams] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const [formStartedAt] = useState(() => Date.now());

  // Capture gclid, UTM params, and fbclid from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const tracked: Record<string, string> = {};
    const keys = ['gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    for (const key of keys) {
      const val = params.get(key);
      if (val) tracked[key] = val;
    }
    if (Object.keys(tracked).length > 0) {
      setTrackingParams(tracked);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const totalSteps = steps.length + 1;
  const isQuizStep = currentStep < steps.length;
  const isContactStep = currentStep === steps.length;

  const handleOptionSelect = (value: string) => {
    const stepId = steps[currentStep].id;
    setAnswers((prev) => ({ ...prev, [stepId]: value }));

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 400);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const onSubmit = async (contactData: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const leadData = {
      ...answers,
      ...contactData,
      ...trackingParams,
      source: trackingParams.utm_source || 'va-loan-site',
      medium: trackingParams.utm_medium || 'organic',
      campaign: trackingParams.utm_campaign || '',
      timestamp: new Date().toISOString(),
      landing_page: typeof window !== 'undefined' ? window.location.pathname : '',
      _website: honeypot,
      _formStartedAt: formStartedAt,
    };

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmittedName(contactData.name.split(' ')[0]);
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setSubmitError('Something went wrong. Please try again or call us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quiz" className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-medium to-navy-deep">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-primary/10 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-od-green/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center">
          {!isSubmitted ? (
            <>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-primary/30 bg-white/5 px-4 py-2 text-sm font-medium text-gold-light backdrop-blur-sm">
                <Shield className="h-4 w-4 text-gold-primary" />
                No Credit Score Minimum Required
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Get Your VA Loan Pre-Qualification
              </h2>
              <p className="mt-3 text-white/60">
                Answer a few questions to see your personalized options
              </p>
            </>
          ) : (
            <>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4" />
                Successfully Submitted
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Thank You For Your Service
              </h2>
              <p className="mt-3 text-white/60">
                We&apos;ll be in touch soon to discuss your VA loan options
              </p>
            </>
          )}
        </div>

        {/* Quiz Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20">
          {/* Progress bar */}
          {!isSubmitted && (
            <div className="bg-cream px-8 py-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-dark">Step {currentStep + 1} of {totalSteps}</span>
                <span className="font-semibold text-gold-primary">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-dark/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="p-8 md:p-10">
            {/* Quiz steps */}
            {isQuizStep && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-navy-deep">
                  {steps[currentStep].question}
                </h3>
                <p className="mb-8 text-slate-dark/60">{steps[currentStep].subtitle}</p>

                {/* State selection dropdown */}
                {'isStateSelect' in steps[currentStep] && steps[currentStep].isStateSelect ? (
                  <div className="space-y-4">
                    <select
                      value={answers[steps[currentStep].id] || ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setAnswers((prev) => ({ ...prev, [steps[currentStep].id]: e.target.value }));
                          setTimeout(() => {
                            setCurrentStep((prev) => prev + 1);
                          }, 300);
                        }
                      }}
                      className="w-full rounded-xl border-2 border-slate-dark/10 bg-cream px-4 py-4 text-lg font-medium text-navy-deep focus:border-gold-primary focus:bg-white focus:outline-none"
                    >
                      <option value="">Select a state...</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className={`grid gap-3 ${steps[currentStep].options.length > 4 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                    {steps[currentStep].options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleOptionSelect(option.value)}
                        className={`group relative overflow-hidden rounded-xl border-2 p-5 text-left transition-all duration-200 ${
                          answers[steps[currentStep].id] === option.value
                            ? 'border-gold-primary bg-gradient-to-br from-gold-primary/10 to-gold-primary/5 shadow-md'
                            : 'border-slate-dark/10 hover:border-gold-primary/40 hover:bg-cream'
                        }`}
                      >
                        <div className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full transition-all ${
                          answers[steps[currentStep].id] === option.value
                            ? 'bg-gold-primary'
                            : 'border-2 border-slate-dark/20'
                        }`}>
                          {answers[steps[currentStep].id] === option.value && (
                            <CheckCircle2 className="h-5 w-5 text-navy-deep" />
                          )}
                        </div>

                        <span className={`block text-lg font-semibold ${
                          answers[steps[currentStep].id] === option.value
                            ? 'text-navy-deep'
                            : 'text-navy-deep group-hover:text-gold-primary'
                        }`}>
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className="mt-1 block text-sm text-slate-dark/50">
                            {option.sublabel}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-8 inline-flex items-center gap-1.5 font-medium text-navy-medium transition-colors hover:text-gold-primary"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                )}
              </div>
            )}

            {/* Contact form step */}
            {isContactStep && !isSubmitted && (
              <div>
                <h3 className="mb-2 text-2xl font-bold text-navy-deep">
                  Almost there!
                </h3>
                <p className="mb-8 text-slate-dark/60">
                  Enter your details and a VA loan specialist will reach out within 24 hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy-deep">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      autoComplete="name"
                      {...register('name')}
                      className="w-full rounded-xl border-2 border-slate-dark/10 bg-cream px-4 py-3.5 text-navy-deep placeholder:text-slate-dark/40 focus:border-gold-primary focus:bg-white focus:outline-none"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm font-medium text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy-deep">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      {...register('email')}
                      className="w-full rounded-xl border-2 border-slate-dark/10 bg-cream px-4 py-3.5 text-navy-deep placeholder:text-slate-dark/40 focus:border-gold-primary focus:bg-white focus:outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm font-medium text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy-deep">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      autoComplete="tel"
                      {...register('phone')}
                      className="w-full rounded-xl border-2 border-slate-dark/10 bg-cream px-4 py-3.5 text-navy-deep placeholder:text-slate-dark/40 focus:border-gold-primary focus:bg-white focus:outline-none"
                      placeholder="(480) 555-1234"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm font-medium text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="btn-glow mt-2 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My VA Loan Options
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex w-full items-center justify-center gap-1.5 py-2 font-medium text-navy-medium transition-colors hover:text-gold-primary"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                </form>
              </div>
            )}

            {/* Thank You State */}
            {isSubmitted && (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-od-green to-od-green-dark shadow-lg">
                  <CheckCircle2 className="h-10 w-10 text-white" aria-hidden="true" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-navy-deep">
                  Thank You, {submittedName}!
                </h3>
                <p className="mb-8 text-slate-dark/70">
                  You served our country, and now it&apos;s our turn to serve you. A VA loan specialist will contact you within 24 hours.
                </p>

                {/* What happens next */}
                <div className="mb-8 rounded-xl bg-cream p-6 text-left">
                  <h4 className="mb-4 font-semibold text-navy-deep">What happens next?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-primary/20 text-xs font-bold text-gold-primary">1</div>
                      <span className="text-sm text-slate-dark/70">A VA loan specialist reviews your information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-primary/20 text-xs font-bold text-gold-primary">2</div>
                      <span className="text-sm text-slate-dark/70">We&apos;ll call you within 24 hours to discuss options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-primary/20 text-xs font-bold text-gold-primary">3</div>
                      <span className="text-sm text-slate-dark/70">Get your personalized rate quote and pre-approval</span>
                    </li>
                  </ul>
                </div>

                {/* Optional Actions */}
                <div className="space-y-4">
                  <p className="text-sm font-medium text-navy-deep">Want to speak with us now?</p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="tel:480-420-4918"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gold-primary bg-gold-primary/10 px-6 py-3.5 font-semibold text-gold-primary transition-all hover:bg-gold-primary hover:text-navy-deep"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      Call (480) 420-4918
                    </a>
                    <a
                      href="https://calendly.com/tannercook/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-dark/20 px-5 py-3 font-medium text-navy-medium transition-all hover:border-gold-primary/50 hover:bg-cream"
                    >
                      <Calendar className="h-4 w-4 text-gold-primary" aria-hidden="true" />
                      Schedule a Call
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust footer */}
          {!isSubmitted && (
            <div className="border-t border-slate-dark/10 bg-cream/50 px-8 py-4">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-dark/50">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Your information is secure and will never be sold.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
