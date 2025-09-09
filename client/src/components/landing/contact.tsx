import React, { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const payload = { name: name.trim(), email: email.trim(), message: message.trim() };
  
      // Basic client-side guard
      if (!payload.name || !payload.email || !payload.message) {
        toast({
          title: "Missing fields",
          description: "Please fill all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
  
      console.log('Submitting contact form with payload:', payload);
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', res.status);
      const responseData = await res.json().catch(() => ({}));
      console.log('Response data:', responseData);
  
      if (res.ok) {
        toast({
          title: "📩 Message sent!",
          description: "Our team will reply within 24 hours - keep an eye on your inbox.",
          duration: 5000,
        });
  
        // Clear form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        // try to parse JSON error body
        const body = await res.json().catch(() => ({}));
        const serverMessage = body?.error || body?.message || "Failed to send message";
  
        // If Zod validation errors returned, show first one
        if (Array.isArray(body?.errors) && body.errors.length > 0) {
          const firstErr = body.errors[0];
          toast({
            title: "Validation error",
            description: firstErr?.message || JSON.stringify(firstErr),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: serverMessage,
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      toast({
        title: "Error",
        description: `Failed to send message: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              className="w-full" 
              data-testid="contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            <Toaster />
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Email: <a href="mailto:support@healio.fit" className="underline">support@healio.fit</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
