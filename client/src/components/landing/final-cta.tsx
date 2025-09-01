import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { apiRequest } from "@/lib/queryClient";
import { content } from "@/lib/content";

export default function FinalCTA() {
  const ref = useScrollAnimation();
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
    <section
      id="final-cta"
      className="py-16 lg:py-24 bg-gradient-to-r from-primary-teal to-secondary-sky"
      ref={ref}
      data-testid="final-cta-section"
    >
      <Container>
        <div className="text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="final-cta-title">
              {content.finalCTA.title}
            </h2>
            <p className="text-xl text-white/90 mb-8" data-testid="final-cta-subtitle">
              {content.finalCTA.subtitle}
            </p>

            {/* Final Email Capture Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6" data-testid="final-cta-form">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`w-full ${emailError ? 'border-red-500' : ''}`}
                  required
                  data-testid="final-cta-email-input"
                />
                {emailError && (
                  <div className="text-red-200 text-sm mt-1" data-testid="final-cta-email-error">
                    {emailError}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={subscriptionMutation.isPending}
                className="bg-accent-coral text-white hover:bg-accent-coral/90 focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="final-cta-submit-button"
              >
                {subscriptionMutation.isPending ? "Joining..." : content.finalCTA.ctaText}
              </Button>
            </form>
            <div className="text-white/80 text-sm" data-testid="final-cta-privacy-text">
              {content.finalCTA.privacyText.split('\n').map((line, i) => (
                <p key={i} className={`${i > 0 ? 'mt-1' : ''} ${i === 0 ? 'font-bold text-white' : ''}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
