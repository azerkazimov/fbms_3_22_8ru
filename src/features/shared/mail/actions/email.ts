"use server"

import nodemailer from "nodemailer"
import { formSchema, MailFormValues } from "../mail-form-schema"

// Тип ответа сервера
export type EmailResponse = {
  success: boolean
  message: string
}

// Создаем транспорт для отправки email
// Для продакшена рекомендуется использовать реальный SMTP сервер
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "", // Используйте переменные окружения
    pass: process.env.SMTP_PASSWORD || "", // Используйте переменные окружения
  },
})

export async function sendContactEmail(formData: MailFormValues): Promise<EmailResponse> {
  try {
    // Валидация данных формы
    const validatedFields = formSchema.safeParse(formData)

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Ошибка валидации данных формы",
      }
    }

    const { name, email, message } = validatedFields.data

    // Настройка email сообщения
    const mailOptions = {
      from: process.env.SMTP_USER || "",
      to: process.env.RECIPIENT_EMAIL || "azer.kazimov@yahoo.com", // Используйте переменные окружения
      replyTo: email,
      subject: `Новое сообщение от ${name}`,
      text: message,
      html: `
        <div>
          <h2>Новое сообщение с вашего сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Сообщение:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    }

    // Отправка email
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: "Сообщение успешно отправлено",
    }
  } catch (error) {
    console.error("Ошибка при отправке email:", error)

    return {
      success: false,
      message: "Произошла ошибка при отправке сообщения",
    }
  }
}
