"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Wrench, Mail, Lock } from "lucide-react";
import { GoogleIcon } from "./CustomIcons";
import MuiButton from "@mui/material/Button";
import { signIn } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const goToHomePage = () => {
    router.push("/home"); 
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    // Simulate login request
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSuccess("Signed in successfully! Redirecting...");
    // Redirect after a short delay
    setTimeout(() => router.push("/"), 900);
  }

  return (
    <main className="min-h-screen bg-[#0D1117]">
      <header className="border-b bg-[#0D1117]/30 border-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-[#007BFF]" />
            <span className="text-xl sm:text-2xl font-bold text-white">
              Nexcyn
            </span>
          </Link>
        </div>
      </header>

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left: Brand/Benefits - Hidden on mobile for better UX */}
          <div className=" hidden lg:block">
            <div className="bg-[#FFFFFF]/5 rounded-2xl shadow-md p-6 lg:p-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#FFFFFF] mb-4">
                Welcome back to <span className="text-[#007BFF]">Nexcyn</span>
              </h1>
              <p className="text-base lg:text-lg text-[#FFFFFF] mb-6">
                Sign in to manage your bookings, track service status, and view
                your history.
              </p>
              <ul className="space-y-3 text-[#343A40]">
                <li className="text-[#FFFFFF] flex items-start gap-3">
                  <span className=" mt-1 inline-block w-2.5 h-2.5 rounded-full bg-[#FFFFFF]"></span>
                  10,000+ happy customers
                </li>
                <li className="text-[#FFFFFF] flex items-start gap-3">
                  <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-[#FFFFFF]"></span>
                  98% satisfaction rate
                </li>
                <li className="text-[#FFFFFF] flex items-start gap-3">
                  <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-[#FFFFFF]"></span>
                  Same-day service in most areas
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Login Card */}
        <Card className="bg-[#FFFFFF]/5 border-0 shadow-xl max-w-md w-full mx-auto">
            <CardHeader className="space-y-1 p-4 sm:p-6"> 
              
              <CardTitle className="text-xl sm:text-2xl text-white text-center lg:text-left">
                Sign in to your account  
              </CardTitle>
              <CardDescription className="text-white text-center lg:text-left text-sm sm:text-base">
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-white text-sm sm:text-base"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white text-sm sm:text-base"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6C757D]" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10 h-11 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#007BFF] text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6C757D] hover:text-[#343A40] touch-manipulation"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Options */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-white text-sm sm:text-base"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-[#007BFF] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Messages */}
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                    {success}
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 rounded-xl bg-[#007BFF] hover:bg-[#0067d6] text-sm sm:text-base font-medium"
                  onClick={goToHomePage}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>

                {/* Or divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-[#6C757D]">or</span>
                  </div>
                </div>

                {/* Secondary actions */}
                <MuiButton
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={async () => {
                    signIn("google", { callbackUrl: "/" });
                  }}
                  sx={{
                    color: "#cfd4dcff",
                    fontWeight: "bold",
                    borderColor: "#3607efff",
                    backgroundColor: "#007bffda",
                    text:"white",

                    "&:hover": {
                      borderColor: "#1035f0ff",
                      backgroundColor: "#351ee3b3",
                    },
                  }}
                >
                  Sign in with Google
                </MuiButton>
                <div className="text-xs sm:text-sm text-[#cbd5e1]"> </div>
                <div className="text-xs sm:text-sm text-[#cbd5e1]">
                  Don{"'"}t have an account?{" "}
                  <Link href="/createAccount" className="text-[#007BFF] hover:underline">
                    Create account
                  </Link>
                </div>
                <div className="text-center text-xs sm:text-sm text-[#6C757D] leading-relaxed">
                  {" "}
                </div>
                <div className="text-center text-xs sm:text-sm text-[#6C757D] leading-relaxed">
                  {" "}
                </div>
                <div className="text-center text-xs sm:text-sm text-[#6C757D] leading-relaxed">
                  By continuing, you agree to our{" "}
                  <Link href="#" className="text-[#007BFF] hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#007BFF] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
