import Container from "@/components/ui/container";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import { Check } from "lucide-react";

export default function Solution() {
  const ref = useScrollAnimation();

  return (
    <section id="solution" className="py-16 lg:py-24 bg-white" ref={ref} data-testid="solution-section">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-on-scroll">
            <img
              src="Image5.jpeg"
              alt="Professional physiotherapist with equipment"
              className="rounded-2xl shadow-lg w-full h-auto transform hover:scale-105 transition-transform duration-300"
              data-testid="solution-image"
            />
          </div>

          <div className="animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-6" data-testid="solution-title">
              {content.solution.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8" data-testid="solution-subtitle">
              {content.solution.subtitle.split('Physiotherapist trainers').map((part, i) => (
                <span key={i}>
                  {i > 0 && <span className="text-primary-teal font-medium">Physiotherapist trainers</span>}
                  {part}
                </span>
              ))}
            </p>

            <div className="space-y-6">
              {content.solution.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4" data-testid={`solution-feature-${index}`}>
                  <div className="w-6 h-6 bg-primary-teal rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2" data-testid={`solution-feature-title-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600" data-testid={`solution-feature-description-${index}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
