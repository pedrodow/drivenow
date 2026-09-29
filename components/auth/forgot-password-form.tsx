"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DemoNotice } from "@/components/shared/demo-notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordResetAction } from "@/lib/actions/password-reset";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validation/auth-schema";

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string>();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setServerError(undefined);
    const result = await requestPasswordResetAction(values);
    if (result.error) setServerError(result.error);
    else setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col gap-4">
        <p className="text-body-md text-ink">
          Se existir uma conta com esse e-mail, enviamos um link para redefinir a senha. Ele vale
          por 1 hora.
        </p>
        <p className="text-label-md text-ink-muted">
          Não chegou? Confira a caixa de spam ou tente novamente em alguns minutos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail da conta</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-label-sm text-destructive">{errors.email.message}</p>}
      </div>

      <DemoNotice>
        Site de demonstração: o envio de e-mails funciona apenas para o endereço do dono do
        projeto. Se você é visitante, o e-mail pode não chegar.
      </DemoNotice>

      {serverError && (
        <p role="alert" className="text-label-md text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar link"}
      </Button>
    </form>
  );
}
