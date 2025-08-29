import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import { Award, Shield, DollarSign, Users } from "lucide-react";

export default function Differentiators() {
  const ref = useScrollAnimation();

  const icons = [Award, Shield, DollarSign, Users];
  const colors = [
    "text-primary-teal bg-primary-teal/10",
    "text-secondary-sky bg-secondary-sky/10", 
    "text-accent-coral bg-accent-coral/10",
    "text-charcoal bg-gray-100"
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white" ref={ref} data-testid="differentiators-section">
      <Container>
        <SectionHeading
          title={content.differentiators.title}
          subtitle={content.differentiators.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
          {content.differentiators.features.map((feature, index) => {
            const Icon = icons[index];
            
            return (
              <div key={index} className="text-center" data-testid={`differentiator-${index}`}>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${colors[index]}`}>
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3" data-testid={`differentiator-title-${index}`}>
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
