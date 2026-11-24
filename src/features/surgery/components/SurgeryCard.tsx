import Link from "next/link";
import type { SurgeryRecord } from "@/features/surgery/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export default function SurgeryCard({ item }: { item: SurgeryRecord }) {
  return (
    <Link
      href={`/surgery/${item.id}`}
      className="block rounded-xl border border-slate-200/80 bg-white p-6 transition-all hover:border-sky-200 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border border-slate-100">
          <AvatarImage
            src={item.doctorAvatarUrl}
            alt={item.doctorName}
            className="object-cover"
          />
          <AvatarFallback className="font-semibold">
            {item.doctorName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-base font-bold text-slate-900">
            {item.doctorName}
          </h2>
          <p className="text-xs font-semibold text-sky-500">
            {item.doctorSpecialty}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            {item.preferredAppointmentTime}, {item.urgency}
          </p>
        </div>
      </div>

      <hr className="my-4 border-slate-100" />

      <div>
        <p className="text-xs font-semibold text-slate-700">Suggestion Note</p>
        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-400">
          &ldquo;{item.suggestionNote}&rdquo;
        </p>
      </div>
    </Link>
  );
}
