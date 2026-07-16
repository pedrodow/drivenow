"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Stepper } from "@/components/booking/stepper";
import { OrderSummary } from "@/components/booking/order-summary";
import { StepDetails } from "@/components/booking/step-details";
import { StepExtras } from "@/components/booking/step-extras";
import { StepPayment } from "@/components/booking/step-payment";
import { Confirmation } from "@/components/booking/confirmation";
import { calculateBookingTotal } from "@/lib/data/booking";
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
};

const EMPTY_PAYMENT: PaymentFormValues = {
  fullName: "",
  cpf: "",
  email: "",
  phone: "",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
};

export function BookingWizard({ vehicle, initialDetails }: BookingWizardProps) {
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

  const days =
    details.pickupDate && details.returnDate
      ? diffInDays(details.pickupDate, details.returnDate)
      : 1;

  function goToStep(next: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("etapa", String(next));
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePaymentSubmit(payment: PaymentFormValues) {
    // Protótipo sem backend: os dados de pagamento nunca são enviados ou
    // armazenados, apenas usados para validar o formulário e avançar a etapa.
    void payment;
    const total = calculateBookingTotal({
      pricePerDay: vehicle.pricePerDay,
      days,
      protectionPlanId: extras.protectionPlan,
      extraIds: extras.extras,
    });
    const reference = `DN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setConfirmation({ total, reference });
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
              defaultValues={EMPTY_PAYMENT}
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
