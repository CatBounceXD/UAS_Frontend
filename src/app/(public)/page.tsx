import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllDoctors } from "@/features/doctors/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

export default async function Main() {
  const allDoctors = await getAllDoctors();
  const featuredDoctors = allDoctors.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full">
        <div className="space-y-12 lg:col-span-2">
          <section className="relative mt-2 flex h-75 items-center overflow-hidden rounded-b-[50px] md:h-100 md:w-full md:rounded-b-[100px]">
            <div className="absolute inset-0 bg-[url('/hero-banner.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0A2647]/95 via-[#0A2647]/60 to-transparent" />
            <div className="relative z-10 max-w-lg p-8 text-white md:p-16">
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
                Hand Surgery
              </h1>
              <p className="mb-8 text-sm leading-relaxed text-gray-200 md:text-base">
                Comprehensive orthopedic and specialist medical care tailored to
                restore your mobility, comfort, and active lifestyle.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full border-0 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full border-0 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/30"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          <section className="p-4 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Meet Our <span className="text-primary">Doctor</span>
              </h2>
              <Link
                href="/dashboard/doctors"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View All Doctors
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {featuredDoctors.map((doc) => (
                <Card
                  key={doc.id}
                  className="border-0 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col pt-6">
                    <Avatar className="mx-auto mb-4 h-20 w-20">
                      <AvatarImage src={doc.avatarUrl} alt={doc.name} />
                      <AvatarFallback>
                        {doc.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm font-semibold text-blue-700 md:text-base">
                      {doc.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-sky-500">
                      {doc.specialty}
                    </p>
                    <p className="mt-2 mb-4 line-clamp-3 text-xs text-gray-500">
                      {doc.bio}
                    </p>
                    <Link
                      href={`/dashboard/doctors/${doc.id}`}
                      className="mt-auto block"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-blue-500 text-xs hover:bg-blue-600"
                      >
                        View More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 items-center gap-8 p-4 md:grid-cols-2 md:p-8">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/medical-team-dashboard.png"
                alt="Medical Team"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-blue-600">
                Quality Orthopedic Care
              </p>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-800 md:text-3xl">
                We are Always Ensure{" "}
                <span className="text-blue-600">Best Medical Treatment</span>{" "}
                For Your Health
              </h2>
              <p className="mb-4 text-justify text-sm leading-relaxed text-gray-600">
                The physicians at The Orthopaedic Center of Corpus Christi are
                dedicated to providing excellent medical care and exceptional
                customer service.
              </p>
              <p className="text-justify text-sm leading-relaxed text-gray-600">
                It is our goal to return you to an active lifestyle as quickly
                as possible. In most cases, our patients&apos; orthopedic
                injuries can be treated non-surgically. Patients requiring
                surgery will be briefed on the procedure, potential risks, and
                the post-surgical rehabilitation process.
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-8 text-center shadow-sm md:p-8">
            <h2 className="mb-8 text-xl font-bold text-gray-800 md:text-2xl">
              Proud to be the Official
              <br />
              <span className="text-blue-600">Orthopaedic Team Physicians</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale transition-all hover:grayscale-0">
              <div className="text-2xl font-black text-gray-800">STEELERS</div>
              <div className="rounded border-2 border-blue-900 px-4 py-1 text-2xl font-black italic text-blue-900">
                JAVELINAS
              </div>
              <div className="text-2xl font-black italic text-gray-600">
                IceRays
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}