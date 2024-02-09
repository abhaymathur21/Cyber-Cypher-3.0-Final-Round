import CartAdd from "@/components/CartAdd";
import TagList from "@/components/TagList";
import { Button } from "@/components/ui/button";

import products from "@/data/products.json";
import user from "@/data/user.json";
import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = products.find((product) => product.id === parseInt(id));
  if (!product)
    return <div className="mt-8 text-center text-2xl">Product not found</div>;

  const rating = Math.random() * 5;

  const cart = user.cart;

  let recommendedProducts: Product[] = [];
  try {
    const recommended = await fetch("http://localhost:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: product.id }),
    }).then((res) => res.json());

    recommendedProducts = recommended["recommended_items"].map((id: string) =>
      products.find((product) => product.id === parseInt(id)),
    ) as Product[];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-[2fr_3fr] gap-4 overflow-auto pr-4">
      <div>
        <Image
          src={`https://picsum.photos/seed/${product.id}/300/300`}
          alt={product.name}
          width={300}
          height={300}
          className="aspect-square w-full place-self-center rounded-md object-cover object-center"
        />
      </div>
      <div>
        <h1 className="flex items-center gap-8 text-4xl font-bold">
          {product.name}
        </h1>

        <TagList product={product} />

        <Rating rating={rating} />

        <p className="mt-4 text-lg font-bold">
          {product.category} - {product.brand}
        </p>
        <p className="mt-4 w-[30ch] text-lg">{product.description}</p>
        <div className="mt-4 flex items-center gap-8">
          <span className="text-xl font-bold">${product.price}</span>
          {cart.some((item) => item.id === product.id) ? (
            <Button
              variant="default"
              className="text-white hover:bg-secondary hover:text-black"
            >
              <Link href="/cart">View in Cart</Link>
            </Button>
          ) : (
            <CartAdd
              id={product.id}
              variant="default"
              className="text-white hover:bg-secondary hover:text-black"
            />
          )}
        </div>
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="mt-8 text-2xl font-bold">Recommended Products</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {recommendedProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} small />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductPage;

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="mt-4 flex items-center gap-2 text-lg">
      <span
        className="rating bg-gradient-to-r bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, #f7df1e ${rating * 20}%, #dcdcdc ${rating * 20}%)`,
        }}
      >
        ⭐⭐⭐⭐⭐
      </span>
      {rating.toFixed(1)}/5.0
    </div>
  );
};
