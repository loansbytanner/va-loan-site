import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPostsMeta, getCategoriesWithCounts } from '@/lib/blog/posts';
import { CATEGORY_LABELS } from '@/lib/blog/types';

export const metadata: Metadata = {
  title: 'VA Loan Blog | Expert Guides for Veterans | Cornerstone First',
  description: 'Expert VA loan guides, eligibility requirements, and tips for veterans. Learn about VA loan benefits, refinancing, and homebuying.',
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getCategoriesWithCounts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-deep to-navy-medium py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              VA Loan Resources
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Expert guides and articles to help you navigate VA loans and achieve homeownership.
            </p>
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex gap-4 overflow-x-auto">
                <span className="px-4 py-2 text-sm font-medium text-navy-deep whitespace-nowrap">
                  All ({posts.length})
                </span>
                {categories.map(({ category, count }) => (
                  <span
                    key={category}
                    className="px-4 py-2 text-sm font-medium text-slate-dark hover:text-gold-primary whitespace-nowrap cursor-pointer"
                  >
                    {CATEGORY_LABELS[category]} ({count})
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4">
            {posts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-navy-deep mb-4">
                  Coming Soon
                </h2>
                <p className="text-slate-dark">
                  Expert VA loan guides and articles are being prepared for you.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-deep py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have Questions About VA Loans?
            </h2>
            <p className="text-white/70 mb-8">
              Our VA loan specialists are here to help. No lender overlays, direct to VA guidelines.
            </p>
            <a
              href="/#quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-primary text-navy-deep font-semibold rounded-full hover:bg-gold-light transition-colors"
            >
              Get Pre-Qualified Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
