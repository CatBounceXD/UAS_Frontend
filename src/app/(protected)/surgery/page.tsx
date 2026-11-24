import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SurgeryListClient from "@/features/surgery/components/SurgeryListClient";
import { getAllSurgeriesByUserId } from "@/features/surgery/queries";
import { auth } from "@/lib/auth";

export default async function SurgeryPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const surgeries = await getAllSurgeriesByUserId(session.user.id);
  const userName = session.user.name || "Patient";

  return (
    <div className="space-y-8 text-slate-800">
      <div>
        <p className="text-sm text-slate-500">Hi {userName},</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back {userName}
        </h1>
      </div>

      <SurgeryListClient surgeries={surgeries} />
    </div>
  );
}
