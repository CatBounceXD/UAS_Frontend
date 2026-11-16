import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

export default function PatientPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10">
          
          {/* STEPPER */}
          <div className="flex items-center justify-center max-w-3xl mx-auto mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                ✓
              </div>
              <span className="text-sm font-semibold text-blue-600">Patient Information</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-4"></div>
            <div className="flex items-center space-x-3 opacity-60">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Insurance Information</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            <div className="flex items-center space-x-3 opacity-40">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-sm font-medium text-gray-500 hidden sm:inline">Appointment Information</span>
            </div>
          </div>

          {/* SECTION TITLE */}
          <h1 className="text-xl font-bold text-blue-900 mb-8 flex items-center gap-2 border-b pb-4">
            <span className="text-blue-600">&lt;</span> Patient Information
          </h1>

          {/* FORM - 3 Columns Grid */}
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
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase mb-2">Email</label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="ex. john.smith@domain.com" 
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
    </div>
  );
}