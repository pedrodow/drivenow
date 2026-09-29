"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HelpCategory } from "@/lib/data/help";

// Ignora acentos e maiúsculas: "protecao" encontra "Proteção".
function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function HelpCenter({ categories }: { categories: HelpCategory[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    if (!term) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            normalize(item.question).includes(term) || normalize(item.answer).includes(term)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Label htmlFor="help-search" className="sr-only">
          Buscar na Central de Ajuda
        </Label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
        <Input
          id="help-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busque por cancelamento, documentos, seguro..."
          className="h-12 pl-10 text-base"
        />
      </div>

      <div className="mt-12 flex flex-col gap-12" aria-live="polite">
        {filtered.length === 0 ? (
          <p className="text-center text-body-md text-ink-muted">
            Nenhum resultado para “{query}”. Tente outra palavra ou fale com a gente pelos canais
            abaixo.
          </p>
        ) : (
          filtered.map((category) => (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <h2 id={`cat-${category.id}`} className="text-headline-lg text-ink">
                {category.title}
              </h2>
              <Accordion className="mt-4 flex flex-col gap-3">
                {category.items.map((item) => (
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
            </section>
          ))
        )}
      </div>
    </div>
  );
}
