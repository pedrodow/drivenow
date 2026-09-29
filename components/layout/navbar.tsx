"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/frota", label: "Frota" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite-900/80 backdrop-blur-lg">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 md:px-16"
      >
        <Link
          href="/"
          className="text-headline-lg tracking-tight text-ink outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
        >
          DRIVE<span className="text-gold-500">NOW</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-label-md text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button render={<Link href="/entrar" />} nativeButton={false} variant="ghost">
            Entrar
          </Button>
          <Button render={<Link href="/#buscar" />} nativeButton={false} className="golden-glow">
            Reservar agora
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menu de navegação"
              />
            }
          >
            <Menu aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="border-l border-white/10 bg-graphite-800">
            <SheetHeader>
              <SheetTitle className="text-headline-lg text-ink">
                DRIVE<span className="text-gold-500">NOW</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  nativeButton={false}
                  className="rounded-md px-2 py-3 text-body-md text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </SheetClose>
              ))}
              <SheetClose
                render={<Link href="/entrar" />}
                nativeButton={false}
                className="rounded-md px-2 py-3 text-body-md text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                Entrar
              </SheetClose>
            </div>
            <div className="mt-auto p-4">
              <SheetClose
                render={
                  <Button render={<Link href="/#buscar" />} nativeButton={false} className="w-full" />
                }
                nativeButton={false}
              >
                Reservar agora
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
