"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
       
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
              Reset Your Password
            </h1>
            <p className="text-2xl sm:text-[26px] font-bold text-[#2394F0] leading-tight mt-0.5 mb-3">
              Orthopaedic Center <span aria-hidden="true">👋</span>
            </p>

            <p className="text-xs text-[#64748B] leading-relaxed mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </p>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-xs font-medium text-[#1E293B] mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    defaultValue="****************"
                    placeholder="Enter new password"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-4 pr-11 py-3 text-xs sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2394F0] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={
                      showNewPassword ? "Hide new password" : "Show new password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#2394F0] hover:text-[#1b7fd3] transition cursor-pointer"
                  >
                    {showNewPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-xs font-medium text-[#1E293B] mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new Password"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md pl-4 pr-11 py-3 text-xs sm:text-sm text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2394F0] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B] transition cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
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

        
        <div className="lg:col-span-7 flex items-center justify-center">
          <svg
            viewBox="0 0 640 460"
            className="w-full max-w-xl h-auto"
            role="img"
            aria-label="Illustration of two people carrying a large blue key beside a password reset card with a padlock"
          >
            <line
              x1="55"
              y1="382"
              x2="585"
              y2="382"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />

            <rect
              x="418"
              y="128"
              width="136"
              height="182"
              rx="6"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />
            <path
              d="M469 114 V102 C469 90, 478 82, 488 82 C498 82, 507 90, 507 102 V114"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="462"
              y="112"
              width="52"
              height="42"
              rx="5"
              fill="#64748B"
            />
            <circle cx="488" cy="129" r="4" fill="#1E293B" />
            <path d="M486 131 H490 L492 141 H484 Z" fill="#1E293B" />

            <rect
              x="468"
              y="168"
              width="38"
              height="10"
              rx="2"
              fill="#E2E8F0"
            />
            <rect
              x="436"
              y="192"
              width="100"
              height="18"
              rx="3"
              fill="#E2E8F0"
            />
            <rect
              x="436"
              y="220"
              width="100"
              height="18"
              rx="3"
              fill="#E2E8F0"
            />
            <rect
              x="436"
              y="256"
              width="100"
              height="24"
              rx="4"
              fill="#2394F0"
            />
            <text
              x="486"
              y="272"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="600"
            >
              Change
            </text>

            <path d="M126 254 L102 374 H82 L106 254 Z" fill="#1E293B" />
            <path d="M142 254 L132 374 H114 L124 254 Z" fill="#0F172A" />
            <path d="M82 374 H104 L106 382 H76 Z" fill="#334155" />
            <path d="M114 374 H134 L138 382 H112 Z" fill="#334155" />

            <path
              d="M104 166 C104 156, 114 150, 130 150 C144 150, 154 156, 154 166 L158 258 H100 Z"
              fill="#475569"
            />

            <circle cx="128" cy="126" r="19" fill="#FDBA74" />
            <path
              d="M110 122 C104 112, 108 98, 120 96 C126 88, 140 88, 146 98 C154 104, 154 120, 148 130 C144 122, 138 118, 132 118 C124 118, 116 120, 110 122 Z"
              fill="#1E293B"
            />
            <circle cx="121" cy="127" r="1.8" fill="#1E293B" />
            <path
              d="M118 135 Q123 138 127 135"
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <g transform="rotate(-32 315 190)">
              <rect
                x="220"
                y="180"
                width="210"
                height="20"
                rx="6"
                fill="#2394F0"
              />
              <rect
                x="382"
                y="200"
                width="14"
                height="22"
                rx="2"
                fill="#2394F0"
              />
              <rect
                x="404"
                y="200"
                width="14"
                height="16"
                rx="2"
                fill="#2394F0"
              />
              <circle
                cx="188"
                cy="190"
                r="42"
                fill="none"
                stroke="#2394F0"
                strokeWidth="18"
              />
            </g>

            <path
              d="M114 176 L158 228 L170 218 L128 168 Z"
              fill="#475569"
            />
            <circle cx="168" cy="224" r="8" fill="#FDBA74" />

            <path d="M324 256 L284 374 H260 L300 256 Z" fill="#1E293B" />
            <path d="M342 256 L362 374 H386 L356 256 Z" fill="#0F172A" />
            <path d="M260 374 H286 L282 382 H254 Z" fill="#334155" />
            <path d="M362 374 H388 L398 382 H362 Z" fill="#334155" />

            <path
              d="M312 162 C312 152, 324 146, 342 146 C358 146, 368 152, 368 162 L366 260 H314 Z"
              fill="#475569"
            />

            <path
              d="M352 166 L364 128 L378 132 L366 174 Z"
              fill="#334155"
            />
            <circle cx="372" cy="126" r="8" fill="#FDBA74" />

            <rect
              x="332"
              y="132"
              width="13"
              height="18"
              rx="4"
              fill="#FDBA74"
            />
            <circle cx="338" cy="114" r="21" fill="#FDBA74" />
            <path
              d="M317 112 C314 102, 320 90, 330 88 C336 80, 350 80, 356 88 C364 90, 368 100, 364 110 C358 106, 350 104, 342 104 C334 104, 324 108, 317 112 Z"
              fill="#1E293B"
            />
            <circle cx="328" cy="114" r="1.8" fill="#1E293B" />
            <path
              d="M322 117 L319 122 L323 123"
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M324 127 Q329 130 333 127"
              fill="none"
              stroke="#9A3412"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}