import { ProductProps } from "@/features/helpers/interfaces/product-props";
import { pizzaData } from "@/features/shared/data/pizzas";

export async function searchProduct(query: string): Promise<ProductProps[]> {
  const filterQuery = query?.toLowerCase().trim();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));



  return pizzaData.filter((product) =>
    product.name.toLowerCase().includes(filterQuery) ||
    product.description.toLowerCase().includes(filterQuery)
  );
}
