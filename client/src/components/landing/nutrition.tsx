import Container from "@/components/ui/container";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import { Apple, Carrot, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Nutrition() {
  const ref = useScrollAnimation();
  const { nutrition } = content;

  const icons = [
    <Apple key="apple" className="w-6 h-6 text-primary-teal" />,
    <Carrot key="carrot" className="w-6 h-6 text-primary-teal" />,
    <Heart key="heart" className="w-6 h-6 text-primary-teal" />
  ];

  return (
    <section id="nutrition" className="py-16 lg:py-24 bg-gray-50" ref={ref} data-testid="nutrition-section">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-6" data-testid="nutrition-title">
              {nutrition.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8" data-testid="nutrition-subtitle">
              {nutrition.subtitle}
            </p>
            
            <ul className="space-y-4 mb-8">
              {nutrition.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {icons[index]}
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg font-medium text-charcoal mb-6">
              {nutrition.closingLine}
            </p>

            <Button
              variant="outline"
              className="border-primary-teal text-primary-teal hover:bg-primary-teal/10 transition-colors duration-200"
              data-testid="nutrition-cta"
            >
              {nutrition.cta}
            </Button>
          </div>
          
          <div className="animate-on-scroll order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] bg-gradient-to-br from-primary-teal/10 to-secondary-sky/10">
              <img
                src="/Nutrition2.jpg"
                alt="Healthy nutrition illustration"
                className="w-full h-full object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary-teal/20 -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-secondary-sky/20 -z-10"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
