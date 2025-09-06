import { User, Users, Calendar, Heart } from 'lucide-react';
import { content } from '@/lib/content';
import Container from '@/components/ui/container';

export default function HowItWorks() {
  const steps = content.howItWorks.steps;
  const icons = {
    'user': User,
    'users': Users,
    'calendar': Calendar,
    'heart': Heart
  };

  const colors = [
    'bg-blue-50 text-blue-600',
    'bg-teal-50 text-teal-600',
    'bg-amber-50 text-amber-600',
    'bg-purple-50 text-purple-600'
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white" data-testid="how-it-works-section">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {content.howItWorks.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Progress line */}
          <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-amber-400 w-4/5"></div>
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = icons[step.icon as keyof typeof icons] || User;
              
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  data-testid={`step-card-${index}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto ${colors[index]}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary-teal text-white flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3 text-center" data-testid={`step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center" data-testid={`step-description-${index}`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
