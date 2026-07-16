import { z } from "zod";

import { isFutureExpiry, isValidCPF, isValidCardNumber } from "@/lib/validators";

export const detailsSchema = z
  .object({
    pickupLocation: z.string().min(1, "Selecione o local de retirada"),
    returnLocation: z.string().min(1, "Selecione o local de devolução"),
    pickupDate: z.string().min(1, "Informe a data de retirada"),
    returnDate: z.string().min(1, "Informe a data de devolução"),
  })
  .refine((data) => new Date(data.returnDate) > new Date(data.pickupDate), {
    message: "A devolução deve ser depois da retirada",
    path: ["returnDate"],
  });

export type DetailsFormValues = z.infer<typeof detailsSchema>;

export const extrasSchema = z.object({
  protectionPlan: z.string().min(1),
  extras: z.array(z.string()),
});

export type ExtrasFormValues = z.infer<typeof extrasSchema>;

export const paymentSchema = z.object({
  fullName: z.string().min(3, "Informe o nome completo"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  cardName: z.string().min(3, "Informe o nome impresso no cartão"),
  cardNumber: z.string().refine(isValidCardNumber, "Número de cartão inválido"),
  cardExpiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Use o formato MM/AA")
    .refine(isFutureExpiry, "Cartão vencido"),
  cardCvv: z.string().regex(/^\d{3,4}$/, "CVV inválido"),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
