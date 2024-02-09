"use server";

import { readFile, writeFile } from "fs/promises";
import type { CartItem } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const IncrementQuantity = async (id: number) => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);
  const cart = user.cart as CartItem[];
  const item = cart.find((item) => item.id === id);
  if (item) item.quantity += 1;
  await writeFile("data/user.json", JSON.stringify(user, null, 2));
  revalidatePath("/cart");
};

export const DecrementQuantity = async (id: number) => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);
  const cart = user.cart as CartItem[];
  const item = cart.find((item) => item.id === id);
  if (item && item.quantity > 1) item.quantity -= 1;
  await writeFile("data/user.json", JSON.stringify(user, null, 2));
  revalidatePath("/cart");
};

export const RemoveFromCart = async (id: number) => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);
  user.cart = user.cart.filter((item: CartItem) => item.id !== id);
  await writeFile("data/user.json", JSON.stringify(user, null, 2));
  revalidatePath("/cart");
};

export const AddToCart = async (id: number) => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);
  const cart = user.cart as CartItem[];
  const item = cart.find((item) => item.id === id);
  if (item) item.quantity += 1;
  else user.cart.push({ id, quantity: 1 });
  await writeFile("data/user.json", JSON.stringify(user, null, 2));
  revalidatePath("/");
};

export const ClearCart = async () => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);
  user.cart = [];
  await writeFile("data/user.json", JSON.stringify(user, null, 2));
  revalidatePath("/cart");
};

export const Checkout = async () => {
  const data = await readFile("data/user.json", "utf-8");
  const user = JSON.parse(data);

  const order = { ...user.cart };
  order.date = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  order.id = Math.floor(Math.random() * 1000000);

  user.cart = [];
  user.orders.push(order.id);
  await writeFile("data/user.json", JSON.stringify(user, null, 2));

  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const orders = await readFile("data/orders.json", "utf-8");
  const parsedOrders = JSON.parse(orders);
  parsedOrders.push(order);
  await writeFile("data/orders.json", JSON.stringify(parsedOrders, null, 2));

  redirect("/");
};
