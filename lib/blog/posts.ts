// Blog content management
import { BlogPost, BlogPostMeta, BlogCategory } from './types';
import { getAllPostsFromStorage, getPostBySlugFromStorage } from './storage';

/**
 * Get all blog posts (sorted by publish date, newest first)
 */
export function getAllPosts(): BlogPost[] {
  const posts = getAllPostsFromStorage();
  return posts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Get post metadata for listing pages
 */
export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, authorNMLS, modifiedDate, tags, ...meta }) => meta);
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPostBySlugFromStorage(slug);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Get all unique categories with post counts
 */
export function getCategoriesWithCounts(): { category: BlogCategory; count: number }[] {
  const posts = getAllPosts();
  const counts = posts.reduce(
    (acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    },
    {} as Record<BlogCategory, number>
  );

  return Object.entries(counts).map(([category, count]) => ({
    category: category as BlogCategory,
    count,
  }));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

/**
 * Get related posts
 */
export function getRelatedPosts(slug: string, limit: number = 4): BlogPostMeta[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];

  const sameCategory = getAllPostsMeta()
    .filter((post) => post.slug !== slug && post.category === currentPost.category);

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherCategory = getAllPostsMeta()
    .filter((post) => post.slug !== slug && post.category !== currentPost.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/**
 * Get all categories for static generation
 */
export function getAllCategories(): BlogCategory[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((post) => post.category))];
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
