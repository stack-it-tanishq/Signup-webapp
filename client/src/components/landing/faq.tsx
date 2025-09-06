import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { content } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const ref = useScrollAnimation();

  return (
    <section id="faq" className="py-16 lg:py-24 bg-off-white" ref={ref} data-testid="faq-section">
      <Container>
        <SectionHeading
          title={content.faq.title}
          subtitle={content.faq.subtitle}
        />

        <div className="max-w-3xl mx-auto animate-on-scroll">
          <Accordion type="single" collapsible className="space-y-4">
            {content.faq.questions.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left p-6 hover:bg-gray-50 transition-colors duration-200" data-testid={`faq-question-${index}`}>
                  <span className="text-lg font-semibold text-charcoal">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 border-t border-gray-100" data-testid={`faq-answer-${index}`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
