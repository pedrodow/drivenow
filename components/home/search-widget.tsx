"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CITIES = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Brasília, DF",
];

export function SearchWidget() {
  const router = useRouter();
  const pickupId = useId();
  const pickupDateId = useId();
  const returnDateId = useId();

  const [city, setCity] = useState(CITIES[0]);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ local: city });
    if (pickupDate) params.set("retirada", pickupDate);
    if (returnDate) params.set("devolucao", returnDate);
    router.push(`/frota?${params.toString()}`);
  }

  return (
    <form
      id="buscar"
      onSubmit={handleSubmit}
      className="glass golden-glow grid w-full scroll-mt-28 grid-cols-1 gap-3 rounded-lg p-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end lg:rounded-full lg:p-2"
    >
      <div className="flex flex-col gap-1 px-3 py-1 lg:border-r lg:border-white/10">
        <Label htmlFor={pickupId} className="text-label-sm uppercase tracking-wider text-ink-faint">
          Local de retirada
        </Label>
        <Select value={city} onValueChange={(value) => value && setCity(value)}>
          <SelectTrigger id={pickupId} className="h-auto w-full border-none bg-transparent p-0 text-body-md text-ink focus-visible:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1 px-3 py-1 lg:border-r lg:border-white/10">
        <Label htmlFor={pickupDateId} className="text-label-sm uppercase tracking-wider text-ink-faint">
          Retirada
        </Label>
        <input
          id={pickupDateId}
          type="date"
          required
          value={pickupDate}
          onChange={(event) => setPickupDate(event.target.value)}
          className="h-6 w-full rounded-sm border-none bg-transparent p-0 text-body-md text-ink outline-none [color-scheme:dark] focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </div>

      <div className="flex flex-col gap-1 px-3 py-1">
        <Label htmlFor={returnDateId} className="text-label-sm uppercase tracking-wider text-ink-faint">
          Devolução
        </Label>
        <input
          id={returnDateId}
          type="date"
          required
          value={returnDate}
          onChange={(event) => setReturnDate(event.target.value)}
          className="h-6 w-full rounded-sm border-none bg-transparent p-0 text-body-md text-ink outline-none [color-scheme:dark] focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </div>

      <Button type="submit" size="lg" className="w-full gap-2 lg:w-auto lg:rounded-full lg:px-8">
        <Search className="h-4 w-4" aria-hidden="true" />
        Buscar frota
      </Button>
    </form>
  );
}
