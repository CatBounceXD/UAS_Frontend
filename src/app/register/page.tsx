"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const phone = formData.get("phone") as string;

    if (password.length < 8) {
      alert("Password harus minimal 8 karakter!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan Confirm Password tidak sama!");
      return;
    }

    if (!/^[0-9]{12,13}$/.test(phone)) {
      alert("Nomor telepon harus terdiri dari 12-13 digit!");
      return;
    }

    alert("Registrasi berhasil!");

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9]">
   
      <section className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Image
              src="/register-illustration.jpg"
              alt="Orthopaedic Center Registration Illustration"
              width={650}
              height={500}
              priority
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="order-2 md:order-1 w-full max-w-md mx-auto bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="mb-5">
              <h1 className="text-xl font-bold text-slate-700">Signup</h1>

              <h2 className="text-xl font-bold text-[#2196F3]">
                Orthopaedic Center
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
             
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs text-slate-600">
                  Full Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="ex. john smith"
                  required
                  className="bg-[#f6f7f9] border-none text-sm h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs text-slate-600">
                  Email Address
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ex. john.smith@domain.com"
                  required
                  className="bg-[#f6f7f9] border-none text-sm h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs text-slate-600">
                    Phone
                  </Label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="081234567890"
                    minLength={12}
                    maxLength={13}
                    pattern="[0-9]{12,13}"
                    inputMode="numeric"
                    required
                    className="bg-[#f6f7f9] border-none text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="text-xs text-slate-600">
                    Date of birth
                  </Label>

                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    className="bg-[#f6f7f9] border-none text-sm h-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs text-slate-600">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    minLength={8}
                    required
                    className="bg-[#f6f7f9] border-none text-sm h-10 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                <p className="text-[10px] text-slate-400">
                  Password must contain at least 8 characters.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs text-slate-600"
                >
                  Confirm Password
                </Label>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    minLength={8}
                    required
                    className="bg-[#f6f7f9] border-none text-sm h-10 pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 mt-4 bg-[#2196F3] hover:bg-blue-600"
              >
                Signup
              </Button>
            </form>

            <p className="text-xs text-slate-600 mt-5">
              Have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
