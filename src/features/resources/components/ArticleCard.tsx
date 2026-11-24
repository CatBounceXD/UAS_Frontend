import { CalendarDays, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/shared/components/ui/card";

type ArticleCardProps = {
  slug: string;
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export default function ArticleCard({
  slug,
  image,
  title,
  description,
  date,
  author,
}: ArticleCardProps) {
  return (
    <Link href={`/resource/${slug}`} className="block h-full">
      <Card className="flex h-full cursor-pointer flex-col overflow-hidden rounded-md border border-gray-200 bg-white p-2 shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="aspect-4/3 w-full rounded object-cover"
        />

        <div className="flex flex-1 flex-col space-y-2 p-1">
          <h3 className="text-sm font-semibold text-blue-900">{title}</h3>

          <p className="line-clamp-2 min-h-10 text-xs text-gray-500">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 text-[10px] text-gray-400">
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
    </Link>
  );
}
