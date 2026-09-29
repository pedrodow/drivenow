"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Stepper } from "@/components/booking/stepper";
import { OrderSummary } from "@/components/booking/order-summary";
import { StepDetails } from "@/components/booking/step-details";
import { StepExtras } from "@/components/booking/step-extras";
import { StepPayment } from "@/components/booking/step-payment";
import { Confirmation } from "@/components/booking/confirmation";
import { createReservationAction } from "@/lib/actions/reservations";
import { diffInDays } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import type {
  DetailsFormValues,
  ExtrasFormValues,
  PaymentFormValues,
} from "@/lib/validation/booking-schema";

type BookingWizardProps = {
  vehicle: Vehicle;
  initialDetails: Partial<DetailsFormValues>;
  user: { name: string; email: string };
};

export function BookingWizard({ vehicle, initialDetails, user }: BookingWizardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = Math.min(Math.max(Number(searchParams.get("etapa") ?? "1") || 1, 1), 4);

  const [details, setDetails] = useState<DetailsFormValues>({
    pickupLocation: initialDetails.pickupLocation ?? "São Paulo, SP",
    returnLocation: initialDetails.returnLocation ?? initialDetails.pickupLocation ?? "São Paulo, SP",
    pickupDate: initialDetails.pickupDate ?? "",
    returnDate: initialDetails.returnDate ?? "",
  });
  const [extras, setExtras] = useState<ExtrasFormValues>({ protectionPlan: "standard", extras: [] });
  const [confirmation, setConfirmation] = useState<{ total: number; reference: string } | null>(null);
  const [submitError, setSubmitError] = useState<string>();

  // Pré-preenche com a conta logada; o resto o cliente digita.
  const paymentDefaults: PaymentFormValues = {
    fullName: user.name,
    cpf: "",
    email: user.email,
    phone: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  };

  const days =
    details.pickupDate && details.returnDate
      ? diffInDays(details.pickupDate, details.returnDate)
      : 1;

  function goToStep(next: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("etapa", String(next));
    router.push(`${pathname}?${params.toString()}`);
  }

  async function handlePaymentSubmit(payment: PaymentFormValues) {
    // Os dados de pagamento (checkout de demonstração) só validam o formulário
    // aqui no navegador: NUNCA são enviados ao servidor. Só datas, locais e
    // extras vão para a action, que recalcula o total por conta própria.
    void payment;
    setSubmitError(undefined);

    const result = await createReservationAction({
      vehicleSlug: vehicle.slug,
      details,
      extras,
    });

    if ("error" in result) {
      setSubmitError(result.error);
      return;
    }

    setConfirmation(result);
    goToStep(4);
  }

  if (step === 4 && confirmation) {
    return (
      <Confirmation
        vehicle={vehicle}
        details={details}
        total={confirmation.total}
        reference={confirmation.reference}
      />
    );
  }

  // A confirmação só existe em memória: se o passo 4 for aberto direto por URL
  // (recarregar a página, por exemplo), não há dados para mostrar — volta ao passo 1.
  const activeStep = step === 4 ? 1 : step;

  return (
    <div>
      <div className="mb-10">
        <Stepper currentStep={activeStep} />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {activeStep === 1 && (
            <StepDetails
              defaultValues={details}
              onChange={setDetails}
              onContinue={(values) => {
                setDetails(values);
                goToStep(2);
              }}
            />
          )}
          {activeStep === 2 && (
            <StepExtras
              value={extras}
              onChange={setExtras}
              onContinue={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}
          {activeStep === 3 && (
            <StepPayment
              defaultValues={paymentDefaults}
              error={submitError}
              onSubmit={handlePaymentSubmit}
              onBack={() => goToStep(2)}
            />
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary
            vehicle={vehicle}
            days={days}
            protectionPlanId={extras.protectionPlan}
            extraIds={extras.extras}
          />
        </aside>
      </div>
    </div>
  );
}
