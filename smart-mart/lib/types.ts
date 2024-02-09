export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
};

export type CartItem = {
  id: number;
  quantity: number;
};
