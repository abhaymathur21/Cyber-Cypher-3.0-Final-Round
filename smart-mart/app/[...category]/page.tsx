import { fetchData } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ProductPaths, ProductFilters } from "@/lib/data";

export default async function Home({
  params: { category },
}: {
  params: { category: string[] };
}) {
  console.log(category);

  const filter = category
    .at(-1)!
    .replace(/and/g, "&")
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ") as ProductFilters;
  const data = await fetchData(filter);

  return (
    <div className="grid max-h-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 overflow-y-auto pr-4">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
