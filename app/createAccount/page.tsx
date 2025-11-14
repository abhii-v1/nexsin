"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  EyeOff,
  Eye,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Phone,
} from "lucide-react";

export default function CreateAccountPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // password ui
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSuccess("Account created successfully! Redirecting to home...");
    setTimeout(() => router.push("/home"), 1500);
  }

  // a small helper class to keep ALL inputs dark
  const inputClass =
    "h-11 rounded-xl bg-[#0F172A]/50 focus:bg-[#0F172A]/70 border border-gray-500/60 text-white placeholder-gray-400 focus:border-blue-500 transition pr-10";

  return (
    <main className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#60a5fa] hover:text-[#93c5fd] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Create Your Account
          </h1>
          <p className="text-gray-400 mt-2">
            Fill in the required details to create your new account.
          </p>
        </div>

        <Card className="bg-[#0F172A]/70 backdrop-blur-md border border-white/10 shadow-2xl">
          <CardHeader className="p-6 border-b border-white/10">
            <CardTitle className="text-lg sm:text-xl text-white">
              Account Information
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form className="space-y-6" onSubmit={onSubmit} noValidate>
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Full Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={`pl-9 ${inputClass}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`pl-9 ${inputClass}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone *
                  </Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className={`pl-9 ${inputClass}`}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password *
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (confirmPassword.length > 0) {
                          setPasswordMatch(e.target.value === confirmPassword);
                        }
                      }}
                      placeholder="Enter password"
                      className={`pl-9 pr-10 ${inputClass}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm Password *
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMatch(password === e.target.value);
                      }}
                      placeholder="Re-enter password"
                      className={`pl-9 ${inputClass}`}
                      required
                    />
                  </div>
                  {confirmPassword && (
                    <p
                      className={`mt-1 text-sm ${
                        passwordMatch ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {passwordMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address" className="text-white">
                    Address *
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Street / Area"
                    className={`mt-2 ${inputClass}`}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-white">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className={`mt-2 ${inputClass}`}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-white">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className={`mt-2 ${inputClass}`}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pin" className="text-white">
                    PIN Code *
                  </Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="e.g. 110001"
                      className={`pl-9 ${inputClass}`}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {error && (
                <div className="text-sm text-red-400 bg-red-900/30 border border-red-700/30 rounded-lg p-3">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-sm text-green-400 bg-green-900/30 border border-green-700/30 rounded-lg p-3">
                  {success}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 sm:h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 transition-all duration-300 text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="bg-black h-11 sm:h-12 rounded-xl border-white/20 text-white "
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
