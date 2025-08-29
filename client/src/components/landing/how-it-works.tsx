import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";

export default function HowItWorks() {
  const ref = useScrollAnimation();

  const stepColors = [
    "bg-primary-teal/10 text-primary-teal",
    "bg-secondary-sky/10 text-secondary-sky",
    "bg-accent-coral/10 text-accent-coral",
    "bg-gray-100 text-charcoal"
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-off-white" ref={ref} data-testid="how-it-works-section">
      <Container>
        <SectionHeading
          title={content.howItWorks.title}
          subtitle={content.howItWorks.subtitle}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
          {content.howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              data-testid={`step-card-${index}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${stepColors[index]}`}>
                <span className="text-2xl font-bold" data-testid={`step-number-${index}`}>
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-3" data-testid={`step-title-${index}`}>
                {step.title}
              </h3>
              <p className="text-gray-600" data-testid={`step-description-${index}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
