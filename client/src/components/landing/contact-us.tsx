import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";

export default function ContactUs() {
  const ref = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white" ref={ref} data-testid="contact-section">
      <Container>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 lg:p-12 border border-gray-100">
          <SectionHeading
            title="Have a Question? We're Here to Help."
            subtitle="Not sure if Healio is right for you? Send us a message and we'll respond within 24 hours."
            className="text-center mb-8"
          />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary-teal text-white hover:bg-primary-teal/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal focus:ring-offset-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Or email us directly: <a href="mailto:support@healio.com" className="text-primary-teal hover:underline">support@healio.com</a>
              </p>
            </div>
            
            {submitStatus === "success" && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
