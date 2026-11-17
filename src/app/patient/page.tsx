import React from "react";
import Link from "next/link";
import { Calendar, ChevronDown, Printer, Phone, MapPin } from "lucide-react";

export default function PatientPage() {
  return (
    <div className="w-full">
      {/* ISI FORM PATIENT */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12">
          
          {/* STEPPER */}
          <div className="flex items-center justify-center max-w-md mx-auto mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                ✓
              </div>
              <span className="text-sm font-semibold text-blue-600">Patient Information</span>
            </div>
          </div>

          {/* SECTION TITLE */}
          <h1 className="text-xl font-bold text-blue-900 mb-8 flex items-center gap-2 border-b pb-4">
            <span className="text-blue-600">&lt;</span> Patient Information
          </h1>

          {/* FORM */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Name</label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="ex. John smith" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Date of Birth</label>
                <div className="relative">
                  <input 
                    id="dob"
                    type="text" 
                    placeholder="ex. 12-02-2001" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <Calendar className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="address1" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Address Line 1</label>
                <input 
                  id="address1"
                  type="text" 
                  placeholder="ex. 6033 Collins Inlet" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="address2" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Address Line 2</label>
                <input 
                  id="address2"
                  type="text" 
                  placeholder="ex. 6033 Collins Inlet" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-xs font-semibold text-gray-700 uppercase mb-2">City</label>
                <input 
                  id="city"
                  type="text" 
                  placeholder="ex. West Gina" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-xs font-semibold text-gray-700 uppercase mb-2">State</label>
                <input 
                  id="state"
                  type="text" 
                  placeholder="ex. New York" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="zipcode" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Zipcode</label>
                <input 
                  id="zipcode"
                  type="text" 
                  placeholder="ex. 70945" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="contact-method" className="block text-xs font-semibold text-gray-700 uppercase mb-2">How may we contact you:</label>
                <div className="relative">
                  <select 
                    id="contact-method"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select one</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-info" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Contact Info</label>
                <input 
                  id="contact-info"
                  type="text" 
                  placeholder="ex. 278.268.6823 x36440" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label htmlFor="referral" className="block text-xs font-semibold text-gray-700 uppercase mb-2">How did you hear about us</label>
                <div className="relative">
                  <select 
                    id="referral"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Select one</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend / Family</option>
                    <option value="search">Search Engine</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="ssn" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Social Security Number</label>
                <input 
                  id="ssn"
                  type="text" 
                  placeholder="0 123 456 7890" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-10 py-3 rounded-md shadow transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-12 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                &ldquo;We are here to provide you the best care for your health problems!&rdquo;
              </p>
              <div className="space-y-1 pt-2">
                <p className="font-bold text-gray-900 text-sm">Contact Us</p>
                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <Printer className="w-3.5 h-3.5 text-blue-500" /> 081234567890
                </p>
                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-blue-500" /> 081234567890
                </p>
              </div>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-4">Quick Links</p>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Our Team</Link></li>
                <li><Link href="/patient" className="hover:text-blue-600">Patients</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Education</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-4">Follow Us</p>
              <div className="flex space-x-3">
                <Link href="#" className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:opacity-90 font-bold text-xs">
                  f
                </Link>
                <Link href="#" className="w-8 h-8 bg-pink-600 text-white rounded flex items-center justify-center hover:opacity-90 font-bold text-xs">
                  ig
                </Link>
              </div>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-4">Locations</p>
              <div className="flex items-start space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 leading-relaxed">
                  6118 Parkway Drive, Corpus Christi, Texas 78414
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-10 pt-6 text-xs text-gray-500 leading-relaxed">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa exercitationem veritatis velit, repellendus at fuga nobis quasi officiis atque dolor rerum distinctio beatae error vel est reiciendis ex nulla accusantium.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}