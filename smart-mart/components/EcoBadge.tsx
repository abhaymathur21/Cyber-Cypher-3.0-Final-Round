import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Gemini } from "@/lib/gemini";
import { cn } from "@/lib/utils";

const EcoBadge = async ({ product }: { product: Product }) => {
  const parts = [
    `Below given is the description of the product:`,
    `Product Name: ${product.name}`,
    `Product Category: ${product.category}`,
    `Product Brand: ${product.brand}`,
    `Product Description: ${product.description}`,
    `Product Price: ${product.price}`,
    "Classify the product as eco-friendly or not.",
    'Only respond with "YES" or "NO".',
  ];

  const response = await Gemini(parts);

  return (
    <Badge
      className={cn(
        response === "YES"
          ? "bg-green-900 hover:bg-green-900"
          : "bg-red-900 hover:bg-red-900",
      )}
    >
      {response === "YES" ? "Eco-Friendly" : "Not Eco-Friendly"}
    </Badge>
  );
};
export default EcoBadge;
