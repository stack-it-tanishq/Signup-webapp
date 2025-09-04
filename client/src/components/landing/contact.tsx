import React, { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hook up to backend or email service
    // For now, just log and clear
    console.log({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 overflow-hidden" data-testid="contact-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Image5.jpeg"
          alt="Contact background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-3">
              Have a Question? We’re Here to Help.
            </h2>
            <p className="text-gray-600">
              Not sure if Healio is right for you? Send us a message and we’ll respond within 24 hours.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[140px] rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary-teal to-emerald-500 text-white hover:opacity-90 transition-opacity"
              data-testid="contact-submit"
            >
              Send Message
            </Button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Email: <a href="mailto:support@healio.fit" className="underline">support@healio.fit</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
