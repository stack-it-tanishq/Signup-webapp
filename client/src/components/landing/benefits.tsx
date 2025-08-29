import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import { Shield, TrendingUp, Heart } from "lucide-react";

export default function Benefits() {
  const ref = useScrollAnimation();

  const icons = [Shield, TrendingUp, Heart];
  const colors = [
    "text-primary-teal bg-primary-teal/10",
    "text-secondary-sky bg-secondary-sky/10",
    "text-accent-coral bg-accent-coral/10"
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-off-white" ref={ref} data-testid="benefits-section">
      <Container>
        <SectionHeading
          title={content.benefits.title}
          subtitle={content.benefits.subtitle}
        />

        <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
          {content.benefits.benefits.map((benefit, index) => {
            const Icon = icons[index];
            
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid={`benefit-card-${index}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colors[index]}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-4" data-testid={`benefit-title-${index}`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600" data-testid={`benefit-description-${index}`}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
