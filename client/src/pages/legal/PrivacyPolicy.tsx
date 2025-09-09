import { useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl font-bold text-charcoal mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Effective Date: September 1, 2025</p>

            <div className="prose max-w-none">
              <p className="mb-6">
                At Healio, your privacy matters. We are committed to protecting your personal information and being transparent about how we use it.
              </p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">1. Information We Collect</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and any details you choose to share with us when you sign up or contact us.</li>
                <li><strong>Usage Information:</strong> Pages visited, time spent on our site, and general activity to help us improve our service.</li>
                <li><strong>Health Information (Optional):</strong> If you share health history or goals, we use it only to customize your training experience.</li>
              </ul>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide and personalize your training program</li>
                <li>Communicate with you about sessions, updates, and support</li>
                <li>Improve our website and services</li>
                <li>Send you health and fitness tips (if you opt in)</li>
              </ul>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">3. Sharing Your Information</h2>
              <p className="mb-2">We do not sell your information to anyone.</p>
              <p className="mb-4">We may share your details only with:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Trusted trainers or specialists working with you</li>
                <li>Service providers who help us operate our platform (e.g., email tools)</li>
                <li>If required by law or legal process</li>
              </ul>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">4. Your Choices</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You can request a copy of your data or ask us to delete it anytime.</li>
                <li>You can unsubscribe from marketing emails with one click.</li>
              </ul>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">5. Security</h2>
              <p className="mb-6">
                We use reasonable safeguards to protect your data.
              </p>

              <h2 className="text-xl font-semibold text-charcoal mt-8 mb-4">6. Contact Us</h2>
              <p className="mb-6">
                Questions about this Privacy Policy? Email us at{' '}
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
