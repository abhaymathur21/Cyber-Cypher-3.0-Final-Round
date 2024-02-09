import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ShoppingCartIcon, SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CartCount from "@/components/CartCount";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Mart",
  description: "Smart Mart is a modern e-commerce platform.",
};

export default function RootLayout({
  children,
  chat,
}: Readonly<{
  children: React.ReactNode;
  chat: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "grid h-screen grid-rows-[auto_1fr] bg-background",
        )}
      >
        <header className="z-50 flex items-center gap-8 bg-background px-8 py-4 shadow-md">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Smart Mart"
              width={100}
              height={100}
              className="aspect-square size-8"
            />
          </Link>

          <Navbar />

          <form className="ml-auto flex w-96 items-center gap-2">
            <Input id="search" placeholder="Search" />
            <Button type="submit" variant="ghost" className="aspect-square p-2">
              <SearchIcon size={28} />
            </Button>
          </form>

          <div className="relative flex items-center gap-8">
            <Link href="/cart" className="relative p-2 hover:bg-accent">
              <ShoppingCartIcon size={28} className="-scale-x-100" />
              <CartCount />
            </Link>
            <Link href="/profile">
              <Avatar className="size-8">
                <AvatarFallback>JD</AvatarFallback>
                <AvatarImage src="https://picsum.photos/200" alt="John Doe" />
              </Avatar>
            </Link>
          </div>
        </header>
        <main className="grid h-full grid-cols-[3fr_2fr] gap-8 overflow-hidden p-8 lg:grid-cols-[7fr_2fr]">
          {children}
          <Chat />
        </main>
      </body>
    </html>
  );
}