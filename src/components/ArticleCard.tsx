
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CalendarDays, UserRound } from "lucide-react";

type ArticleCardProps = {
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export default function ArticleCard({
  image,
  title,
  description,
  date,
  author,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-none">
      <Image
        src={image}
        alt={title}
        width={800}
        height={600}
        className="aspect-[4/3] w-full rounded object-cover"
      />

      <div className="space-y-2 p-1">
        <h3 className="text-sm font-semibold text-blue-900">
          {title}
        </h3>

        <p className="text-xs text-gray-500">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} className="text-blue-500" />
            {date}
          </span>

          <span className="flex items-center gap-1">
            <UserRound size={12} className="text-blue-500" />
            {author}
          </span>
        </div>
      </div>
    </Card>
  );
}
