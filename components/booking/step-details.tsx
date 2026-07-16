"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { detailsSchema, type DetailsFormValues } from "@/lib/validation/booking-schema";

const CITIES = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Brasília, DF",
];

type StepDetailsProps = {
  defaultValues: DetailsFormValues;
  onChange: (values: DetailsFormValues) => void;
  onContinue: (values: DetailsFormValues) => void;
};

export function StepDetails({ defaultValues, onChange, onContinue }: StepDetailsProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues,
  });

  // Mantém o resumo da reserva (preço por dias) atualizado em tempo real,
  // sem esperar o usuário clicar em "Continuar".
  const liveValues = useWatch({ control });
  useEffect(() => {
    onChange({ ...defaultValues, ...liveValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveValues]);

  return (
    <form onSubmit={handleSubmit(onContinue)} className="flex flex-col gap-6" noValidate>
      <h2 className="text-headline-lg text-ink">Datas e retirada</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="pickupLocation">Local de retirada</Label>
          <Controller
            control={control}
            name="pickupLocation"
            render={({ field }) => (
              <Select value={field.value} onValueChange={(value) => value && field.onChange(value)}>
                <SelectTrigger id="pickupLocation" className="w-full">
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.pickupLocation && (
            <p className="text-label-sm text-destructive">{errors.pickupLocation.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="returnLocation">Local de devolução</Label>
          <Controller
            control={control}
            name="returnLocation"
            render={({ field }) => (
              <Select value={field.value} onValueChange={(value) => value && field.onChange(value)}>
                <SelectTrigger id="returnLocation" className="w-full">
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.returnLocation && (
            <p className="text-label-sm text-destructive">{errors.returnLocation.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="pickupDate">Data de retirada</Label>
          <input
            id="pickupDate"
            type="date"
            {...register("pickupDate")}
            className="h-10 rounded-lg border border-white/10 bg-transparent px-3 text-body-md text-ink outline-none [color-scheme:dark] focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500"
          />
          {errors.pickupDate && (
            <p className="text-label-sm text-destructive">{errors.pickupDate.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="returnDate">Data de devolução</Label>
          <input
            id="returnDate"
            type="date"
            {...register("returnDate")}
            className="h-10 rounded-lg border border-white/10 bg-transparent px-3 text-body-md text-ink outline-none [color-scheme:dark] focus-visible:border-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500"
          />
          {errors.returnDate && (
            <p className="text-label-sm text-destructive">{errors.returnDate.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="self-start">
        Continuar
      </Button>
    </form>
  );
}
