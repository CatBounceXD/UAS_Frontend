
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 8) {
      setError("Password harus memiliki minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] flex items-center justify-center p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl w-full">

        <Card className="w-full max-w-sm mx-auto">

          {success ? (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto bg-green-100 text-green-600 rounded-full p-4 mb-3">
                  <LockKeyhole size={30} />
                </div>

                <CardTitle className="text-xl">
                  Password Successfully Changed!
                </CardTitle>

                <CardDescription>
                  Your new password has been created.
                  You can now return to the login page.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Link href="/login" className="w-full">
                  <Button className="w-full bg-[#2196F3] hover:bg-blue-600">
                    Back to Login
                  </Button>
                </Link>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl">
                  Forgot Password?
                </CardTitle>

                <CardDescription>
                  Create a new password for your Orthopaedic Center account.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  id="reset-password-form"
                  onSubmit={handleResetPassword}
                  className="flex flex-col gap-5"
                >

                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>

                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your registered email"
                        required
                        className="pr-10"
                      />

                      <Mail
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">
                      New Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        minLength={8}
                        required
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-400">
                      Password must contain at least 8 characters.
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        minLength={8}
                        required
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#2196F3] hover:bg-blue-600"
                  >
                    Reset Password
                  </Button>

                </form>
              </CardContent>

              <CardFooter className="justify-center">
                <p className="text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="text-blue-500 hover:underline"
                  >
                    Back to Login
                  </Link>
                </p>
              </CardFooter>
            </>
          )}

        </Card>

        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="text-[#2196F3] mb-4">
              <LockKeyhole size={65} className="mx-auto" />
            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              Secure Your Account
            </h2>

            <p className="text-sm text-slate-500 mt-2 max-w-sm">
              Create a strong new password to keep
              your Orthopaedic Center account secure.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
