import { headers } from "next/headers";
import VisitRequestListClient from "@/features/visit-request/VisitRequestListClient";
import { auth } from "@/lib/auth";

export default async function VisitRequestPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user?.name || "John";

  return <VisitRequestListClient userName={userName} />;
}