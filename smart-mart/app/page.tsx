import { fetchData } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const data = await fetchData("All");

  return (
    <div className="grid max-h-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 overflow-y-auto pr-4">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
