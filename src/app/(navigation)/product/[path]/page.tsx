// import { PizzaProps } from "@/features/helpers/interfaces/pizza-props";
import { Star } from "lucide-react";
import Image from "next/image";
import CardAction from "@/features/shared/card-action";

interface ProductPath {
  params: {
    path: string;
  };
}

export default async function ProductPage({ params }: ProductPath) {
  const { path } = await params;
  console.log(path);

  const response = await fetch(`${process.env.API_HOST}/api/product/${path}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const product = await response.json();
  console.log(product);

  return (
    <div className="container mt-12 pt-12">
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="aspect-square relative bg-zinc-900 rounded-lg">
            <Image
              src={
                product?.image ||
                "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              }
              alt="Electronic Fresh Keyboard"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
              <p className="text-zinc-400">{product?.category}</p>
            </div>

            <div className="text-2xl font-bold">{product?.price}$</div>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (product?.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>

            {product && <CardAction product={product} />}

            <div className="pt-4">
              <h5>Description</h5>
              <p className="text-zinc-400">
                {product?.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
