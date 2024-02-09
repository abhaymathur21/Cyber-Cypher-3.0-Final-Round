import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CartAdd from "./CartAdd";
import CartAmount from "./CartAmount";
import Image from "next/image";

import { Product } from "@/lib/types";

import user from "@/data/user.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const cart = user.cart;

  return (
    <Card className="grid h-min grid-rows-[auto_1fr_auto]">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="grid p-0">
          <Image
            src={`https://picsum.photos/seed/${product.id}/300/300`}
            alt={product.name}
            width={300}
            height={300}
            className="aspect-video w-full place-self-center rounded-t-md object-cover object-center"
          />

          <CardTitle className="h-[3lh] px-6 py-4 text-lg">
            {product.name}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>${product.price}</span>
        {cart.some((item) => item.id === product.id) ? (
          <Button
            variant="outline"
            className="border-2 text-gray-950 hover:bg-primary hover:text-accent"
          >
            <Link href="/cart">View in Cart</Link>
          </Button>
        ) : (
          <CartAdd id={product.id} />
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
