import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cancelReservationAction } from "@/lib/actions/reservations";
import { EXTRAS, PROTECTION_PLANS } from "@/lib/data/booking";
import { formatPrice, todayInBrazil } from "@/lib/format";

export type ReservationView = {
  id: string;
  reference: string;
  vehicleName: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  protectionPlan: string;
  extras: string;
  total: number;
  status: string;
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(
    date
  );
}

function parseExtras(raw: string): string[] {
  try {
    const ids: unknown = JSON.parse(raw);
    if (!Array.isArray(ids)) return [];
    return EXTRAS.filter((extra) => ids.includes(extra.id)).map((extra) => extra.name);
  } catch {
    return [];
  }
}

function getStatus(reservation: ReservationView, today: string) {
  if (reservation.status === "cancelled") {
    return { label: "Cancelada", className: "bg-white/5 text-ink-faint" };
  }
  if (reservation.returnDate < today) {
    return { label: "Concluída", className: "bg-white/5 text-ink-muted" };
  }
  return { label: "Confirmada", className: "bg-gold-500/10 text-gold-500" };
}

export function ReservationCard({ reservation }: { reservation: ReservationView }) {
  const today = todayInBrazil();
  const status = getStatus(reservation, today);
  const canCancel = reservation.status === "confirmed" && reservation.pickupDate >= today;
  const plan = PROTECTION_PLANS.find((item) => item.id === reservation.protectionPlan);
  const extras = parseExtras(reservation.extras);

  return (
    <article className="glass rounded-lg p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-headline-lg text-ink">{reservation.vehicleName}</h3>
          <p className="mt-1 text-label-md text-ink-faint">
            Código <span className="text-gold-500">{reservation.reference}</span>
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-label-md ${status.className}`}>
          {status.label}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-3 text-body-md sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
          <div>
            <dt className="sr-only">Período</dt>
            <dd className="text-ink">
              {formatDate(reservation.pickupDate)} → {formatDate(reservation.returnDate)}
              <span className="text-ink-muted">
                {" "}
                ({reservation.days} {reservation.days === 1 ? "diária" : "diárias"})
              </span>
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
          <div>
            <dt className="sr-only">Locais</dt>
            <dd className="text-ink">
              {reservation.pickupLocation}
              {reservation.returnLocation !== reservation.pickupLocation &&
                ` → ${reservation.returnLocation}`}
            </dd>
          </div>
        </div>
      </dl>

      <p className="mt-3 text-label-md text-ink-muted">
        {plan?.name ?? reservation.protectionPlan}
        {extras.length > 0 && ` · ${extras.join(", ")}`}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-body-md text-ink-muted">
          Total <span className="text-headline-lg text-ink">{formatPrice(reservation.total)}</span>
        </p>
        {canCancel && (
          <form action={cancelReservationAction.bind(null, reservation.id)}>
            <Button type="submit" variant="outline" size="sm">
              Cancelar reserva
            </Button>
          </form>
        )}
      </div>
    </article>
  );
}
