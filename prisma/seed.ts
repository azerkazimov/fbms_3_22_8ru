import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const pizzaData = [
    {
        "id": 1,
        "category": "Mushroom",
        "image": "/pizza/italian.png",
        "name": "Italian",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 8.35,
        "url": "product/mushroom",
        "rating": 5
    },
    {
        "id": 2,
        "category": "Vegetarian",
        "image": "/pizza/vanecia.png",
        "name": "Venecia",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 7.35,
        "url": "product/vegetarian",
        "rating": 2
    },
    {
        "id": 3,
        "category": "Meat",
        "image": "/pizza/meet.png",
        "name": "Meat",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 9.35,
        "url": "product/meat",
        "rating": 5
    },
    {
        "id": 4,
        "category": "Mushroom",
        "image": "/pizza/cheese.png",
        "name": "Cheese",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 8.35,
        "url": "product/cheese",
        "rating": 4
    },
    {
        "id": 5,
        "category": "Sea product",
        "image": "/pizza/argentina.png",
        "name": "Agrentina",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 9.65,
        "url": "product/argentina",
        "rating": 4
    },
    {
        "id": 6,
        "category": "Mushroom",
        "image": "/pizza/gribnaya.png",
        "name": "Gribnaya",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 7.55,
        "url": "product/gribnaya",
        "rating": 3
    },
    {
        "id": 7,
        "category": "Vegetarian",
        "image": "/pizza/tomato.png",
        "name": "Tomato",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 6.25,
        "url": "product/tomato",
        "rating": 3
    },
    {
        "id": 8,
        "category": "Mushroom",
        "image": "/pizza/italian-x2.png",
        "name": "Italian x2",
        "description": "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        "price": 10.95,
        "url": "product/italian",
        "rating": 4
    }
]

const ingredientData = [
    {
        "id": 1,
        "name": "Mushroom",
        "isVegetarian": true
    },
    {
        "id": 2,
        "name": "Tomato",
        "isVegetarian": true
    },
    {
        "id": 3,
        "name": "Cheese",
        "isVegetarian": true
    },
    {
        "id": 4,
        "name": "Olives",
        "isVegetarian": true
    },
    {
        "id": 5,
        "name": "Meat",
        "isVegetarian": false
    },
]

async function main() {
    const categories = [...new Set(pizzaData.map(pizza => pizza.category))]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category },
            update: {},
            create: {
                name: category,
                description: `Description for ${category}`,
            }
        })
    }

    for (const pizza of pizzaData) {
        const category = await prisma.category.findUnique({
            where: { name: pizza.category }
        })
        if (!category) {
            throw new Error(`Category ${pizza.category} not found`)
        }

        const createdPizza = await prisma.pizza.upsert({
            where: { id: pizza.id },
            update: {
                name: pizza.name,
                description: pizza.description,
                price: pizza.price,
                imageUrl: pizza.image,

                size: pizza.size,
                url: pizza.url,
                rating: pizza.rating,
                categoryId: category.id,
            },
            create: {
                name: pizza.name,
                description: pizza.description,
                price: pizza.price,
                imageUrl: pizza.image,
                size: pizza.size,
                url: pizza.url,
                rating: pizza.rating,
                categoryId: category.id,
            }
        })
    }
}

