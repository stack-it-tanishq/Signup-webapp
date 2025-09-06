import { Users, Shield, Utensils, Monitor } from 'lucide-react';
import { content } from '@/lib/content';
import Container from '@/components/ui/container';

export default function Differentiators() {
  const icons = {
    'users': Users,
    'shield': Shield,
    'utensils': Utensils,
    'monitor': Monitor
  };

  const colors = [
    'bg-blue-50 text-blue-600',
    'bg-teal-50 text-teal-600',
    'bg-amber-50 text-amber-600',
    'bg-purple-50 text-purple-600'
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-gray-50" data-testid="differentiators-section">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {content.differentiators.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.differentiators.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {content.differentiators.features.map((feature, index) => {
            const Icon = icons[feature.icon as keyof typeof icons] || Users;
            
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                data-testid={`differentiator-${index}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto ${colors[index]}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3" data-testid={`differentiator-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-600" data-testid={`differentiator-description-${index}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
