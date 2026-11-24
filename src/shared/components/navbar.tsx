"use client";

import { LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/lib/utils";

interface NavBarProps {
  variant?: "public" | "protected";
  user?: {
    name: string;
    email: string;
    image?: string | null;
  };
}

const publicNavItems = [
  { label: "Beranda", href: "/" },
  { label: "Dokter", href: "/doctors" },
  { label: "Edukasi", href: "/resource" },
  { label: "Kontak", href: "/contact" },
];

const protectedNavItems = [
  { label: "Beranda", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Kunjungan", href: "/visit-request" },
  { label: "Operasi", href: "/surgery" },
  { label: "Sumber Daya", href: "/resource" },
  { label: "Kontak", href: "/contact" },
];

export default function NavBar({ variant = "public", user }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = variant === "protected" ? protectedNavItems : publicNavItems;

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Kiri: Logo Aplikasi */}
        <Link
          href={variant === "protected" ? "/dashboard" : "/"}
          className="flex items-center gap-2 font-bold text-lg text-slate-800 shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-extrabold">
            E
          </span>
          <span>
            E-Health <span className="text-primary">Center</span>
          </span>
        </Link>

        {/* Tengah: Menu Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent focus:bg-transparent",
                      isActive
                        ? "text-primary font-semibold bg-primary/10 hover:bg-primary/15 hover:text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                    render={<Link href={item.href}>{item.label}</Link>}
                  />
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Kanan: Aksi Auth / Profil Desktop */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {variant === "public" ? (
            <>
              <Button
                variant="ghost"
                nativeButton={false}
                render={<Link href="/register">Daftar</Link>}
              />
              <Button
                nativeButton={false}
                render={<Link href="/login">Masuk</Link>}
              />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span className="max-w-30 truncate">
                  {user?.name || "Pasien"}
                </span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Keluar
              </Button>
            </div>
          )}
        </div>

        {/* Tombol Hamburger Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-accent"
          aria-label="Buka menu navigasi"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border py-4 space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm font-medium",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {variant === "public" ? (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  nativeButton={false}
                  render={
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Daftar
                    </Link>
                  }
                />
                <Button
                  className="w-full"
                  nativeButton={false}
                  render={
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                  }
                />
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span>Profil ({user?.name || "Pasien"})</span>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}