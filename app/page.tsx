import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VALoanQuiz from '@/components/VALoanQuiz';
import ValueProps from '@/components/ValueProps';
import Footer from '@/components/Footer';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MortgageBroker',
  '@id': 'https://cornerstonefirst.com/#organization',
  name: 'Cornerstone First Mortgage',
  alternateName: 'Cornerstone First',
  description: 'VA loan specialists serving veterans with no lender overlays. We underwrite directly to VA guidelines with no minimum credit score requirements.',
  url: 'https://cornerstonefirst.com',
  logo: 'https://cornerstonefirst.com/logo.png',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-888-555-1234',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English', 'Spanish'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  knowsAbout: [
    'VA Loans',
    'VA Home Loans',
    'Military Mortgages',
    'Veteran Home Buying',
    'VA IRRRL Refinance',
    'VA Cash-Out Refinance',
  ],
  slogan: 'They Served For Us. Now We Serve Them.',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'NMLS',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Nationwide Multistate Licensing System',
    },
    identifier: '173855',
  },
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://cornerstonefirst.com/#website',
  url: 'https://cornerstonefirst.com',
  name: 'Cornerstone First Mortgage - VA Loan Specialists',
  description: 'VA loans for veterans with no lender overlays. Zero down payment, no PMI, no minimum credit score requirements.',
  publisher: {
    '@id': 'https://cornerstonefirst.com/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://cornerstonefirst.com/blog?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'VA Home Loan',
  description: 'VA-backed home loans for eligible veterans, active duty service members, and surviving spouses. Zero down payment, no PMI, competitive rates.',
  provider: {
    '@id': 'https://cornerstonefirst.com/#organization',
  },
  category: 'Mortgage Loan',
  offers: {
    '@type': 'Offer',
    description: 'Zero down payment VA loans with no lender overlays',
    areaServed: 'US',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main>
        <Hero />

        {/* VA Loan Quiz Funnel */}
        <VALoanQuiz />

        {/* Value Propositions */}
        <ValueProps />
      </main>
      <Footer />
    </>
  );
}
