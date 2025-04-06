import { pizzaData } from "@/features/shared/data/pizzas";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { path: string } }) {
    const { path } = params;

    const product = pizzaData.flatMap(item => item);
    const item = product.find((item) => item.url === `product/${path}`);

    return NextResponse.json(item);
}