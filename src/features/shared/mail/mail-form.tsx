"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { Send } from "lucide-react"
import { formSchema, MailFormValues } from "./mail-form-schema"
import { sendContactEmail } from "./actions/email"

// Схема валидации формы


export function MailForm() {
  // Using react-hot-toast directly
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Инициализация формы с React Hook Form
  const form = useForm<MailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // Обработчик отправки формы
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
        // Отправка данных через server action
        const response = await sendContactEmail(values)
  
        if (response.success) {
          // Показываем уведомление об успешной отправке
          toast.success("Сообщение отправлено! Спасибо! Мы свяжемся с вами в ближайшее время.", {
            duration: 5000,
          })
  
          // Сбрасываем форму
          form.reset()
        } else {
          // Показываем уведомление об ошибке
          toast.error(response.message || "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.", {
            duration: 5000,
          })
        }
      } catch (error) {
        console.error(error);
        
        // Показываем уведомление об ошибке
        toast.error("Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.", {
          duration: 5000,
        })
      } finally {
        setIsSubmitting(false)
      }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ваше имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сообщение</FormLabel>
              <FormControl>
                <Textarea placeholder="Введите ваше сообщение..." className="min-h-[150px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? (
            <>Отправка...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Отправить сообщение
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
