"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Visit Request", href: "/visit-request" },
  { label: "Patient", href: "/patient" },
  { label: "Resource", href: "/resource" },
  { label: "Contact", href: "/contact" },
  { label: "Surgery", href: "/surgery" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="w-full max-w-full">
      <NavigationMenuList className="w-full flex-1 justify-end">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
                render={<Link href={item.href}>{item.label}</Link>}
              />
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
