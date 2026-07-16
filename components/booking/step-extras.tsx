"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getExtras, getProtectionPlans } from "@/lib/data/booking";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ExtrasFormValues } from "@/lib/validation/booking-schema";

type StepExtrasProps = {
  value: ExtrasFormValues;
  onChange: (values: ExtrasFormValues) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function StepExtras({ value, onChange, onContinue, onBack }: StepExtrasProps) {
  const protectionPlans = getProtectionPlans();
  const extraItems = getExtras();

  function toggleExtra(id: string, checked: boolean) {
    onChange({
      ...value,
      extras: checked ? [...value.extras, id] : value.extras.filter((item) => item !== id),
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-headline-lg text-ink">Proteção</h2>
        <RadioGroup
          value={value.protectionPlan}
          onValueChange={(plan) => plan && onChange({ ...value, protectionPlan: plan })}
          className="mt-4 flex flex-col gap-3"
        >
          {protectionPlans.map((plan) => (
            <label
              key={plan.id}
              htmlFor={`plan-${plan.id}`}
              className={cn(
                "glass flex cursor-pointer items-start justify-between gap-4 rounded-lg p-4 transition-colors",
                value.protectionPlan === plan.id && "border-gold-500/60"
              )}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} className="mt-1" />
                <div>
                  <p className="text-body-md text-ink">{plan.name}</p>
                  <p className="text-label-sm text-ink-muted">{plan.description}</p>
                </div>
              </div>
              <span className="whitespace-nowrap text-label-md text-gold-500">
                {plan.pricePerDay > 0 ? `+${formatPrice(plan.pricePerDay)}/dia` : "Incluso"}
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h2 className="text-headline-lg text-ink">Extras opcionais</h2>
        <div className="mt-4 flex flex-col gap-3">
          {extraItems.map((extra) => (
            <label
              key={extra.id}
              htmlFor={`extra-${extra.id}`}
              className="glass flex cursor-pointer items-start justify-between gap-4 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`extra-${extra.id}`}
                  checked={value.extras.includes(extra.id)}
                  onCheckedChange={(checked) => toggleExtra(extra.id, checked === true)}
                  className="mt-1"
                />
                <div>
                  <p className="text-body-md text-ink">{extra.name}</p>
                  <p className="text-label-sm text-ink-muted">{extra.description}</p>
                </div>
              </div>
              <span className="whitespace-nowrap text-label-md text-gold-500">
                +{formatPrice(extra.pricePerDay)}/dia
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          Voltar
        </Button>
        <Button type="button" size="lg" onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
