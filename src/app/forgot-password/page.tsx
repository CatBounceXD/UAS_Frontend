import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Phone, MapPin } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-2xs p-6 sm:p-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 bg-[#EAF4FD] hover:bg-[#d8ecfc] text-[#2394F0] text-xs font-medium px-3.5 py-1.5 rounded-md transition mb-6"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>

              <h1 className="text-2xl sm:text-[26px] font-bold text-[#1E293B] leading-tight">
                Forgot Your Password
              </h1>
              <p className="text-2xl sm:text-[26px] font-bold text-[#2394F0] leading-tight mt-0.5 mb-3">
                Orthopaedic Center <span aria-hidden="true">👋</span>
              </p>

              <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                Enter your registered email below to receive password reset
                instruction
              </p>

              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-[#1E293B] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ex. john.smith@domain.com"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2394F0] transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2394F0] hover:bg-[#1b7fd3] text-white text-sm font-medium py-3 rounded-md shadow-2xs transition cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

  
          <div className="lg:col-span-7 flex items-center justify-center">
            <svg
              viewBox="0 0 640 480"
              className="w-full max-w-xl h-auto"
              role="img"
              aria-label="Illustration of a person thinking next to a large blue question mark"
            >
            
              <line
                x1="50"
                y1="408"
                x2="590"
                y2="408"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />

           
              <path
                d="M115 408 C95 350, 90 295, 110 245 C128 290, 134 345, 128 408 Z"
                fill="#38BDF8"
              />
              <path
                d="M126 408 C125 360, 136 315, 158 280 C154 322, 146 365, 136 408 Z"
                fill="#1D8FE1"
              />
              <path
                d="M142 408 C154 368, 172 338, 194 316 C182 350, 166 380, 152 408 Z"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />

             
              <path
                d="M235 162 C235 98, 292 62, 358 62 C424 62, 476 100, 476 158 C476 206, 444 232, 412 252 C390 266, 382 280, 382 306 L320 306 C320 262, 342 238, 374 217 C398 201, 412 186, 412 160 C412 130, 388 112, 356 112 C322 112, 298 132, 296 164 Z"
                fill="#0B5FA5"
              />

              
              <path
                d="M214 162 C214 98, 271 62, 337 62 C403 62, 455 100, 455 158 C455 206, 423 232, 391 252 C369 266, 361 280, 361 306 L299 306 C299 262, 321 238, 353 217 C377 201, 391 186, 391 160 C391 130, 367 112, 335 112 C301 112, 277 132, 275 164 Z"
                fill="#1D8FE1"
              />

         
              <circle cx="371" cy="368" r="34" fill="#0B5FA5" />
              <circle cx="350" cy="368" r="34" fill="#1D8FE1" />

             
              <path
                d="M482 54 H552 C565 54, 576 65, 576 78 V124 C576 137, 565 148, 552 148 H504 L486 166 V148 H482 C469 148, 458 137, 458 124 V78 C458 65, 469 54, 482 54 Z"
                fill="#EFF8FF"
                stroke="#93C5FD"
                strokeWidth="1.5"
              />
              <text
                x="517"
                y="112"
                textAnchor="middle"
                fill="#1D8FE1"
                fontSize="32"
                fontWeight="700"
              >
                ¿
              </text>

             
              <path
                d="M454 276 L432 394 H406 L422 276 Z"
                fill="#1E293B"
              />
              <path
                d="M474 276 L496 394 H522 L498 276 Z"
                fill="#0F172A"
              />
              <path
                d="M406 394 H434 L438 408 H398 C398 400, 401 394, 406 394 Z"
                fill="#2394F0"
              />
              <path
                d="M496 394 H524 L536 408 H496 Z"
                fill="#2394F0"
              />

       
              <path
                d="M428 242 H502 L512 292 H474 L465 264 L455 292 H420 Z"
                fill="#1E293B"
              />
              
              <circle cx="442" cy="256" r="1.5" fill="#94A3B8" />
              <circle cx="468" cy="252" r="1.5" fill="#94A3B8" />
              <circle cx="488" cy="264" r="1.5" fill="#94A3B8" />
              <circle cx="436" cy="278" r="1.5" fill="#94A3B8" />
              <circle cx="508" cy="312" r="1.5" fill="#94A3B8" />
              <circle cx="422" cy="328" r="1.5" fill="#94A3B8" />
              <circle cx="514" cy="352" r="1.5" fill="#94A3B8" />
              <circle cx="416" cy="366" r="1.5" fill="#94A3B8" />

            
              <path
                d="M432 162 C432 152, 444 146, 464 146 C484 146, 496 152, 496 162 L504 244 H426 Z"
                fill="#2394F0"
              />

             
              <path
                d="M434 166 L418 214 L478 218 L478 202 L438 198 L448 172 Z"
                fill="#1D8FE1"
              />
              <path
                d="M494 166 L508 216 L444 222 L444 206 L486 202 L478 172 Z"
                fill="#2394F0"
              />

           
              <path
                d="M468 148 C464 138, 468 126, 475 124 C480 123, 483 128, 483 135 L482 152 Z"
                fill="#FDBA74"
              />

             
              <rect x="458" y="132" width="14" height="18" rx="4" fill="#FDBA74" />
              <circle cx="465" cy="114" r="24" fill="#FDBA74" />

              
              <path
                d="M441 112 C436 102, 441 88, 452 86 C458 76, 474 75, 482 84 C493 84, 500 94, 496 105 C491 103, 486 101, 482 96 C476 102, 464 103, 454 98 C450 104, 446 109, 441 112 Z"
                fill="#1E293B"
              />

           
              <circle cx="456" cy="114" r="2" fill="#1E293B" />
              <path
                d="M450 116 L446 121 L451 122"
                fill="none"
                stroke="#9A3412"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M452 127 Q457 125 461 128"
                fill="none"
                stroke="#9A3412"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

    
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