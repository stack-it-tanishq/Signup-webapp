import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import { AlertTriangle, X, BarChart3 } from "lucide-react";

export default function Problem() {
  const ref = useScrollAnimation();

  const icons = [AlertTriangle, X, BarChart3];

  return (
    <section id="problem" className="py-16 lg:py-24 bg-white" ref={ref} data-testid="problem-section">
      <Container>
        <SectionHeading
          title={content.problem.title}
          subtitle={content.problem.subtitle}
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-on-scroll">
          {content.problem.issues.map((issue, index) => {
            const Icon = icons[index];
            const colors = ["text-red-500 bg-red-100", "text-orange-500 bg-orange-100", "text-gray-500 bg-gray-100"];
            
            return (
              <div key={index} className="text-center" data-testid={`problem-issue-${index}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colors[index]}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-3" data-testid={`problem-title-${index}`}>
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
