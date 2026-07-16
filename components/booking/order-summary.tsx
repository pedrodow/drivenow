import Image from "next/image";
import { Car } from "lucide-react";

import { calculateBookingTotal, getExtras, getProtectionPlans } from "@/lib/data/booking";
import { formatPrice } from "@/lib/format";
import type { Vehicle } from "@/lib/types";

type OrderSummaryProps = {
  vehicle: Vehicle;
  days: number;
  protectionPlanId: string;
  extraIds: string[];
};

export function OrderSummary({ vehicle, days, protectionPlanId, extraIds }: OrderSummaryProps) {
  const protectionPlans = getProtectionPlans();
  const extras = getExtras();

  const protectionPlan = protectionPlans.find((plan) => plan.id === protectionPlanId);
  const selectedExtras = extras.filter((extra) => extraIds.includes(extra.id));

  const rentalTotal = vehicle.pricePerDay * days;
  const protectionTotal = (protectionPlan?.pricePerDay ?? 0) * days;
  const total = calculateBookingTotal({
    pricePerDay: vehicle.pricePerDay,
    days,
    protectionPlanId,
    extraIds,
  });

  return (
    <div className="glass golden-glow rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-graphite-700">
          {vehicle.image ? (
            <Image src={vehicle.image} alt={vehicle.imageAlt} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-faint">
              <Car className="h-6 w-6" aria-hidden="true" />
            </div>
          )}
        </div>
        <div>
          <p className="text-label-sm uppercase tracking-wider text-gold-500">{vehicle.category}</p>
          <p className="text-body-md text-ink">
            {vehicle.brand} {vehicle.name}
          </p>
        </div>
      </div>

      <dl className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-body-md">
        <div className="flex justify-between text-ink-muted">
          <dt>
            {formatPrice(vehicle.pricePerDay)} × {days} {days === 1 ? "diária" : "diárias"}
          </dt>
          <dd className="text-ink">{formatPrice(rentalTotal)}</dd>
        </div>

        {protectionPlan && protectionPlan.pricePerDay > 0 && (
          <div className="flex justify-between text-ink-muted">
            <dt>{protectionPlan.name}</dt>
            <dd className="text-ink">{formatPrice(protectionTotal)}</dd>
          </div>
        )}

        {selectedExtras.map((extra) => (
          <div key={extra.id} className="flex justify-between text-ink-muted">
            <dt>{extra.name}</dt>
            <dd className="text-ink">{formatPrice(extra.pricePerDay * days)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-label-md uppercase tracking-wider text-ink-faint">Total</span>
        <span className="text-headline-lg text-ink">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
