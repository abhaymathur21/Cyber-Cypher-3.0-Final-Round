import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchProducts = (products: Product[], searchParams: string) => {
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchParams.toLowerCase()) ||
      product.category.toLowerCase().includes(searchParams.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchParams.toLowerCase()) ||
      product.description.toLowerCase().includes(searchParams.toLowerCase()),
  );
};
