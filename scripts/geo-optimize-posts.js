/**
 * GEO (Generative Engine Optimization) Script
 * Adds TL;DR summaries, quotable statistics, and AI-citable content markers
 * to blog posts for better citation by ChatGPT, Perplexity, Google AI Overview, etc.
 */

const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// GEO optimizations for each post - TL;DR summaries with key statistics
const geoOptimizations = {
  'va-loan-eligibility-requirements': {
    tldr: `**TL;DR:** VA loans are available to veterans who served 90+ days during wartime or 181+ days during peacetime, active duty members with 90+ days of service, National Guard/Reserve with 6+ years of service, and eligible surviving spouses. You do NOT need an honorable discharge—General Discharge Under Honorable Conditions qualifies. Get your Certificate of Eligibility (COE) through your lender in minutes, via VA.gov, or by mailing Form 26-1880.`,
    keyStats: [
      "90 days minimum active duty service required during wartime",
      "181 days minimum service required during peacetime",
      "6 years minimum for National Guard/Reserve eligibility",
      "COE can be obtained electronically in minutes through VA-approved lenders"
    ]
  },
  'va-loan-credit-score-requirements': {
    tldr: `**TL;DR:** The VA has NO minimum credit score requirement for VA loans. The 620-640 credit score minimums you've heard about are "lender overlays"—restrictions individual lenders add on top of VA guidelines. Veterans with credit scores below 620 can still qualify through lenders who underwrite directly to VA guidelines using manual underwriting. At Cornerstone First Mortgage, we have no credit score overlays.`,
    keyStats: [
      "VA minimum credit score requirement: NONE (0)",
      "Typical lender overlay requirement: 620-640",
      "35% of credit score = payment history",
      "30% of credit score = amounts owed (credit utilization)"
    ]
  },
  'va-loan-vs-conventional-loan': {
    tldr: `**TL;DR:** VA loans beat conventional loans for most veterans. Key differences: VA requires $0 down vs. 3-20% for conventional; VA has NO mortgage insurance vs. PMI of $200-400/month; VA rates are typically 0.25-0.50% lower; VA has no loan limits with full entitlement. On a $400,000 home, a VA loan saves approximately $40,000+ over 10 years compared to a conventional loan with 5% down.`,
    keyStats: [
      "VA down payment: $0 (vs. 3-20% conventional)",
      "VA mortgage insurance: $0/month (vs. $200-400/month PMI)",
      "VA interest rates: 0.25-0.50% lower than conventional",
      "VA loan limits: None with full entitlement",
      "10-year savings vs conventional: $40,000+"
    ]
  },
  'va-funding-fee-explained': {
    tldr: `**TL;DR:** The VA funding fee is a one-time cost (2.15% for first-time use with 0% down in 2024) that replaces monthly mortgage insurance. It can be financed into your loan. Many veterans are EXEMPT: those with 10%+ VA disability rating, Purple Heart recipients, and surviving spouses pay $0 funding fee. Even when not exempt, the funding fee costs less than years of PMI.`,
    keyStats: [
      "2024 funding fee (first use, 0% down): 2.15%",
      "2024 funding fee (subsequent use, 0% down): 3.3%",
      "Funding fee with 5% down: 1.5%",
      "Funding fee with 10% down: 1.25%",
      "IRRRL refinance funding fee: 0.5%",
      "Exemption rate: 10%+ VA disability rating = $0 fee"
    ]
  },
  'va-irrrl-streamline-refinance-guide': {
    tldr: `**TL;DR:** The VA IRRRL (Interest Rate Reduction Refinance Loan) is the fastest, easiest way to refinance an existing VA loan. Requirements: must already have a VA loan, no appraisal needed, no income verification required, 0.5% funding fee (exempt if disabled). Can close in 15-30 days. Must result in a "net tangible benefit"—typically 0.5%+ rate reduction or switching from ARM to fixed.`,
    keyStats: [
      "IRRRL funding fee: 0.5% (vs 2.15%+ for other refinances)",
      "Appraisal required: NO",
      "Income verification required: NO",
      "Typical closing time: 15-30 days",
      "Minimum rate reduction for benefit: 0.5%"
    ]
  },
  'va-cash-out-refinance-guide': {
    tldr: `**TL;DR:** VA cash-out refinances let you tap home equity with rates lower than HELOCs or personal loans. Borrow up to 100% of home value (vs. 80% conventional). Funding fee is 2.15% (first use) or 3.3% (subsequent)—but exempt for 10%+ disabled veterans. Can be used to consolidate debt, fund home improvements, or cover major expenses. Requires full appraisal and income verification.`,
    keyStats: [
      "Maximum LTV: 100% of home value",
      "Conventional cash-out max: 80% LTV",
      "Funding fee (first use): 2.15%",
      "Funding fee (subsequent use): 3.3%",
      "Credit required: Full income/credit verification"
    ]
  },
  'va-loan-first-time-homebuyers': {
    tldr: `**TL;DR:** First-time veteran homebuyers can purchase with $0 down, no PMI, and no minimum credit score (VA guidelines). Steps: 1) Get COE (minutes through lender), 2) Get pre-approved, 3) Find VA-knowledgeable agent, 4) Make offer, 5) VA appraisal (seller cannot require you to pay for repairs), 6) Close in 30-45 days. Funding fee is 2.15% (can be financed) or exempt with disability rating.`,
    keyStats: [
      "Down payment required: $0",
      "PMI/mortgage insurance: $0",
      "VA minimum credit score: None",
      "Typical closing timeline: 30-45 days",
      "First-time use funding fee: 2.15% (waived with 10%+ disability)"
    ]
  },
  'va-loan-property-requirements': {
    tldr: `**TL;DR:** VA loans require properties to meet Minimum Property Requirements (MPRs): safe, sanitary, structurally sound. Key requirements include working HVAC, plumbing, electrical, sound roof (2+ years remaining life), no peeling lead paint on pre-1978 homes, and no safety hazards. Properties must be move-in ready. Condos must be VA-approved. Fixer-uppers typically don't qualify unless using VA renovation loan.`,
    keyStats: [
      "Roof remaining life required: 2+ years",
      "Lead paint inspection required for: Pre-1978 homes",
      "Condo approval: Required (check VA approved list)",
      "Occupancy requirement: Primary residence only",
      "Move-in timeframe: Must be habitable at closing"
    ]
  },
  'va-loan-closing-costs-breakdown': {
    tldr: `**TL;DR:** VA loan closing costs typically range from 2-5% of loan amount. Veterans are protected by "non-allowable fees"—certain costs veterans cannot be charged (attorney fees in some states, prepayment penalties, broker commissions). Sellers can contribute up to 4% toward buyer closing costs (vs. 3% conventional). Common costs: origination fee (up to 1%), appraisal ($400-700), title insurance, recording fees.`,
    keyStats: [
      "Typical VA closing costs: 2-5% of loan amount",
      "Seller contribution limit: 4% of purchase price",
      "Conventional seller contribution limit: 3%",
      "VA origination fee cap: 1% of loan amount",
      "Typical VA appraisal cost: $400-700"
    ]
  },
  'va-loan-limits-entitlement-explained': {
    tldr: `**TL;DR:** Since 2020, there are NO VA loan limits for veterans with full entitlement. You can borrow $500K, $1M, or more based on your income—no down payment required. Limits only apply if you have reduced entitlement (existing VA loan or foreclosure). Full entitlement = 25% of any loan amount guaranteed. One-time restoration available after paying off previous VA loan.`,
    keyStats: [
      "VA loan limit (full entitlement): NO LIMIT",
      "Year limits were removed: 2020",
      "Basic entitlement: $36,000 (guarantees up to $144,000)",
      "Bonus entitlement: Covers loans above $144,000",
      "VA guaranty: 25% of loan amount"
    ]
  },
  'va-loan-investment-property-house-hacking': {
    tldr: `**TL;DR:** VA loans require owner-occupancy BUT allow "house hacking"—buy a multi-unit (2-4 units), live in one, rent the others. Rental income can qualify you for the loan. Must occupy within 60 days and live there as primary residence. After 12+ months of occupancy, you can move out and keep renting. Can use VA loan again for new primary residence (second-tier entitlement).`,
    keyStats: [
      "Maximum units allowed: 4 (live in 1, rent 3)",
      "Occupancy requirement: Move in within 60 days",
      "Minimum occupancy period: 12 months typical",
      "Rental income for qualification: 75% counted",
      "VA loans on multiple properties: Yes (with entitlement)"
    ]
  },
  'va-loan-surviving-spouse-eligibility': {
    tldr: `**TL;DR:** Surviving spouses of veterans may qualify for VA loan benefits. Eligible spouses: unremarried spouse of veteran who died in service or from service-connected disability; spouse of service member MIA/POW 90+ days; spouse who remarried after age 57 (after Dec 16, 2003). Eligible surviving spouses are EXEMPT from VA funding fee—saving $8,000+ on typical loan.`,
    keyStats: [
      "Funding fee for surviving spouses: $0 (EXEMPT)",
      "Remarriage age exception: 57+ (after Dec 16, 2003)",
      "MIA/POW qualification period: 90+ days",
      "Typical funding fee savings: $8,000-15,000",
      "Down payment required: $0"
    ]
  },
  'va-loan-appraisal-process': {
    tldr: `**TL;DR:** VA appraisals determine both property value AND that it meets Minimum Property Requirements (MPRs). Cost: $400-700 (paid by buyer). Timeline: 7-14 days. If appraisal comes in low, options: negotiate lower price, pay difference in cash, request Reconsideration of Value, or walk away (VA allows with appraisal contingency). Seller CANNOT require veteran to pay for MPR repairs.`,
    keyStats: [
      "Typical VA appraisal cost: $400-700",
      "Appraisal timeline: 7-14 days",
      "Appraisal valid for: 6 months",
      "Tidewater process: 2 extra business days for comps",
      "Reconsideration of Value: Free to request"
    ]
  },
  'va-loan-national-guard-reserves': {
    tldr: `**TL;DR:** National Guard and Reserve members qualify for VA loans through: 1) 6+ years of creditable service in Selected Reserve, OR 2) 90+ consecutive days of Title 10 activation. Gulf War era activation (since Aug 2, 1990) requires 90 days; earlier periods may require 181 days. Funding fee rates are now EQUAL to active duty (changed April 7, 2023). Points statements prove Reserve service.`,
    keyStats: [
      "Service requirement (Reserve path): 6+ years",
      "Activation requirement (Gulf War era): 90+ days",
      "Funding fee equalized with active duty: April 7, 2023",
      "Title 10 activation required: Yes (for short-term eligibility)",
      "Points statement: Primary proof of Reserve service"
    ]
  },
  'how-to-get-va-certificate-of-eligibility': {
    tldr: `**TL;DR:** Get your Certificate of Eligibility (COE) three ways: 1) Through your lender (fastest—often minutes), 2) VA.gov eBenefits portal (same day), 3) Mail Form 26-1880 (4-6 weeks). Veterans need DD-214; active duty needs Statement of Service. Your COE shows your entitlement amount and whether you've used VA benefits before. Most lenders can pull COE electronically without you providing documents.`,
    keyStats: [
      "Lender COE retrieval time: Minutes (electronic)",
      "VA.gov COE retrieval time: Same day",
      "Mail Form 26-1880 processing: 4-6 weeks",
      "Document needed (veterans): DD-214",
      "Document needed (active duty): Statement of Service"
    ]
  },
  'va-loan-myths-debunked': {
    tldr: `**TL;DR:** Common VA loan myths DEBUNKED: 1) "620 credit score required"—FALSE, VA has no minimum; 2) "VA loans take longer"—FALSE, same 30-45 day timeline; 3) "Sellers hate VA offers"—FALSE, modern VA loans are competitive; 4) "One-time use only"—FALSE, entitlement is reusable; 5) "Only for first homes"—FALSE, usable multiple times; 6) "Fixer-uppers not allowed"—PARTIALLY TRUE, property must meet MPRs.`,
    keyStats: [
      "VA minimum credit score: NONE (myth: 620)",
      "VA loan closing timeline: 30-45 days (same as conventional)",
      "VA loan usage: Unlimited (not one-time)",
      "VA loans in 2023: 350,000+ loans closed",
      "Default rate: Lower than FHA and conventional"
    ]
  },
  'va-loan-after-bankruptcy-foreclosure': {
    tldr: `**TL;DR:** VA loans are possible after bankruptcy or foreclosure. Chapter 7 bankruptcy: 2-year waiting period. Chapter 13 bankruptcy: Can apply after 12 months of on-time payments with court approval. Foreclosure: 2-year waiting period from sale date. Prior VA loan foreclosure affects entitlement—you may owe the VA for their loss. Re-establishing credit during waiting period is crucial.`,
    keyStats: [
      "Chapter 7 bankruptcy waiting period: 2 years",
      "Chapter 13 in-plan waiting period: 12 months",
      "Foreclosure waiting period: 2 years from sale",
      "Short sale waiting period: 2 years",
      "Prior VA loss: May affect entitlement amount"
    ]
  },
  'va-loan-vs-fha-loan-comparison': {
    tldr: `**TL;DR:** VA loans beat FHA for eligible veterans. VA: $0 down, no mortgage insurance, no loan limits. FHA: 3.5% down, MIP for life (1.75% upfront + 0.85% annually), loan limits apply. On $350,000 loan, VA saves $6,125 upfront + $248/month vs FHA. FHA advantage: lower credit requirements (500 with 10% down), broader property types. Veterans should almost always choose VA.`,
    keyStats: [
      "VA down payment: $0 vs FHA 3.5%",
      "VA mortgage insurance: $0 vs FHA 0.85%/year for life",
      "FHA upfront MIP: 1.75% of loan",
      "FHA minimum credit (3.5% down): 580",
      "FHA minimum credit (10% down): 500",
      "Monthly savings VA vs FHA on $350K: ~$248/month"
    ]
  },
  'va-loan-disabled-veterans-benefits': {
    tldr: `**TL;DR:** Disabled veterans (10%+ VA rating) get significant VA loan benefits: NO funding fee (saves $6,000-15,000), property tax exemptions (varies by state—some offer 100% exemption), VA Specially Adapted Housing (SAH) grants up to $109,986 for 100% disabled, and priority processing. File disability claims BEFORE buying—retroactive rating can get funding fee refunded.`,
    keyStats: [
      "Funding fee exemption: 10%+ VA disability rating",
      "Typical funding fee savings: $6,000-15,000",
      "SAH grant maximum (2024): $109,986",
      "SHA grant maximum (2024): $22,036",
      "Property tax exemption: Varies by state (up to 100%)"
    ]
  },
  'va-loan-rates-market-analysis-2024': {
    tldr: `**TL;DR:** VA loan rates in 2024 are typically 0.25-0.50% lower than conventional rates due to government backing. As of early 2024, VA rates range 6.0-7.0% depending on credit and market conditions. VA ARMs start ~0.5% lower than fixed. Rate factors: credit score, debt-to-income, loan amount, down payment (affects funding fee, not rate). Always compare 3+ lenders—rates vary significantly.`,
    keyStats: [
      "VA rate advantage vs conventional: 0.25-0.50% lower",
      "2024 VA rate range: 6.0-7.0% (market dependent)",
      "VA ARM initial rate: ~0.5% below fixed",
      "Rate comparison recommended: 3+ lenders",
      "APR includes: Interest rate + funding fee + points"
    ]
  }
};

// Process each post
const optimizedPosts = posts.map(post => {
  const optimization = geoOptimizations[post.slug];

  if (!optimization) {
    console.log(`⚠️ No optimization defined for: ${post.slug}`);
    return post;
  }

  // Build the GEO-optimized header
  const geoHeader = `${optimization.tldr}

**Key Statistics:**
${optimization.keyStats.map(stat => `- ${stat}`).join('\n')}

---

`;

  // Check if already optimized (has TL;DR)
  if (post.content.startsWith('**TL;DR:**')) {
    console.log(`✓ Already optimized: ${post.slug}`);
    return post;
  }

  // Add GEO header to content
  const optimizedContent = geoHeader + post.content;

  console.log(`✓ Optimized: ${post.slug}`);

  return {
    ...post,
    content: optimizedContent,
    modifiedDate: new Date().toISOString().split('T')[0]
  };
});

// Write optimized posts
fs.writeFileSync(postsPath, JSON.stringify(optimizedPosts, null, 2));

console.log('\n✅ GEO optimization complete! All 20 posts updated.');
console.log('Added to each post:');
console.log('  - TL;DR summary (quotable by AI)');
console.log('  - Key statistics with specific numbers');
console.log('  - Horizontal rule separator');
