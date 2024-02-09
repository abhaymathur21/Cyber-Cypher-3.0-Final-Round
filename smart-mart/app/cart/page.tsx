import user from "@/data/user.json";
import products from "@/data/products.json";
import CartCard from "@/components/CartCard";
import CartCheckout from "@/components/CartCheckout";
import type { CartItem } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const cart = user.cart as CartItem[];
  const amount = cart.reduce(
    (acc, item) =>
      acc + products.find((p) => p.id === item.id)!.price * item.quantity,
    0,
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <h1 className="mb-4 mt-8 text-center text-4xl font-bold">Cart</h1>
      <div className="grid grid-cols-2 gap-4">
        {cart.map((item) => (
          <CartCard key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </div>
      <div className="mt-8 flex w-full justify-center gap-8">
        <CartCheckout amount={amount} />
        <Link href="/">
          <Button className="w-64 hover:bg-secondary">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};
export default Cart;
