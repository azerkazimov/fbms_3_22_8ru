import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  message: z.string().min(10, {
    message: "Сообщение должно содержать не менее 10 символов",
  }),
})

export type MailFormValues = z.infer<typeof formSchema>

