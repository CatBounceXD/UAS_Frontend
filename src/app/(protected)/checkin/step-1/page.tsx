import { headers } from "next/headers";
import CheckInStep1 from "@/features/checkin/components/Step1";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user as
    | { name?: string; phone?: string | null; dob?: string | null }
    | undefined;

  return (
    <CheckInStep1
      defaultUser={{
        fullName: user?.name ?? "",
        birthDate: user?.dob ?? "",
        phone: user?.phone ?? "",
      }}
    />
  );
}