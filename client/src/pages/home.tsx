import Nav from "@/components/landing/nav";
import Hero from "@/components/landing/hero";
import Problem from "@/components/landing/problem";
import Benefits from "@/components/landing/benefits";
import Solution from "@/components/landing/solution";
import HowItWorks from "@/components/landing/how-it-works";
import Differentiators from "@/components/landing/differentiators";
import Trust from "@/components/landing/trust";
import FAQ from "@/components/landing/faq";
import FinalCTA from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="font-inter bg-off-white text-charcoal">
      <Nav />
      <Hero />
      <Problem />
      <Benefits />
      <Solution />
      <HowItWorks />
      <Differentiators />
      <Trust />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
