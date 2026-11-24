import { MapPin, Phone, Printer } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="w-full">
      {/* PAGE TITLE HEADER */}
      <div className="py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Contact To
        </h1>
        <p className="text-3xl sm:text-4xl font-bold text-blue-500 tracking-tight mt-1">
          Orthopaedic Center
        </p>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-8">
          {/* MAP ILLUSTRATION BOX */}
          <div className="w-full h-80 sm:h-96 bg-blue-50 rounded-lg overflow-hidden border border-gray-200 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[16px_16px] bg-blue-100"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-bounce flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="bg-white px-3 py-1 rounded shadow text-xs font-semibold text-gray-700 mt-1 border border-gray-200">
                  Regis University
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION & CONTACT INFORMATION */}
          <div className="space-y-4 text-sm text-gray-600">
            <h2 className="font-bold text-gray-900 text-base">
              Location & Contact Information
            </h2>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span>+ 0 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <Printer className="w-4 h-4 text-blue-500 shrink-0" />
              <span>(361) 561-1355</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
              <span>6118 Parkway Drive, Corpus Christi, Texas 78414</span>
            </div>
          </div>

          {/* OFFICE HOURS */}
          <div className="space-y-2 text-sm text-gray-600 pt-6 border-t border-gray-100">
            <h2 className="font-bold text-gray-900 text-base">Office Hours</h2>
            <p>Monday - Friday: 8:30am - 5:30pm</p>
            <p className="text-gray-500 text-xs">
              Our office is closed during most major holidays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
