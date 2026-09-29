import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ title, description, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
      <div className="glass w-full max-w-md rounded-lg p-8">
        <h1 className="text-headline-xl text-ink">{title}</h1>
        <p className="mt-2 text-body-md text-ink-muted">{description}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-body-md text-ink-muted">{footer}</p>
      </div>
    </div>
  );
}
