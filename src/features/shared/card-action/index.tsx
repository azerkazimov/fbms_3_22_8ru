"use client"

import { PizzaProps } from "@/features/helpers/interfaces/pizza-props";
import useCardStore from "@/store/product-store";
import QuantitySelector from "../quantity-selector";
import { Button } from "@/components/ui/button";

export default function CardAction({product}: {product: PizzaProps}) {
    const { addToCard }  = useCardStore();

    return (
        <div className="flex flex-col gap-5">
            <QuantitySelector product={{...product, quantity: product.quantity?? 1}} />
            <div className="flex gap-4">
                <Button className="flex-1">
                    Buy now
                </Button>
                <Button className="flex-1" onClick={() => {addToCard({id: product.id, name: product.name, price: product.price, quantity: 1})}}>
                    Add to card
                </Button>
            </div>
        </div>
    );
}