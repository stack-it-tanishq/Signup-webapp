import { Scale, UserX, TrendingDown } from 'lucide-react';
import { content } from '@/lib/content';
import SectionHeading from '@/components/ui/section-heading';
import Container from '@/components/ui/container';

export default function Problem() {
  const icons = {
    'scaling': Scale,
    'user-x': UserX,
    'trending-down': TrendingDown
  };

  return (
    <section id="problem" className="py-16 lg:py-24 bg-white" data-testid="problem-section">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            {content.problem.title}
          </h2>
          <p className="text-xl text-gray-600">
            {content.problem.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {content.problem.issues.map((issue, index) => {
            const Icon = icons[issue.icon as keyof typeof icons] || Scale;
            const colors = [
              'bg-red-50 text-red-600',
              'bg-amber-50 text-amber-600',
              'bg-blue-50 text-blue-600'
            ];
            
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                data-testid={`problem-issue-${index}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colors[index]}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3" data-testid={`problem-title-${index}`}>
                  {issue.title}
                </h3>
                <p className="text-gray-600" data-testid={`problem-description-${index}`}>
                  {issue.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
