import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Check, Shield, Zap, Award, Clock } from 'lucide-react';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { content } from '@/lib/content';

const trustBadges = [
  { icon: Check, text: 'No credit card required' },
  { icon: Shield, text: 'Secure signup' },
  { icon: Clock, text: 'Cancel anytime' },
];

interface TrustBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}
//Test commit
const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => (
  <div className="flex items-center gap-2 text-sm text-gray-100">
    <Icon className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/subscribe', { email });
    },
    onSuccess: () => {
      setEmail('');
      setIsSubmitting(false);
      toast({
        title: 'Success!',
        description: 'Your spot is reserved! Check your email for next steps.',
      });
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      const message = error.message || 'Something went wrong. Please try again.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
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
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setEmailError('');
    subscriptionMutation.mutate(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError && validateEmail(value)) {
      setEmailError('');
    }
  };

  return (
    <section
      id="final-cta"
      className="py-16 lg:py-28 bg-gradient-to-br from-teal-600 to-teal-800"
      data-testid="final-cta-section"
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Header with icon */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="final-cta-title">
              {content.finalCTA.title}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="final-cta-subtitle">
              {content.finalCTA.subtitle}
            </p>
          </div>

          {/* CTA Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-2xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to transform your health?</h3>
              <p className="text-gray-600 mb-6">You’re not late - you’re early</p>
              
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="final-cta-form">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      className={`w-full h-12 text-base ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                      required
                      data-testid="final-cta-email-input"
                    />
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600 text-left">{emailError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 h-12 text-base font-medium transition-colors"
                    data-testid="final-cta-submit-button"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Now'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
            
            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-4">Join the waitlist and get 50% off your first session</p>
              <div className="flex flex-wrap justify-center gap-6">
                {trustBadges.map((badge, index) => (
                  <TrustBadge key={index} icon={badge.icon} text={badge.text} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Trust Badges */}
        <div className="mt-12 md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                <badge.icon className="w-4 h-4" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
