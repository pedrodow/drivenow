import { Star } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getTestimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section id="depoimentos" className="scroll-mt-24 bg-graphite-950/40 px-5 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Quem já dirigiu"
            title="Clientes que confiam na DriveNow"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 80}
              as="figure"
              className="glass flex h-full flex-col gap-4 rounded-lg p-6"
            >
              <div className="flex gap-0.5" role="img" aria-label={`${testimonial.rating} de 5 estrelas`}>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={
                      starIndex < testimonial.rating
                        ? "h-4 w-4 fill-gold-500 text-gold-500"
                        : "h-4 w-4 text-ink-faint"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-body-md text-ink-muted">
                “{testimonial.quote}”
              </blockquote>
              <figcaption>
                <p className="text-label-md text-ink">{testimonial.name}</p>
                <p className="text-label-sm uppercase tracking-wider text-ink-faint">
                  {testimonial.location}
                </p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
