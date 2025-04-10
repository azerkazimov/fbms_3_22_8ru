import { CommandGroup, CommandItem } from "@/components/ui/command";
import { ProductProps } from "@/features/helpers/interfaces/product-props";
import Link from "next/link";

export default function SearchResults({result} : {result: ProductProps}) {

    return (
        <div>
            <CommandGroup heading="Products">
                {result.map((product) => (
                    <CommandItem key={product.id} value={product.name}>
                        <Link href={product.path}>
                            {product.name}
                        </Link>
                    </CommandItem>

                ))
                
}
            </CommandGroup>
        </div>
    );
}