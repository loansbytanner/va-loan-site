import Link from 'next/link';
import { Clock, ArrowLeft, User } from 'lucide-react';
import { BlogPost as BlogPostType, CATEGORY_LABELS } from '@/lib/blog/types';
import TableOfContents from './TableOfContents';

interface BlogPostProps {
  post: BlogPostType;
}

// Simple markdown-like rendering for content
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} className={`${listType === 'ul' ? 'list-disc' : 'list-decimal'} pl-6 my-4 space-y-2 text-slate-dark`}>
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} id={line.slice(3).toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-bold text-navy-deep mt-10 mb-4 scroll-mt-24">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-xl font-bold text-navy-deep mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    }
    // Bullet lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.slice(2));
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(line.replace(/^\d+\.\s/, ''));
    }
    // Blockquotes (TL;DR sections)
    else if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={index} className="border-l-4 border-gold-primary bg-cream pl-6 py-4 my-6 italic text-slate-dark">
          {line.slice(2)}
        </blockquote>
      );
    }
    // Regular paragraphs
    else if (line.trim()) {
      flushList();
      // Handle bold text
      const formattedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy-deep">$1</strong>');
      elements.push(
        <p key={index} className="text-slate-dark leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    }
  });

  flushList();
  return elements;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-navy-deep to-navy-medium py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-gold-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Category */}
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gold-primary text-navy-deep rounded-full mb-6">
            {CATEGORY_LABELS[post.category]}
          </span>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              <span>{post.author}</span>
              {post.authorNMLS && (
                <span className="text-sm">NMLS #{post.authorNMLS}</span>
              )}
            </div>
            <span>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content with TOC Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="lg:flex lg:gap-12">
          {/* Main Content */}
          <div className="lg:flex-1 max-w-4xl">
            {/* TL;DR Box */}
            <div className="bg-cream border-l-4 border-gold-primary p-6 rounded-r-lg mb-10">
              <h2 className="text-sm font-bold text-navy-deep uppercase tracking-wider mb-2">TL;DR</h2>
              <p className="text-navy-deep font-medium">{post.description}</p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-slate-dark uppercase tracking-wider mb-3">
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-gray-100 text-slate-dark rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 bg-navy-deep rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Get Your VA Loan?
              </h3>
              <p className="text-white/70 mb-6">
                We underwrite directly to VA guidelines with no lender overlays.
              </p>
              <Link
                href="/#quiz"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold-primary text-navy-deep font-semibold rounded-full hover:bg-gold-light transition-colors"
              >
                Get Pre-Qualified Now
              </Link>
            </div>
          </div>

          {/* Sidebar with TOC - Desktop Only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </article>
  );
}
