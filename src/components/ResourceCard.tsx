
import Image from "next/image";
import { Card } from "@/components/ui/card";

type ResourceCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function ResourceCard({
  image,
  title,
  description,
}: ResourceCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={800}
        height={600}
        className="aspect-[4/3] w-full object-cover"
      />

      <div className="p-4">
        <h3 className="mb-2 font-semibold text-blue-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </Card>
  );
}
