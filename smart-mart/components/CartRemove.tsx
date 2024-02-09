"use client";

import { RemoveFromCart } from "@/lib/cartActions";
import { Button } from "@/components/ui/button";

const CartRemove = ({ id }: { id: number }) => {
  return (
    <Button
      variant="outline"
      className="border-2 text-gray-950 hover:bg-primary hover:text-accent"
      onClick={() => RemoveFromCart(id)}
    >
      Remove
    </Button>
  );
};
export default CartRemove;
