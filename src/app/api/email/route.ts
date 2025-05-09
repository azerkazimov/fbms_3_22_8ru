import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Здесь можно добавить логику для отправки email,
    // сохранения в базу данных или интеграции с CRM
    console.log("Получено сообщение:", { name, email, message })

    // Возвращаем успешный ответ
    return NextResponse.json({ success: true, message: "Сообщение успешно отправлено" }, { status: 200 })
  } catch (error) {
    // Обработка ошибок
    console.error("Ошибка при обработке контактной формы:", error)
    return NextResponse.json({ success: false, message: "Произошла ошибка при отправке сообщения" }, { status: 500 })
  }
}
