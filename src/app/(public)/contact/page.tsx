import { MapPin, Phone, Printer } from "lucide-react";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Jl.%20Letjen%20S.%20Parman%20No.%201%2C%20Grogol%20Petamburan%2C%20Jakarta%20Barat%2011440&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function ContactUsPage() {
  return (
    <div className="w-full">
      {/* PAGE TITLE HEADER */}
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact To
        </h1>
        <p className="mt-1 text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl">
          Orthopaedic Center
        </p>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          {/* GOOGLE MAPS IFRAME */}
          <div className="h-80 w-full overflow-hidden rounded-lg border border-gray-200 bg-blue-50 sm:h-96">
            <iframe
              title="Orthopaedic Center Location Map"
              src={MAP_EMBED_SRC}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* LOCATION & CONTACT INFORMATION */}
          <div className="space-y-4 text-sm text-gray-600">
            <h2 className="text-base font-bold text-gray-900">
              Location & Contact Information
            </h2>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 shrink-0 text-blue-500" />
              <span>0812-3456-7890</span>
            </div>
            <div className="flex items-center space-x-3">
              <Printer className="h-4 w-4 shrink-0 text-blue-500" />
              <span>(021) 561-1355</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
              <span>
                Jl. Letjen S. Parman No. 1, Grogol Petamburan, Jakarta Barat
                11440
              </span>
            </div>
          </div>

          {/* OFFICE HOURS */}
          <div className="space-y-2 border-t border-gray-100 pt-6 text-sm text-gray-600">
            <h2 className="text-base font-bold text-gray-900">Office Hours</h2>
            <p>Monday - Friday: 8:30am - 5:30pm</p>
            <p className="text-xs text-gray-500">
              Our office is closed during most major holidays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}