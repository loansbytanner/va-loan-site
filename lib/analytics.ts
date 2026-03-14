// Analytics tracking utilities for GA4 and custom events

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize GA4
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Quiz-specific events
export const trackQuizStart = () => {
  event({
    action: 'quiz_start',
    category: 'engagement',
    label: 'VA Loan Quiz Started',
  });
};

export const trackQuizStep = (step: number, stepName: string) => {
  event({
    action: `quiz_step_${step}`,
    category: 'engagement',
    label: stepName,
    value: step,
  });
};

export const trackQuizComplete = () => {
  event({
    action: 'quiz_complete',
    category: 'engagement',
    label: 'VA Loan Quiz Completed',
  });
};

export const trackLeadSubmit = (data: {
  loanPurpose?: string;
  state?: string;
  creditScore?: string;
}) => {
  event({
    action: 'lead_submit',
    category: 'conversion',
    label: `${data.loanPurpose || 'Unknown'} - ${data.state || 'Unknown'}`,
  });

  // Also track as GA4 conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/lead`,
      event_category: 'form',
      event_label: 'VA Loan Lead',
    });
  }
};

// Phone click tracking
export const trackPhoneClick = () => {
  event({
    action: 'phone_click',
    category: 'engagement',
    label: 'Phone Number Clicked',
  });
};

// Blog engagement
export const trackBlogView = (slug: string, title: string) => {
  event({
    action: 'blog_view',
    category: 'content',
    label: title,
  });
};

export const trackBlogScroll = (slug: string, percentage: number) => {
  event({
    action: 'blog_scroll',
    category: 'engagement',
    label: slug,
    value: percentage,
  });
};

// CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `${ctaName} - ${location}`,
  });
};
