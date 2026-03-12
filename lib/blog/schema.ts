// Schema markup generators for blog posts
import { BlogPost } from './types';

const SITE_URL = 'https://va-loan-site.com'; // Update with actual domain

/**
 * Generate Article schema for a blog post
 */
export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cornerstone First Mortgage',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: post.publishDate,
    dateModified: post.modifiedDate || post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: post.featuredImage
      ? `${SITE_URL}${post.featuredImage}`
      : `${SITE_URL}/og-default.png`,
  };
}

/**
 * Generate BreadcrumbList schema for blog navigation
 */
export function generateBlogBreadcrumbSchema(post: BlogPost, categoryLabel: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryLabel,
        item: `${SITE_URL}/blog/category/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}

/**
 * Extract FAQ sections from content and generate FAQ schema
 */
export function generateFAQSchemaFromContent(content: string) {
  // Look for ## FAQ or ## Frequently Asked Questions sections
  const faqMatch = content.match(/##\s*(?:FAQ|Frequently Asked Questions)[\s\S]*?(?=\n##\s|$)/i);

  if (!faqMatch) return null;

  const faqSection = faqMatch[0];
  const qaPattern = /###\s*(.+?)\n([\s\S]*?)(?=\n###\s|\n##\s|$)/g;
  const faqs: { question: string; answer: string }[] = [];

  let match;
  while ((match = qaPattern.exec(faqSection)) !== null) {
    const question = match[1].trim().replace(/\?$/, '') + '?';
    const answer = match[2].trim().replace(/\n/g, ' ').slice(0, 500);
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  if (faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema from content if applicable
 */
export function generateHowToSchemaFromContent(post: BlogPost) {
  // Check if this is a "how to" style article
  const isHowTo = /how\s+to|step.+by.+step|guide|process/i.test(post.title);
  if (!isHowTo) return null;

  // Look for numbered steps in content
  const stepPattern = /(?:^|\n)(?:\d+\.\s*|\*\s*|###?\s*Step\s*\d+[:.]\s*)(.+)/gm;
  const steps: string[] = [];

  let match;
  while ((match = stepPattern.exec(post.content)) !== null) {
    const step = match[1].trim();
    if (step.length > 10 && step.length < 200) {
      steps.push(step);
    }
  }

  if (steps.length < 3) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  };
}
