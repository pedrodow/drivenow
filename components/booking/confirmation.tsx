import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import type { DetailsFormValues } from "@/lib/validation/booking-schema";

type ConfirmationProps = {
  vehicle: Vehicle;
  details: DetailsFormValues;
  total: number;
  reference: string;
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(
    date
  );
}

export function Confirmation({ vehicle, details, total, reference }: ConfirmationProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
        <Check className="h-8 w-8 text-gold-500" aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-headline-xl text-ink">Reserva confirmada!</h2>
      <p className="mt-3 text-body-md text-ink-muted">
        Sua reserva foi salva na sua conta. Por ser um projeto de demonstração, nenhum e-mail foi
        enviado e nenhum pagamento foi cobrado. Em uma locadora real, você apresentaria o código
        abaixo na retirada do veículo.
      </p>

      <div className="glass golden-glow mt-8 w-full rounded-lg p-6 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-label-sm uppercase tracking-wider text-ink-faint">
            Código da reserva
          </span>
          <span className="text-headline-lg text-gold-500">{reference}</span>
        </div>

        <dl className="mt-4 flex flex-col gap-3 text-body-md">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Veículo</dt>
            <dd className="text-ink">
              {vehicle.brand} {vehicle.name}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Retirada</dt>
            <dd className="text-ink">
              {details.pickupLocation} · {formatDate(details.pickupDate)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Devolução</dt>
            <dd className="text-ink">
              {details.returnLocation} · {formatDate(details.returnDate)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <dt className="text-label-md uppercase tracking-wider text-ink-faint">Total</dt>
            <dd className="text-headline-lg text-ink">{formatPrice(total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" variant="outline" render={<Link href="/frota" />} nativeButton={false}>
          Ver outros veículos
        </Button>
        <Button size="lg" render={<Link href="/minha-drivenow" />} nativeButton={false}>
          Ver minhas reservas
        </Button>
      </div>
    </div>
  );
}
