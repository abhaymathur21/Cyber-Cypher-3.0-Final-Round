"use client";

import { AddToCart } from "@/lib/cartActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

const CartAdd = ({
  id,
  variant,
  className,
}: {
  id: number;
  variant?: any;
  className?: string;
}) => {
  return (
    <Button
      variant={variant || "outline"}
      className={cn(
        "border-2 text-gray-950 hover:bg-primary hover:text-accent",
        className,
      )}
      onClick={() => AddToCart(id)}
    >
      Add to Cart
    </Button>
  );
};
export default CartAdd;
