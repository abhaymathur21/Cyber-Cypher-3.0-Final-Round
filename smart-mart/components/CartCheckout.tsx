"use client";

import { Button } from "@/components/ui/button";
import { Checkout } from "@/lib/cartActions";
import { CartItem } from "@/lib/types";

import { useState } from "react";

const CartCheckout = ({ amount }: { amount: number }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className="w-64 hover:bg-secondary"
      onClick={() => {
        setLoading(true);
        Checkout();
        setLoading(false);
      }}
      disabled={loading || amount === 0}
    >
      {loading ? "Processing..." : `Checkout - $${amount}`}
    </Button>
  );
};
export default CartCheckout;
