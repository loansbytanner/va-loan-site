// Blog post types for VA Loan site

export type BlogCategory =
  | 'eligibility'
  | 'credit'
  | 'refinance'
  | 'first-time'
  | 'benefits'
  | 'process'
  | 'comparison';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  authorNMLS?: string;
  publishDate: string;
  modifiedDate?: string;
  featured?: boolean;
  featuredImage?: string;
  readingTime?: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  author: string;
  publishDate: string;
  featured?: boolean;
  featuredImage?: string;
  readingTime?: number;
}

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  'eligibility': 'Eligibility',
  'credit': 'Credit & Financing',
  'refinance': 'Refinance',
  'first-time': 'First-Time Buyers',
  'benefits': 'VA Benefits',
  'process': 'Loan Process',
  'comparison': 'Comparisons',
};

export const CATEGORY_DESCRIPTIONS: Record<BlogCategory, string> = {
  'eligibility': 'Learn about VA loan eligibility requirements',
  'credit': 'Credit scores, financing options, and qualification tips',
  'refinance': 'VA refinance options including IRRRL and cash-out',
  'first-time': 'Guides for first-time veteran homebuyers',
  'benefits': 'Understanding your VA loan benefits',
  'process': 'Step-by-step VA loan process guides',
  'comparison': 'VA loans vs other loan types',
};
