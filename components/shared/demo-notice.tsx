import type { ReactNode } from "react";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

export function DemoNotice({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex gap-3 rounded-lg border border-gold-500/30 bg-gold-500/5 p-4 text-body-md text-ink-muted",
        className
      )}
    >
      <Info className="mt-1 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
