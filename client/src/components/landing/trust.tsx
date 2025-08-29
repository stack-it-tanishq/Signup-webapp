import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";

export default function Trust() {
  const ref = useScrollAnimation();

  return (
    <section id="trust" className="py-16 lg:py-24 bg-gray-50" ref={ref} data-testid="trust-section">
      <Container>
        <SectionHeading
          title={content.trust.title}
          subtitle={content.trust.subtitle}
        />

        {/* Logo Strip Placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 animate-on-scroll mb-16">
          {["Healthcare Partner 1", "Medical Assoc.", "Physio Council", "Health Network"].map((partner, index) => (
            <div key={index} className="flex items-center justify-center" data-testid={`trust-partner-${index}`}>
              <div className="bg-gray-200 rounded-lg p-4 w-32 h-16 flex items-center justify-center">
                <span className="text-gray-500 font-semibold text-sm">{partner}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-on-scroll">
          {content.trust.stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`trust-stat-${index}`}>
              <div className="text-3xl font-bold text-primary-teal mb-2" data-testid={`trust-stat-number-${index}`}>
                {stat.number}
              </div>
              <p className="text-gray-600" data-testid={`trust-stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
