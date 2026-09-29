import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Informe seu nome completo"),
    email: z.string().email("E-mail inválido"),
    // bcrypt só considera os primeiros 72 bytes; limitar evita senhas que dão
    // falsa sensação de segurança e requisições gigantes.
    password: z
      .string()
      .min(8, "A senha precisa ter no mínimo 8 caracteres")
      .max(72, "A senha pode ter no máximo 72 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha").max(128, "Senha inválida"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
