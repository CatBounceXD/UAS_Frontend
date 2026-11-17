import NavBar from "@/shared/components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <NavBar variant="public" />
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex items-center justify-center">
        {children}
      </main>
    </>
  );
}