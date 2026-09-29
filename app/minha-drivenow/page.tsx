import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { ReservationCard } from "@/components/account/reservation-card";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Minha DriveNow",
  robots: { index: false, follow: false },
};

export default async function MinhaDriveNowPage() {
  // O proxy só checa se o cookie existe; aqui validamos a sessão de verdade
  // (existe no banco e não expirou).
  const session = await getSession();
  if (!session) {
    redirect("/entrar?redirectTo=/minha-drivenow");
  }

  const { user } = session;
  const firstName = user.name.split(" ")[0];

  // Mais recentes primeiro. `userId` no filtro: cada pessoa só vê as próprias reservas.
  const reservations = await prisma.reservation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-5 py-12 md:px-16">
      <div className="mx-auto max-w-4xl">
        <span className="text-label-md uppercase tracking-[0.3em] text-gold-500">
          Minha DriveNow
        </span>
        <h1 className="mt-2 text-headline-xl text-ink">Olá, {firstName}!</h1>
        <p className="mt-2 text-body-md text-ink-muted">{user.email}</p>

        <h2 className="mt-10 text-headline-lg text-ink">Suas reservas</h2>

        {reservations.length === 0 ? (
          <div className="glass mt-4 rounded-lg p-6">
            <p className="text-body-md text-ink-muted">
              Você ainda não tem reservas. Escolha um veículo e reserve em poucos minutos.
            </p>
            <Button render={<Link href="/frota" />} nativeButton={false} className="mt-6">
              Ver frota
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        )}

        <form action={logoutAction} className="mt-8">
          <Button type="submit" variant="outline">
            <LogOut aria-hidden="true" />
            Sair
          </Button>
        </form>
      </div>
    </div>
  );
}
