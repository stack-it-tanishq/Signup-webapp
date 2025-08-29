import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { content } from "@/lib/content";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/subscribe", { email });
    },
    onSuccess: () => {
      setEmail("");
      toast({
        title: "Success!",
        description: "Thank you! We'll be in touch soon.",
      });
    },
    onError: (error: any) => {
      const message = error.message || "Something went wrong. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setEmailError("");
    subscriptionMutation.mutate(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError && validateEmail(value)) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24" data-testid="hero-section">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal mb-6 leading-tight" data-testid="hero-title">
              {content.hero.title}{" "}
              <span className="text-primary-teal">{content.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed" data-testid="hero-subtitle">
              {content.hero.subtitle}
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4" data-testid="hero-email-form">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`w-full ${emailError ? 'border-red-500' : ''}`}
                  required
                  data-testid="hero-email-input"
                />
                {emailError && (
                  <div className="text-red-500 text-sm mt-1" data-testid="hero-email-error">
                    {emailError}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={subscriptionMutation.isPending}
                className="bg-accent-coral text-white hover:bg-accent-coral/90 focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="hero-submit-button"
              >
                {subscriptionMutation.isPending ? "Joining..." : content.hero.ctaText}
              </Button>
            </form>
            <p className="text-sm text-gray-500" data-testid="hero-privacy-text">
              {content.hero.privacyText}
            </p>
          </div>

          <div className="animate-fade-in lg:order-last">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Physiotherapist training client at home"
              className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
              data-testid="hero-image"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
