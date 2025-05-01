export interface Pizza {
  id: number
  category: string
  name: string
  price: number
  image: string
  description: string
  size: string
  url: string
  rating: number
}

export interface PizzaWithIngredients extends Pizza {
  ingredients?: Array<{
    name: string
    isVegetarian: boolean
    amount?: string
  }>
}


export async function getPizzas(): Promise<Pizza[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/pizzas`)
  if (!response.ok) {
    throw new Error("Failed to fetch pizzas")
  }
  return response.json()
}

export async function getPizzaById(id: number): Promise<PizzaWithIngredients> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/pizzas/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch pizza")
  }
  return response.json()
}

export async function getPizzaByCategory(category: string): Promise<Pizza[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/pizzas?category=${category}`)
  if (!response.ok) {
    throw new Error("Failed to fetch pizzas")
  }
  return response.json()
}


