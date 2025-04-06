export interface PizzaProps {
    id: number;
    category: string;
    name: string;
    price: number;
    image: string;
    description: string;
    count?: number;
    quantity?: number;
    url: string;
    rating?: number;
}