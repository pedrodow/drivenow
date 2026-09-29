"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/lib/actions/auth";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth-schema";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [serverError, setServerError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    setServerError(undefined);
    // Em caso de sucesso a action faz redirect() e esta chamada nunca retorna.
    const result = await loginAction(values, redirectTo);
    if (result?.error) setServerError(result.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="text-label-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-label-sm text-destructive">{errors.password.message}</p>
        )}
        <Link
          href="/esqueci-senha"
          className="self-end text-label-md text-gold-500 underline-offset-4 hover:underline"
        >
          Esqueci minha senha
        </Link>
      </div>

      {serverError && (
        <p role="alert" className="text-label-md text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
