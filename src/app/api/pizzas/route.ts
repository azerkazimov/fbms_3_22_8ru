import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const pizzas = await prisma.pizza.findMany({
      include:{
        category:true,
        ingredients:{
          include:{
            ingredient:true
          }
        },
      }
    })

    const formattedPizzas = pizzas.map((pizza)=>({
      id:pizza.id,
      name:pizza.name,
      description:pizza.description,
      price:pizza.price,
      image:pizza.imageUrl,
      size: pizza.size,
      url: pizza.url,
      rating: pizza.rating,
      category: pizza.category.name,
    }))

    return NextResponse.json(formattedPizzas)

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch pizzas" }, { status: 500 })
  }
}