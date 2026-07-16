"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FleetCategory } from "@/lib/types";

const TRANSMISSIONS = [
  { value: "todos", label: "Todos os câmbios" },
  { value: "automatico", label: "Automático" },
  { value: "manual", label: "Manual" },
];

const SORT_OPTIONS = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
];

export function FleetFilters({ categories }: { categories: FleetCategory[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("categoria") ?? "todas";
  const activeTransmission = searchParams.get("cambio") ?? "todos";
  const activeSort = searchParams.get("ordenar") ?? "relevancia";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "todas" || value === "todos" || value === "relevancia") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        <button
          type="button"
          onClick={() => updateParam("categoria", "todas")}
          className={cn(
            "rounded-full border px-4 py-2 text-label-md transition-colors",
            activeCategory === "todas"
              ? "border-gold-500 bg-gold-500/10 text-gold-500"
              : "border-white/10 text-ink-muted hover:text-ink"
          )}
          aria-pressed={activeCategory === "todas"}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => updateParam("categoria", category.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-label-md transition-colors",
              activeCategory === category.slug
                ? "border-gold-500 bg-gold-500/10 text-gold-500"
                : "border-white/10 text-ink-muted hover:text-ink"
            )}
            aria-pressed={activeCategory === category.slug}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por câmbio">
          {TRANSMISSIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateParam("cambio", option.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-label-sm uppercase tracking-wide transition-colors",
                activeTransmission === option.value
                  ? "border-gold-500 bg-gold-500/10 text-gold-500"
                  : "border-white/10 text-ink-faint hover:text-ink"
              )}
              aria-pressed={activeTransmission === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="ordenar" className="text-label-sm uppercase tracking-wide text-ink-faint">
            Ordenar
          </label>
          <Select
            value={activeSort}
            onValueChange={(value) => value && updateParam("ordenar", value)}
          >
            <SelectTrigger id="ordenar" className="min-w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
