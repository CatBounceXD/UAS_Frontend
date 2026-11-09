import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border border-slate-100">
            <AvatarImage
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="object-cover"
            />
            <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900">
              {doctor.name}
            </h3>
            <p className="text-xs font-semibold text-sky-500">
              {doctor.specialty}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
              {doctor.bio}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-3 text-center">
          <button
            type="button"
            className="text-xs font-semibold text-sky-500 hover:text-sky-600"
          >
            View More
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
