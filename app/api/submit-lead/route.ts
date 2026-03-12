import { NextRequest, NextResponse } from 'next/server';

// --- Spam Protection ---

// Rate limiting: max submissions per IP within a time window
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;
const ipSubmissions = new Map<string, { count: number; firstAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipSubmissions.get(ip);
  if (!record || now - record.firstAt > RATE_LIMIT_WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, firstAt: now });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

// Minimum seconds between form render and submit (bots are instant)
const MIN_FORM_TIME_SEC = 3;

// Lead data interface for VA loans
interface LeadData {
  name: string;
  email: string;
  phone: string;
  loanPurpose?: string;
  serviceStatus?: string;
  serviceBranch?: string;
  propertyState?: string;
  propertyType?: string;
  hasProperty?: string;
  creditScore?: string;
  loanAmount?: string;
  source: string;
  medium?: string;
  campaign?: string;
  timestamp: string;
  gclid?: string;
  fbclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
}

// Custom webhook for lead delivery
const CUSTOM_WEBHOOK_URL = 'https://cbmtautos.duckdns.org/webhook/tanner-dscr-leads';

// Helper to format quiz answers for notes
function formatQuizAnswers(lead: LeadData): string {
  const answers = [];

  if (lead.loanPurpose) answers.push(`Loan Purpose: ${lead.loanPurpose}`);
  if (lead.serviceStatus) answers.push(`Service Status: ${lead.serviceStatus}`);
  if (lead.serviceBranch) answers.push(`Service Branch: ${lead.serviceBranch}`);
  if (lead.propertyState) answers.push(`Property State: ${lead.propertyState}`);
  if (lead.propertyType) answers.push(`Property Type: ${lead.propertyType}`);
  if (lead.hasProperty) answers.push(`Has Property: ${lead.hasProperty}`);
  if (lead.creditScore) answers.push(`Credit Score: ${lead.creditScore}`);
  if (lead.loanAmount) answers.push(`Loan Amount: ${lead.loanAmount}`);

  return answers.join('\n');
}

// Determine lead tags based on profile
function getLeadTags(lead: LeadData): string[] {
  const tags = ['VA Loan', 'Website Lead'];

  // Service type tags
  if (lead.serviceStatus) {
    if (lead.serviceStatus === 'active') tags.push('Active Duty');
    if (lead.serviceStatus === 'veteran') tags.push('Veteran');
    if (lead.serviceStatus === 'reserve') tags.push('Reserve/Guard');
    if (lead.serviceStatus === 'spouse') tags.push('Surviving Spouse');
  }

  // Loan purpose tags
  if (lead.loanPurpose) {
    if (lead.loanPurpose === 'purchase') tags.push('Purchase');
    if (lead.loanPurpose === 'refinance') tags.push('Rate/Term Refi');
    if (lead.loanPurpose === 'cashout') tags.push('Cash-Out Refi');
    if (lead.loanPurpose === 'irrrl') tags.push('IRRRL');
  }

  // Credit score tags - highlight low FICO as opportunity (we don't have overlays)
  if (lead.creditScore) {
    if (lead.creditScore === 'below-580' || lead.creditScore === '580-619') {
      tags.push('Low FICO - No Overlay');
    }
  }

  // Urgency tags
  if (lead.hasProperty === 'yes-contract') {
    tags.push('Under Contract', 'URGENT');
  }

  // Loan amount tags
  if (lead.loanAmount === 'over-1m') {
    tags.push('VA Jumbo');
  }

  return tags;
}

// Send to custom webhook (n8n or other automation)
async function sendToCustomWebhook(lead: LeadData): Promise<void> {
  const tags = getLeadTags(lead);
  const quizAnswers = formatQuizAnswers(lead);

  const payload = {
    // Contact info
    name: lead.name,
    email: lead.email,
    phone: lead.phone,

    // Quiz answers
    loan_purpose: lead.loanPurpose,
    service_status: lead.serviceStatus,
    service_branch: lead.serviceBranch,
    property_state: lead.propertyState,
    property_type: lead.propertyType,
    has_property: lead.hasProperty,
    credit_score: lead.creditScore,
    loan_amount: lead.loanAmount,

    // Marketing attribution
    source: lead.source,
    medium: lead.medium || 'organic',
    campaign: lead.campaign || '',
    gclid: lead.gclid || '',
    fbclid: lead.fbclid || '',
    utm_source: lead.utm_source || '',
    utm_medium: lead.utm_medium || '',
    utm_campaign: lead.utm_campaign || '',
    utm_term: lead.utm_term || '',
    utm_content: lead.utm_content || '',
    landing_page: lead.landing_page || '',

    // Metadata
    tags,
    quiz_answers_formatted: quizAnswers,
    source_site: 'va-loan-site',
    lead_type: 'VA Loan',
    timestamp: lead.timestamp,
  };

  try {
    const response = await fetch(CUSTOM_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Custom webhook failed:', response.status, errorText);
      return;
    }

    console.log('VA Loan lead sent to webhook successfully');
  } catch (error) {
    console.error('Custom webhook error:', error);
    // Don't throw - we don't want to fail the form submission if webhook fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limiting
    if (isRateLimited(ip)) {
      console.warn('Rate limited IP:', ip);
      // Return 200 so bots think it worked
      return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = await request.json();

    // Honeypot check — hidden field that real users never fill
    if (body._website) {
      console.warn('Honeypot triggered, rejecting spam from:', ip);
      // Return 200 so bots think it worked
      return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
    }

    // Timing check — reject if form was submitted too fast
    if (body._formStartedAt) {
      const elapsed = (Date.now() - Number(body._formStartedAt)) / 1000;
      if (elapsed < MIN_FORM_TIME_SEC) {
        console.warn('Form submitted too fast:', elapsed, 'seconds from:', ip);
        return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
      }
    }

    const lead: LeadData = body;

    // Basic validation
    if (!lead.name || !lead.email || !lead.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send to webhook
    await sendToCustomWebhook(lead);

    // Log the conversion
    console.log('VA Loan lead submitted:', {
      email: lead.email,
      loanPurpose: lead.loanPurpose,
      serviceStatus: lead.serviceStatus,
      creditScore: lead.creditScore,
      loanAmount: lead.loanAmount,
    });

    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
