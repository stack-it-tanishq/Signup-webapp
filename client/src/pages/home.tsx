import React from 'react';
import Nav from "@/components/landing/nav";
import Hero from "@/components/landing/hero";
import Problem from "@/components/landing/problem";
import Differentiators from "@/components/landing/differentiators";
import Nutrition from "@/components/landing/nutrition";
import HowItWorks from "@/components/landing/how-it-works";
import FAQ from "@/components/landing/faq";
import Contact from "@/components/landing/contact";
import FinalCTA from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="font-inter bg-gray-50 min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <section id="hero">
          <Hero />
        </section>
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Problem />
          </div>
        </section>
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <Differentiators />
          </div>
        </section>
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Nutrition />
          </div>
        </section>
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <HowItWorks />
          </div>
        </section>
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
