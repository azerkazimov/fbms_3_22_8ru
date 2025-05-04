import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const pizzaData = [
    {
        id: 1,
        category: "Mushroom",
        image: "/pizza/italian.png",
        name: "Italian",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 8.35,
        url: "product/mushroom",
        rating: 5
    },
    {
        id: 2,
        category: "Vegetarian",
        image: "/pizza/vanecia.png",
        name: "Venecia",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 7.35,
        url: "product/vegetarian",
        rating: 2
    },
    {
        id: 3,
        category: "Meat",
        image: "/pizza/meet.png",
        name: "Meat",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 9.35,
        url: "product/meat",
        rating: 5
    },
    {
        id: 4,
        category: "Mushroom",
        image: "/pizza/cheese.png",
        name: "Cheese",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 8.35,
        url: "product/cheese",
        rating: 4
    },
    {
        id: 5,
        category: "Sea product",
        image: "/pizza/argentina.png",
        name: "Argentina",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 9.65,
        url: "product/argentina",
        rating: 4
    },
    {
        id: 6,
        category: "Mushroom",
        image: "/pizza/gribnaya.png",
        name: "Gribnaya",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 7.55,
        url: "product/gribnaya",
        rating: 3
    },
    {
        id: 7,
        category: "Vegetarian",
        image: "/pizza/tomato.png",
        name: "Tomato",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 6.25,
        url: "product/tomato",
        rating: 3
    },
    {
        id: 8,
        category: "Mushroom",
        image: "/pizza/italian-x2.png",
        name: "Italian x2",
        description: "Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...",
        price: 10.95,
        url: "product/italian",
        rating: 4
    }
]

const ingredientData = [
    { id: 1, name: "Mushroom", isVegetarian: true },
    { id: 2, name: "Tomato", isVegetarian: true },
    { id: 3, name: "Cheese", isVegetarian: true },
    { id: 4, name: "Olives", isVegetarian: true },
    { id: 5, name: "Meat", isVegetarian: false },
]

async function main() {
    const categories = [...new Set(pizzaData.map(p => p.category))]

    for (const categoryName of categories) {
        const  existingCategory = await prisma.category.findFirst({
            where: { name: categoryName },
        });
        if (!existingCategory) {
             await prisma.category.create({
                data: {
                    name: categoryName,
                    description: `Description for ${categoryName}`,
                },
            });
        }
    }

    for (const pizza of pizzaData) {
        const category = await prisma.category.findFirst({
            where: { name: pizza.category },
        });

        if (!category) {
            throw new Error(`Category "${pizza.category}" not found`);
        }

        const createdPizza = await prisma.pizza.upsert({
            where: { id: pizza.id },
            update: {
                name: pizza.name,
                description: pizza.description,
                price: pizza.price,
                imageUrl: pizza.image,
                url: pizza.url,
                rating: pizza.rating,
                categoryId: category.id,
                size: "Medium",
            },
            create: {
                id: pizza.id,
                name: pizza.name,
                description: pizza.description,
                price: pizza.price,
                imageUrl: pizza.image,
                url: pizza.url,
                rating: pizza.rating,
                categoryId: category.id,
                size: "Medium",
            },
        });

        const description = pizza.description.toLowerCase();
        const pizzaIngredients = ingredientData.filter((ing) =>
            description.includes(ing.name.toLowerCase()) ||
            (pizza.category === "Mushroom" && ing.name === "Mushroom") ||
            (pizza.category === "Vegetarian" && ing.name === "Tomato") ||
            (pizza.category === "Sea product" && ing.name === "Olives") ||
            (pizza.category === "Meat" && ing.name === "Meat")
        );

        if (pizzaIngredients.length === 0) {
            pizzaIngredients.push(
                ingredientData[Math.floor(Math.random() * ingredientData.length)]
            );
        }

        for (const ingredient of pizzaIngredients) {
            const createdIngredient = await prisma.ingridient.upsert({
                where: { id: ingredient.id },
                update: {
                    name: ingredient.name,
                    isVegetarian: ingredient.isVegetarian,
                },
                create: {
                    id: ingredient.id,
                    name: ingredient.name,
                    isVegetarian: ingredient.isVegetarian,
                },
            });

            await prisma.ingredientOnPizza.upsert({
                where: {
                    pizzaId_ingredientId: {
                        pizzaId: createdPizza.id,
                        ingredientId: createdIngredient.id,
                    },
                },
                update: {},
                create: {
                    pizzaId: createdPizza.id,
                    ingredientId: createdIngredient.id,
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
