import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Data sementara
const doctors = [
  {
    id: 1,
    name: "Dr. Berastain",
    role: "Lorem ipsum dolor sit amet",
    img: "/doc1.jpg",
  },
  {
    id: 2,
    name: "Dr. Patterson",
    role: "Lorem ipsum dolor sit amet",
    img: "/doc2.jpg",
  },
  {
    id: 3,
    name: "Dr. Schlimmer",
    role: "Lorem ipsum dolor sit amet",
    img: "/doc3.jpg",
  },
  {
    id: 4,
    name: "Dr. Cordell",
    role: "Lorem ipsum dolor sit amet",
    img: "/doc4.jpg",
  },
];

export default function Main() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full">
        <div className="lg:col-span-2 space-y-12">
          <section className="relative overflow-hidden h-75 md:w-full md:h-100 mt-2 flex items-center rounded-b-[50px] md:rounded-b-[100px]">
            <div className="absolute inset-0 bg-[url('/hero-banner.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0A2647]/95 via-[#0A2647]/60 to-transparent" />
            <div className="relative z-10 p-8 md:p-16 text-white max-w-lg">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                Hand Surgery
              </h1>
              <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/10 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          <section className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Meet Our <span className="text-primary">Doctor</span>
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {doctors.map((doc) => (
                <Card
                  key={doc.id}
                  className="text-center border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={doc.img} alt={doc.name} />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-sm md:text-base text-blue-700">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 line-clamp-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-xs"
                    >
                      View More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-8">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/medical-team-dashboard.png"
                alt="Medical Team"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <p className="text-blue-600 font-medium text-sm mb-2">
                Quality Orthopedic Care
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                We are Always Ensure{" "}
                <span className="text-blue-600">Best Medical Treatment</span>{" "}
                For Your Health
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify">
                The physicians at The Orthopaedic Center of Corpus Christi are
                dedicated to providing excellent medical care and exceptional
                customer service.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                It is our goal to return you to an active lifestyle as quickly
                as possible. In most cases, our patients' orthopedic injuries
                can be treated non-surgically. Patients requiring surgery will
                be briefed on the procedure, potential risks, and the
                post-surgical rehabilitation process.
              </p>
            </div>
          </section>

          <section className="text-center bg-white p-8 rounded-2xl shadow-sm md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
              Proud to be the Official
              <br />
              <span className="text-blue-600">Orthopaedic Team Physicians</span>
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
              <div className="text-2xl font-black text-gray-800">STEELERS</div>
              <div className="text-2xl font-black text-blue-900 italic border-2 border-blue-900 px-4 py-1 rounded">
                JAVELINAS
              </div>
              <div className="text-2xl font-black text-gray-600 italic">
                IceRays
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
