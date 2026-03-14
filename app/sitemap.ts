import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vahomeloanpros.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Blog post URLs
  const blogUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate || post.publishDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...blogUrls];
}
