"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { links } from "@/lib/data";

// Fashion: Apparel, Accessories, Footwear
// Home & Garden: Home & Living, Home & Kitchen, Outdoor Gear
// Health & Beauty: Personal Care, Fitness & Sports
// Electronics & Appliances: Electronics, Appliances
// Food & Beverages: Food & Beverages

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link, index) => (
          <NavigationMenuItem key={index}>
            {link.children.length > 0 ? (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[800px] grid-flow-col gap-3 p-4">
                    {link.children.map((child, index) => (
                      <Link
                        href={child.href}
                        passHref
                        key={index}
                        legacyBehavior
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {child.label}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
        <NavigationMenuIndicator className="shadow-primary" />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navbar;
