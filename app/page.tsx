import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VALoanQuiz from '@/components/VALoanQuiz';
import ValueProps from '@/components/ValueProps';
import Footer from '@/components/Footer';

const SITE_URL = 'https://vahomeloanpros.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MortgageBroker',
  '@id': `${SITE_URL}/#organization`,
  name: 'Cornerstone First Mortgage',
  alternateName: 'VA Home Loan Pros',
  description: 'VA loan specialists serving veterans with no lender overlays. We underwrite directly to VA guidelines with no minimum credit score requirements. Licensed in 49 states.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.svg`,
  sameAs: [],
  telephone: '+1-480-420-4918',
  email: 'va@cfmtg.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-480-420-4918',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: ['English', 'Spanish'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '49 states licensed',
  },
  knowsAbout: [
    'VA Loans',
    'VA Home Loans',
    'Military Mortgages',
    'Veteran Home Buying',
    'VA IRRRL Refinance',
    'VA Cash-Out Refinance',
    'VA Loan Eligibility',
    'Certificate of Eligibility',
    'VA Funding Fee',
    'No Credit Score Minimum VA Loans',
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
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'VA Home Loan Pros - Cornerstone First Mortgage',
  description: 'VA loans for veterans with no lender overlays. Zero down payment, no PMI, no minimum credit score requirements. Licensed in 49 states.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: 'VA Home Loan',
  description: 'VA-backed home loans for eligible veterans, active duty service members, and surviving spouses. Zero down payment, no PMI, competitive rates, no lender overlays.',
  provider: {
    '@id': `${SITE_URL}/#organization`,
  },
  category: 'Mortgage Loan',
  offers: {
    '@type': 'Offer',
    description: 'Zero down payment VA loans with no lender overlays and no minimum credit score requirement',
    areaServed: 'US',
  },
  feesAndCommissionsSpecification: 'VA Funding Fee applies (waived for disabled veterans)',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What credit score do I need for a VA loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The VA does not set a minimum credit score requirement. While most lenders require 620-640, Cornerstone First Mortgage underwrites directly to VA guidelines with no credit score overlay. If you are eligible for a VA loan, we can help regardless of credit score.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are VA loan overlays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Overlays are additional requirements that lenders add on top of VA guidelines. Common overlays include minimum credit scores (620-640), stricter debt-to-income limits (41-45%), and employment gap restrictions. Cornerstone First Mortgage does not add overlays - we underwrite directly to VA guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the VA loan down payment requirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VA loans require zero down payment for eligible veterans. This is one of the most significant benefits of the VA loan program. You can finance 100% of the home purchase price.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do VA loans require PMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, VA loans do not require Private Mortgage Insurance (PMI). Instead, there is a one-time VA Funding Fee which can be financed into the loan. Veterans with service-connected disabilities are exempt from the funding fee.',
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
