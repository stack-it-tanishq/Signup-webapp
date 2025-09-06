import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { content } from "@/lib/content";
import { smoothScrollTo } from "@/utils/smooth-scroll";

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
    <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 min-h-screen flex items-center" data-testid="hero-section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Image2.png" 
          alt="Fitness background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md" data-testid="hero-title">
            {content.hero.title}
            <span className="block bg-gradient-to-r from-primary-teal to-emerald-500 bg-clip-text text-transparent">
              {content.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md" data-testid="hero-subtitle">
            {content.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary-teal to-emerald-500 hover:opacity-90 transition-opacity text-white"
              type="button"
              onClick={() => smoothScrollTo('final-cta', 80)}
              data-testid="hero-primary-cta"
            >
              {content.hero.ctaText}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-orange-500 hover:border-orange-500 transition-colors"
              type="button"
              onClick={() => smoothScrollTo('how-it-works', 80)}
              data-testid="hero-secondary-cta"
            >
              {content.hero.secondaryCta}
            </Button>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-red-500 mb-6">{content.hero.comparison.left.title}</h3>
            <ul className="space-y-4">
              {content.hero.comparison.left.points.map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-primary-teal/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-primary-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommended
            </div>
            <h3 className="text-2xl font-bold text-primary-teal mb-6">{content.hero.comparison.right.title}</h3>
            <ul className="space-y-4">
              {content.hero.comparison.right.points.map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Email Capture Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4 mt-16 justify-center" data-testid="hero-email-form">
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
        <div className="text-sm text-gray-500" data-testid="hero-privacy-text">
          {content.hero.privacyText.split('\n').map((line, i) => (
            <p key={i} className={`${i > 0 ? 'mt-1' : ''} ${i === 0 ? 'font-bold text-primary-teal' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
