import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Product } from "@/lib/data";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="grid h-min grid-rows-[auto_1fr_auto]">
      <CardHeader className="grid gap-2">
        <Image
          src={`https://picsum.photos/seed/${product.id}/300/300`}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-md"
        />

        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>${product.price}</span>
        <Button
          variant="outline"
          className="border-2 text-gray-950 hover:bg-primary hover:text-accent"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
