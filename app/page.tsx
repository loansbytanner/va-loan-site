import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VALoanQuiz from '@/components/VALoanQuiz';
import ValueProps from '@/components/ValueProps';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* VA Loan Quiz Funnel */}
        <VALoanQuiz />

        {/* Value Propositions */}
        <ValueProps />
      </main>
      <Footer />
    </>
  );
}
