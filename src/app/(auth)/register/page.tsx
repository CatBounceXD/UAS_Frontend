"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const phone = (formData.get("phone") as string).replace(/[\s-]/g, "");
    const dob = formData.get("dob") as string;

    if (password.length < 8) {
      setErrorMessage("Password harus minimal 8 karakter!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password dan Confirm Password tidak sama!");
      return;
    }
    if (!/^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(phone)) {
      setErrorMessage(
        "Masukkan nomor HP yang valid (contoh: 081234567890 atau +6281234567890)!",
      );
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        phone,
        dob,
      });

      if (error) {
        setErrorMessage(error.message || "Registrasi gagal");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
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

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600"
              >
                {errorMessage}
              </div>
            )}

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
                    inputMode="tel"
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
                disabled={isLoading}
                className="w-full h-11 mt-4 bg-[#2196F3] hover:bg-blue-600"
              >
                {isLoading ? "Signing up..." : "Signup"}
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
