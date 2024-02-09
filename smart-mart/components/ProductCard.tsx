import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import user from "@/data/user.json";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import CartAdd from "./CartAdd";
import { cn } from "@/lib/utils";

const ProductCard = ({
  product,
  small,
}: {
  product: Product;
  small?: boolean;
}) => {
  const cart = user.cart;

  return (
    <Card className="grid h-min grid-rows-[auto_1fr_auto]">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="grid p-0">
          <Image
            src={`https://picsum.photos/seed/${product.id}/300/300`}
            alt={product.name}
            width={small ? 200 : 300}
            height={small ? 200 : 300}
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
      <CardFooter className="flex justify-between text-sm">
        <span>${product.price}</span>
        {cart.some((item) => item.id === product.id) ? (
          <Button
            variant="outline"
            className={cn(
              "border-2 text-gray-950 hover:bg-primary hover:text-accent",
              small && "text-xs",
            )}
          >
            <Link href="/cart">View in Cart</Link>
          </Button>
        ) : (
          <CartAdd id={product.id} className={cn(small && "p-2 text-xs")} />
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
