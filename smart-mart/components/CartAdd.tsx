"use client";

import { AddToCart } from "@/lib/cartActions";
import { Button } from "@/components/ui/button";

const CartAdd = ({ id }: { id: number }) => {
  return (
    <Button
      variant="outline"
      className="border-2 text-gray-950 hover:bg-primary hover:text-accent"
      onClick={() => AddToCart(id)}
    >
      Add to Cart
    </Button>
  );
};
export default CartAdd;
