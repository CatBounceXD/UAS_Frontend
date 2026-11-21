// src/app/(public)/layout.tsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Footer from "@/shared/components/footer";
import NavBar from "@/shared/components/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <NavBar
          variant={session ? "protected" : "public"}
          user={session?.user}
        />
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        {children}
      </main>

      <Footer />
    </>
  );
}
