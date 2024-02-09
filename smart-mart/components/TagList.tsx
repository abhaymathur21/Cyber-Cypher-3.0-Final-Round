import EcoBadge from "@/components/EcoBadge";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gemini } from "@/lib/gemini";
import type { Product } from "@/lib/types";
import { Suspense } from "react";

const TagList = async ({ product }: { product: Product }) => {
  const parts = [
    `Below given is the description of the product:`,
    `Product Name: ${product.name}`,
    `Product Category: ${product.category}`,
    `Product Brand: ${product.brand}`,
    `Product Description: ${product.description}`,
    `Product Price: ${product.price}`,
    "Extract key tags for the product.",
    "Don't include the product name, category, brand, description, or price.",
    "Only include tags that are relevant to the product. For example: 'organic', 'handmade', 'imported', etc.",
    "Repond with only the top 5 tags.",
    'Respond with the tags separated by commas. For example: "tag1,tag2,tag3".',
  ];

  const response = await Gemini(parts);

  return (
    <div className="mt-2 flex max-w-[40ch] flex-wrap gap-2">
      <Suspense fallback={<Skeleton className="h-4 w-24 rounded-full" />}>
        <EcoBadge product={product} />
      </Suspense>

      {response.split(",").map((tag, i) => (
        <Suspense
          fallback={<Skeleton className="h-4 w-24 rounded-full" />}
          key={i}
        >
          <Badge className="w-max">{tag}</Badge>
        </Suspense>
      ))}
    </div>
  );
};
export default TagList;
