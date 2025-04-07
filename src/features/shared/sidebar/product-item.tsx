"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
<<<<<<< HEAD
import { ProductProps } from "@/features/helpers/interfaces/product";
import QuantitySelector from "../quantity-selector";
import useCardStore from "@/store/product-store";

export function ProductItem({ id, name, price, imageUrl, path, description, stockCount }: ProductProps ) {
=======
import QuantitySelector from "../quantity-selector";
import { ProductProps } from "@/features/helpers/interfaces/product-props";
import useCardStore from "@/store/card-store";

export function ProductItem({
  id,
  name,
  price,
  imageUrl,
  path,
  size,
  description,
  stockCount,
}: ProductProps) {
>>>>>>> ae120498890c87efd76585c4dcd7c9237143120d
  const { removeFromCard } = useCardStore();

  const removeItem = removeFromCard;

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-sm font-medium text-white">{name}</h3>
        <p className="text-sm text-white/60">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
<<<<<<< HEAD
        <QuantitySelector product={{ id, name, price, imageUrl, path, description, stockCount, category: "", rating: 0, quantity: 1 }} />
=======
        <QuantitySelector
          product={{
            id,
            name,
            price,
            imageUrl,
            path,
            size,
            description,
            stockCount,
            category: "",
            rating: 0,
            quantity: 1,
          }}
        />
>>>>>>> ae120498890c87efd76585c4dcd7c9237143120d
        <Button variant="outline" size="icon" onClick={() => removeItem(id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
