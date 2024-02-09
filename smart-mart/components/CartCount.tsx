import user from "@/data/user.json";

const CartCount = () => {
  const count = user.cart.length;

  return (
    <div className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
      {count}
    </div>
  );
};
export default CartCount;
