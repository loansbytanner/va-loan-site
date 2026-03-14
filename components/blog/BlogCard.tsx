import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import { BlogPostMeta, CATEGORY_LABELS } from '@/lib/blog/types';

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Featured Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-navy-deep to-navy-medium relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl text-white/20 font-bold">VA</span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-gold-primary text-navy-deep rounded-full">
            {CATEGORY_LABELS[post.category]}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-slate-dark mb-3">
          <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          {post.readingTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold text-navy-deep mb-2 line-clamp-2 group-hover:text-gold-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-dark line-clamp-2 mb-4">
          {post.description}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-navy-deep hover:text-gold-primary transition-colors"
        >
          Read: {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
