import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileView } from "@/features/auth/ProfileView";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }

  const sessionUser = session.user as {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    phone?: string | null;
    dob?: string | null;
  };

  return (
    <ProfileView
      user={{
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        image: sessionUser.image ?? null,
        phone: sessionUser.phone ?? null,
        dob: sessionUser.dob ?? null,
      }}
    />
  );
}