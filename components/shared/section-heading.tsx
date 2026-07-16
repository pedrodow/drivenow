import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-label-md uppercase tracking-[0.3em] text-gold-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-2 text-headline-xl text-ink">{title}</h2>
      {description ? (
        <p className="mt-4 text-body-md text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
