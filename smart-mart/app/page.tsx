import { fetchData } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";

export default async function Home() {
  return (
    <div className="grid max-h-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 overflow-y-auto pr-4 [grid-auto-rows:1fr;]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
