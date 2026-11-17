"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        {/* Bagian Login */}
        <Card className="w-full max-w-sm mx-auto">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Welcome Back To Orthopaedic Center</CardTitle>

              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>

              <div className="text-right">
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Sign Up
                </Link>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-6">
             
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>

               
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                    <Link
                      href="/forgot-password"
                      className="text-sm hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      required
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-stretch gap-4">
              <Button type="submit" className="w-full mt-6">
                Login
              </Button>

              <p className="w-full text-center text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="flex justify-center items-center">
          <Image
            src="/Login-illustration.png"
            alt="Login Illustration"
            width={600}
            height={600}
            className="w-full max-w-107.5 h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
