import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Datas & retirada" },
  { id: 2, label: "Extras & proteção" },
  { id: 3, label: "Pagamento" },
];

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4" aria-label="Etapas da reserva">
      {STEPS.map((step, index) => {
        const isComplete = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-label-sm font-semibold transition-colors",
                  isComplete && "bg-gold-500 text-gold-950",
                  isActive && "border-2 border-gold-500 text-gold-500",
                  !isComplete && !isActive && "border border-white/15 text-ink-faint"
                )}
              >
                {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : step.id}
              </span>
              <span
                className={cn(
                  "hidden text-label-md sm:inline",
                  isActive ? "text-ink" : "text-ink-faint"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={cn("h-px flex-1", isComplete ? "bg-gold-500" : "bg-white/10")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
