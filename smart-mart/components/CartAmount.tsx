"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";
import { IncrementQuantity, DecrementQuantity } from "@/lib/cartActions";

const CartAmount = ({ id, quantity }: { id: number; quantity: number }) => {
  return (
    <div className="grid min-w-min grid-cols-3 gap-2">
      <Button
        onClick={() => {
          if (quantity > 1) DecrementQuantity(id);
        }}
        className="p-2 hover:bg-secondary"
      >
        <MinusIcon size={16} />
      </Button>
      <Input
        type="number"
        min={1}
        max={99}
        value={quantity}
        readOnly
        className="flex aspect-square p-0 pl-3 text-center font-mono"
      />
      <Button
        onClick={() => IncrementQuantity(id)}
        className="p-2 hover:bg-secondary"
      >
        <PlusIcon size={16} />
      </Button>
    </div>
  );
};
export default CartAmount;
