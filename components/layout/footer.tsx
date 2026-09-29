import Link from "next/link";
import { AtSign, Camera, MessageCircle } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/frota", label: "Frota" },
  { href: "/#faq", label: "Perguntas frequentes" },
  { href: "#", label: "Privacidade" },
  { href: "#", label: "Termos de uso" },
  { href: "#", label: "Contato" },
];

const SOCIALS = [
  { href: "#", label: "WhatsApp", icon: MessageCircle },
  { href: "#", label: "E-mail", icon: AtSign },
  { href: "#", label: "Galeria de fotos", icon: Camera },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-graphite-950 px-5 py-16 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-headline-lg tracking-tight text-ink">
            DRIVE<span className="text-gold-500">NOW</span>
          </Link>
          <nav aria-label="Links institucionais" className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-body-md text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-body-md text-ink-muted">
            Central de atendimento: <span className="text-ink">0800 555 0199</span>
            <br />
            Atendimento 24 horas, todos os dias.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gold-500 hover:text-gold-950"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-label-sm text-ink-faint">
          <p>
            Projeto de estudo e portfólio: a DriveNow é uma locadora fictícia. Nenhuma reserva ou
            pagamento é real, e as imagens dos veículos foram geradas por IA.
          </p>
          <p className="uppercase tracking-[0.2em]">© {new Date().getFullYear()} DriveNow</p>
        </div>
      </div>
    </footer>
  );
}
