import { useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <Container className="py-6">
          <div className="flex justify-end">
            <Button asChild variant="ghost">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </Container>
      </header>

      <main className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: September 1, 2025</p>

            <div className="prose max-w-none">
              <p className="mb-6">
                Welcome to Healio! These Terms of Service ("Terms") govern your access to and use of our services, including our website, mobile applications, and related services (collectively, the "Service").
              </p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">1. Our Service</h2>
              <p className="mb-4">Healio connects adults 40+ with certified movement specialists for personalized fitness and mobility coaching.</p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">2. Eligibility</h2>
              <p className="mb-4">You must be at least 18 years old to use our Service. By using Healio, you represent that you are in good health and have consulted with a healthcare provider regarding your participation in an exercise program.</p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">3. Your Responsibilities</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Keep your account credentials secure</li>
                <li>Attend scheduled sessions on time</li>
                <li>Follow your specialist's instructions</li>
              </ul>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">4. Payments & Cancellations</h2>
              <p className="mb-4">Payment is due at the time of booking. Cancellations require 24 hours' notice for a full refund.</p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">5. Health Disclaimer</h2>
              <p className="mb-4">Healio is not a medical service. Always consult with a healthcare provider before beginning any exercise program.</p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">6. Changes to Services</h2>
              <p className="mb-4">We may modify or discontinue any part of our Service at any time, with or without notice.</p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">7. Contact Us</h2>
              <p className="mb-6">
                Questions? Contact us at{' '}
                <a href="mailto:support@healio.fit" className="text-primary-teal hover:underline">
                  support@healio.fit
                </a>
              </p>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
