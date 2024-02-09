export const links = [
  {
    label: "Fashion",
    href: "/fashion",
    children: [
      {
        label: "Apparel",
        href: "/fashion/apparel",
      },
      {
        label: "Accessories",
        href: "/fashion/accessories",
      },
      {
        label: "Footwear",
        href: "/fashion/footwear",
      },
    ],
  },
  {
    label: "Home & Garden",
    href: "/home-and-garden",
    children: [
      {
        label: "Home & Living",
        href: "/home-and-garden/home-and-living",
      },
      {
        label: "Home & Kitchen",
        href: "/home-and-garden/home-and-kitchen",
      },
      {
        label: "Outdoor Gear",
        href: "/home-and-garden/outdoor-gear",
      },
    ],
  },
  {
    label: "Health & Beauty",
    href: "/health-and-beauty",
    children: [
      {
        label: "Personal Care",
        href: "/health-and-beauty/personal-care",
      },
      {
        label: "Fitness & Sports",
        href: "/health-and-beauty/fitness-and-sports",
      },
    ],
  },
  {
    label: "Electronics & Appliances",
    href: "/electronics-and-appliances",
    children: [
      {
        label: "Electronics",
        href: "/electronics-and-appliances/electronics",
      },
      {
        label: "Appliances",
        href: "/electronics-and-appliances/appliances",
      },
    ],
  },
  {
    label: "Food & Beverages",
    href: "/food-and-beverages",
    children: [],
  },
] as const;

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
};

export type ProductFilters =
  | (typeof links)[number]["label"]
  | (typeof links)[number]["children"][number]["label"]
  | "All";

export type ProductPaths =
  | (typeof links)[number]["href"]
  | (typeof links)[number]["children"][number]["href"];

export const fetchData = async (filter: ProductFilters) => {
  const res = await fetch("https://api.vercel.app/products");
  const data = (await res.json()) as Product[];

  if (filter === "All") return data;

  const filtered = data.filter((product) => product.category === filter);
  return filtered;
};
