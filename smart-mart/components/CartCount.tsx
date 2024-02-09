"use client";

import { useEffect, useState } from "react";

const CartCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsed = JSON.parse(cart);
      setCount(parsed.length);
    }
  }, []);

  if (count === 0) return null;

  return (
    <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
      {count}
    </div>
  );
};
export default CartCount;
