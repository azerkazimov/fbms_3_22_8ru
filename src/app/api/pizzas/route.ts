import { NextResponse } from "next/server"
import { pizzaData } from "@/features/shared/data/pizzas"

export async function GET() {
  try {
    return NextResponse.json(pizzaData)
  } catch (error) {
    console.error("Error in pizzas API route:", error)
    return NextResponse.json({ error: "Failed to fetch pizza data" }, { status: 500 })
  }
}