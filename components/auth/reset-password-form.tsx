"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordAction } from "@/lib/actions/password-reset";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validation/auth-schema";

export function ResetPasswordForm({ token }: { token: string }) {
  const [serverError, setServerError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });

  async function onSubmit(values: ResetPasswordFormValues) {
    setServerError(undefined);
    // Em caso de sucesso a action faz redirect() para /entrar.
    const result = await resetPasswordAction(token, values);
    if (result?.error) setServerError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-label-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-label-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-label-md text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Redefinir senha"}
      </Button>
    </form>
  );
}
