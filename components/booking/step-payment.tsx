"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentSchema, type PaymentFormValues } from "@/lib/validation/booking-schema";

type StepPaymentProps = {
  defaultValues: PaymentFormValues;
  onSubmit: (values: PaymentFormValues) => void;
  onBack: () => void;
};

export function StepPayment({ defaultValues, onSubmit, onBack }: StepPaymentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <div>
        <h2 className="text-headline-lg text-ink">Seus dados</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input id="fullName" {...register("fullName")} autoComplete="name" />
            {errors.fullName && (
              <p className="text-label-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" placeholder="000.000.000-00" {...register("cpf")} />
            {errors.cpf && <p className="text-label-sm text-destructive">{errors.cpf.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" placeholder="(11) 90000-0000" {...register("phone")} autoComplete="tel" />
            {errors.phone && <p className="text-label-sm text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register("email")} autoComplete="email" />
            {errors.email && <p className="text-label-sm text-destructive">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-headline-lg text-ink">
          <Lock className="h-4 w-4 text-gold-500" aria-hidden="true" />
          Pagamento
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="cardName">Nome impresso no cartão</Label>
            <Input id="cardName" {...register("cardName")} autoComplete="cc-name" />
            {errors.cardName && (
              <p className="text-label-sm text-destructive">{errors.cardName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="cardNumber">Número do cartão</Label>
            <Input
              id="cardNumber"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
              {...register("cardNumber")}
            />
            {errors.cardNumber && (
              <p className="text-label-sm text-destructive">{errors.cardNumber.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
            <Input id="cardExpiry" placeholder="MM/AA" autoComplete="cc-exp" {...register("cardExpiry")} />
            {errors.cardExpiry && (
              <p className="text-label-sm text-destructive">{errors.cardExpiry.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cardCvv">CVV</Label>
            <Input
              id="cardCvv"
              inputMode="numeric"
              placeholder="000"
              autoComplete="cc-csc"
              {...register("cardCvv")}
            />
            {errors.cardCvv && (
              <p className="text-label-sm text-destructive">{errors.cardCvv.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          Voltar
        </Button>
        <Button type="submit" size="lg" className="golden-glow" disabled={isSubmitting}>
          {isSubmitting ? "Confirmando..." : "Finalizar reserva"}
        </Button>
      </div>
    </form>
  );
}
