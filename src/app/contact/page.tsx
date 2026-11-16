import { MapPin, Phone, Printer, Upload } from "lucide-react";
import React from "react";

export default function ContactUsPage() {
  return (
    <div className="w-full">
      {/* --- PAGE TITLE HEADER --- */}
      <div className="py-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Contact To
        </h1>
        <p className="text-3xl sm:text-4xl font-bold text-blue-500 tracking-tight mt-1">
          E-Health
        </p>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: MAP & CONTACT INFO */}
          <div className="lg:col-span-5 space-y-8">
            <div className="w-full h-80 bg-blue-50 rounded-lg overflow-hidden border border-gray-200 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-blue-100"></div>
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

            <div className="space-y-4 text-sm text-gray-600">
              <h2 className="font-bold text-gray-900 text-base">
                Location & Contact Information
              </h2>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>+ 0 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Printer className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>(361) 561-1355</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                <span>6118 Parkway Drive, Corpus Christi, Texas 78414</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 pt-4 border-t border-gray-100">
              <h2 className="font-bold text-gray-900 text-base">
                Office Hours
              </h2>
              <p>Monday - Friday: 8:30am - 5:30pm</p>
              <p className="text-gray-500 text-xs">
                Our office is closed during most major holidays.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM MESSAGE */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="ex. john"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="ex. smith"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="text"
                    placeholder="ex. 12-02-2001"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Your email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ex. john.smith@domain.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="ex. +0 123 456 7890"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="ex. lorem ipsum"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-gray-700 uppercase mb-1"
                >
                  Please enter details of your request
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  A member of our support staff will respond via email or phone
                  call as soon as possible.
                </p>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Type here.."
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="request-type"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Request Type
                  </label>
                  <input
                    id="request-type"
                    type="text"
                    placeholder="ex. john.smith@domain.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="physician"
                    className="block text-xs font-semibold text-gray-700 uppercase mb-2"
                  >
                    Select your Physician
                  </label>
                  <input
                    id="physician"
                    type="text"
                    placeholder="ex. 12-02-2001"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-gray-700 uppercase"
                  >
                    Attachments (optional)
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Max 5mb (PDF, Jpeg, png)
                  </span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer bg-gray-50/50">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-500">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-blue-500">
                      Upload Document
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-10 py-3 rounded-md shadow transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
