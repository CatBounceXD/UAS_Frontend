
"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
  ].includes(pathname);

  return (
    <>
      {!isAuthPage && (
        <header>
          <NavBar />
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}
