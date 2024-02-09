import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { searchProducts } from "@/lib/utils";
import { log } from "console";
import Link from "next/link";

export default async function Home({
  searchParams: { q, id },
}: {
  searchParams: { q?: string; id?: string };
}) {
  const data = q
    ? searchProducts(products, q)
    : id
      ? products.filter((product) =>
          id
            .split(",")
            .map((x) => parseInt(x.trim()))
            .includes(product.id),
        )
      : products;
  if (id) log(data, id.split(","));
  return (
    <div className="grid max-h-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 overflow-y-auto pr-4 [grid-auto-rows:1fr;]">
      {data.length > 0 ? (
        data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-4 col-start-1 grid h-min gap-2">
          <div className="mt-8 text-center text-2xl">No products found</div>
          <Link href="/" className="mt-4 text-center text-xl text-secondary">
            Clear search
          </Link>
        </div>
      )}
    </div>
  );
}
