import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFaq } from "@/lib/data/faq";

export function FAQSection() {
  const faq = getFaq();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 px-5 py-20 md:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading align="center" eyebrow="Dúvidas" title="Perguntas frequentes" className="mx-auto" />
        </Reveal>

        <Reveal className="mt-10">
          <Accordion className="flex flex-col gap-3">
            {faq.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="glass rounded-lg border-b-0 px-6"
              >
                <AccordionTrigger className="py-5 text-body-lg text-ink hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-body-md text-ink-muted">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
