import { Ban, HeadphonesIcon, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Cancelamento grátis" },
  { icon: Ban, label: "Sem taxas escondidas" },
  { icon: HeadphonesIcon, label: "Assistência 24 horas" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 px-5 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-4 md:justify-between">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-ink-muted">
            <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
            <span className="text-label-md uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
