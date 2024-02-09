import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import products from "@/data/products.json";
import Image from "next/image";
import CartAmount from "./CartAmount";
import CartRemove from "./CartRemove";
import Link from "next/link";

const CartCard = ({
  id,
  quantity,
}: Readonly<{ id: number; quantity: number }>) => {
  const product = products.find((product) => product.id === id);

  if (!product) return null;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="grid h-min">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="grid max-w-fit grid-cols-[auto_1fr] gap-4">
            <Image
              src={`https://picsum.photos/seed/${product.id}/300/300`}
              alt={product.name}
              width={300}
              height={300}
              className="aspect-video size-16 place-self-center rounded-md border-2 border-gray-950 object-cover object-center"
            />
            <div>
              <p className="max-w-[40ch] text-pretty">{product.description}</p>
              <p>${product.price}</p>
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <CartAmount id={id} quantity={quantity} />
          <CartRemove id={id} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CartCard;
