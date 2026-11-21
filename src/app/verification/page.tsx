"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmailVerificationPage() {
  const [code, setCode] = useState<string[]>(["5", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState<number>(45);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const formattedTimer = `00:${String(secondsLeft).padStart(2, "0")}`;

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...code];
    updated[index] = cleanValue;
    setCode(updated);

    if (cleanValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setSecondsLeft(45);
    setCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* KOLOM KIRI: CARD EMAIL VERIFICATION */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xs p-6 sm:p-8">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-1.5 bg-[#EAF4FD] hover:bg-[#d8ecfc] text-[#2394F0] text-xs font-medium px-3.5 py-1.5 rounded-md transition mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>

            <h1 className="text-2xl sm:text-[26px] font-bold text-[#1E293B] leading-tight">
              Email Verification Please
            </h1>
            <p className="text-2xl sm:text-[26px] font-bold text-[#2394F0] leading-tight mt-0.5 mb-2.5">
              Orthopaedic Center <span aria-hidden="true">👋</span>
            </p>

            <div className="flex items-center gap-2 text-xs mb-6">
              <span className="text-[#64748B]">john.smith@domain.com</span>
              <Link
                href="/forgot-password"
                className="text-[#2394F0] hover:underline font-medium"
              >
                Not you?
              </Link>
            </div>

            <form className="space-y-6">
              {/* 4 KOTAK INPUT KODE */}
              <div className="flex items-center gap-3">
                {code.map((digit, index) => {
                  const isFilled = digit !== "";
                  return (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      aria-label={`Verification digit ${index + 1}`}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-12 sm:w-13 sm:h-13 rounded-lg text-center text-base font-medium transition focus:outline-none ${
                        isFilled
                          ? "bg-white border border-[#2394F0] text-[#1E293B] focus:ring-2 focus:ring-[#2394F0]"
                          : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] focus:border-[#2394F0] focus:bg-white focus:ring-2 focus:ring-[#2394F0]"
                      }`}
                    />
                  );
                })}
              </div>

              {/* TIMER & RESEND CODE */}
              <div className="flex items-center gap-2.5 text-xs">
                <span className="text-[#64748B] font-medium tabular-nums">
                  {formattedTimer}
                </span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#2394F0] hover:underline font-medium cursor-pointer"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2394F0] hover:bg-[#1b7fd3] text-white text-sm font-medium py-3 rounded-md shadow-2xs transition cursor-pointer"
              >
                Verify
              </button>
            </form>
          </div>
        </div>

        {/* KOLOM KANAN: ILUSTRASI JAM & HOURGLASS */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <svg
            viewBox="0 0 640 460"
            className="w-full max-w-xl h-auto"
            role="img"
            aria-label="Illustration of a person holding a clock next to a large hourglass"
          >
            {/* Bayangan lantai */}
            <ellipse cx="445" cy="378" rx="125" ry="9" fill="#F1F5F9" />

            {/* Hourglass di sisi kanan */}
            <rect x="442" y="218" width="118" height="12" rx="6" fill="#2394F0" />
            <rect x="442" y="362" width="118" height="12" rx="6" fill="#2394F0" />

            {/* Kaca hourglass */}
            <path
              d="M454 230 H548 C544 265, 514 286, 501 296 C514 306, 544 327, 548 362 H454 C458 327, 488 306, 501 296 C488 286, 458 265, 454 230 Z"
              fill="#DBEAFE"
            />
            {/* Pasir atas */}
            <path
              d="M472 254 H530 C522 272, 508 283, 501 290 C494 283, 480 272, 472 254 Z"
              fill="#60A5FA"
            />
            {/* Butiran pasir jatuh */}
            <circle cx="501" cy="304" r="2.2" fill="#2394F0" />
            <circle cx="501" cy="316" r="2.2" fill="#2394F0" />
            <circle cx="501" cy="328" r="2.2" fill="#2394F0" />
            {/* Pasir bawah */}
            <path
              d="M474 362 C482 350, 493 344, 501 344 C509 344, 520 350, 528 362 Z"
              fill="#2394F0"
            />

            {/* Kaki & sepatu karakter */}
            <path d="M416 254 L394 366 H374 L396 254 Z" fill="#2394F0" />
            <path d="M436 254 L444 366 H464 L452 254 Z" fill="#1D8FE1" />

            {/* Manset celana & sepatu */}
            <rect x="374" y="354" width="20" height="8" fill="#1E293B" />
            <rect x="444" y="354" width="20" height="8" fill="#1E293B" />
            <path d="M374 366 H394 L398 376 H364 C364 370, 368 366, 374 366 Z" fill="#1E293B" />
            <path d="M444 366 H464 L476 376 H442 Z" fill="#1E293B" />

            {/* Celana biru */}
            <path
              d="M394 228 H456 L458 264 H432 L426 248 L418 264 H392 Z"
              fill="#2394F0"
            />

            {/* Sweater lengan panjang gelap */}
            <path
              d="M396 154 C396 144, 408 138, 426 138 C442 138, 452 144, 452 154 L454 232 H394 Z"
              fill="#1E293B"
            />
            {/* Aksen jahitan tipis di dada */}
            <path
              d="M418 148 L424 155 L430 148"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lengan kanan mengangkat jam */}
            <path
              d="M398 158 L368 192 L344 184 L348 172 L366 178 L388 150 Z"
              fill="#1E293B"
            />
            <circle cx="342" cy="176" r="7" fill="#FDBA74" />

            {/* Lengan kiri ke arah hourglass */}
            <path
              d="M448 158 L462 198 L442 204 L436 192 L448 188 L438 164 Z"
              fill="#1E293B"
            />
            <circle cx="440" cy="198" r="7" fill="#FDBA74" />

            {/* Jam bulat di tangan kanan */}
            <circle
              cx="396"
              cy="158"
              r="24"
              fill="#FFFFFF"
              stroke="#2394F0"
              strokeWidth="4.5"
            />
            <line
              x1="396"
              y1="158"
              x2="396"
              y2="146"
              stroke="#1E293B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="396"
              y1="158"
              x2="406"
              y2="152"
              stroke="#1E293B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Leher & kepala karakter */}
            <rect x="420" y="124" width="12" height="16" rx="4" fill="#FDBA74" />
            <circle cx="426" cy="106" r="19" fill="#FDBA74" />

            {/* Rambut gelap */}
            <path
              d="M408 102 C406 90, 414 80, 426 80 C434 74, 446 76, 450 86 C452 92, 448 98, 442 96 C436 94, 424 94, 414 100 Z"
              fill="#1E293B"
            />

            {/* Wajah */}
            <circle cx="418" cy="107" r="1.7" fill="#1E293B" />
            <path
              d="M413 110 L410 115 L414 116"
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M415 119 Q420 122 424 119"
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}