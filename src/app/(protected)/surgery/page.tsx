import { headers } from "next/headers";
import SurgeryListClient from "@/features/surgery/components/SurgeryListClient";
import { auth } from "@/lib/auth";

export default async function SurgeryPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user?.name || "John";

  return <SurgeryListClient userName={userName} />;
}