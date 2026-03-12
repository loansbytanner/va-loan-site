import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Placeholder for Quiz Section - Story 5/6 */}
        <section id="quiz" className="py-24 bg-navy-deep">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Your Personalized VA Loan Quote
            </h2>
            <p className="text-white/70">
              Quiz funnel coming soon...
            </p>
          </div>
        </section>

        {/* Placeholder for Value Props - Story 4 */}
        <section className="py-24 bg-cream">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-navy-deep text-center mb-4">
              Why Choose Cornerstone for Your VA Loan?
            </h2>
            <p className="text-slate-dark text-center">
              Value proposition sections coming soon...
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
