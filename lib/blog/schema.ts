// Schema markup generators for blog posts
import { BlogPost } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vahomeloanpros.com';

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
        url: `${SITE_URL}/logo.svg`,
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
      : `${SITE_URL}/og-image.svg`,
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
 * Strip markdown formatting from text
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Bold **text**
    .replace(/\*(.+?)\*/g, '$1')     // Italic *text*
    .replace(/`(.+?)`/g, '$1')       // Code `text`
    .replace(/^\*+|\*+$/g, '')       // Leading/trailing asterisks
    .trim();
}

/**
 * Generate HowTo schema from content if applicable
 */
export function generateHowToSchemaFromContent(post: BlogPost) {
  // Check if this is a "how to" style article
  const isHowTo = /how\s+to|step.+by.+step|guide|process/i.test(post.title);
  if (!isHowTo) return null;

  // Look for numbered steps in content (explicit numbered lists only)
  const stepPattern = /(?:^|\n)(\d+)\.\s+(.+)/gm;
  const steps: string[] = [];

  let match;
  while ((match = stepPattern.exec(post.content)) !== null) {
    const stepText = stripMarkdown(match[2]);
    // Only include actual instructional steps, not headers or short items
    if (stepText.length > 15 && stepText.length < 300 && !stepText.startsWith('*')) {
      steps.push(stepText);
    }
  }

  // Need at least 3 meaningful steps
  if (steps.length < 3) return null;

  // Limit to first 10 steps for cleaner schema
  const limitedSteps = steps.slice(0, 10);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.description,
    step: limitedSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step,
    })),
  };
}
