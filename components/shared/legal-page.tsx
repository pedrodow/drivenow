import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { DemoNotice } from "@/components/shared/demo-notice";

export type LegalSection = { title: string; body: ReactNode };

type LegalPageProps = {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <div className="px-5 py-12 md:px-16">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: title }]} />

        <h1 className="text-headline-xl text-ink">{title}</h1>
        <p className="mt-2 text-label-md text-ink-faint">Última atualização: {updatedAt}</p>
        <p className="mt-6 text-body-lg text-ink-muted">{intro}</p>

        <DemoNotice className="mt-8">
          Documento de demonstração: a DriveNow é um projeto de estudo e portfólio, não uma
          empresa real.
        </DemoNotice>

        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-headline-lg text-ink">{section.title}</h2>
              <div className="mt-3 flex flex-col gap-3 text-body-md text-ink-muted">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
