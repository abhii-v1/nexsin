"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wrench,
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit mobile number");
      return;
    }
    setStep("otp");
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("success");

      setTimeout(() => {
        router.push("/registerservice");
      }, 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a1a33] flex flex-col">

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 px-6 py-20">
        <div className="w-full max-w-6xl mx-auto">

          {/* TOP INFO */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Earn More. Earn Respect. Safety Ensured.
            </h1>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Join verified service professionals across India and grow your income
              with trust, safety, and transparent payments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 items-center gap-16">

            {/* LEFT CARD */}
            <div>
              <div
                className="bg-white rounded-[32px] p-10 shadow-2xl"
                style={{
                  borderTopRightRadius: "120px",
                  borderBottomRightRadius: "120px",
                }}
              >
                {/* PHONE STEP */}
                {step === "phone" && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Register Here
                    </h2>
                    <p className="text-gray-500 mb-6">
                      Enter your mobile number to receive OTP
                    </p>

                    <div className="relative mb-6">
                      <label className="absolute -top-2 left-4 bg-white px-1 text-xs text-gray-500">
                        Mobile Number
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-600">
                        <span className="text-gray-500 mr-3">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="9876543210"
                          className="w-full outline-none"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </div>
                    </div>

                    <button
                      onClick={sendOtp}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition shadow-lg"
                    >
                      Send OTP →
                    </button>

                    <p className="text-xs text-gray-400 mt-4 text-center">
                      We’ll never share your number with anyone
                    </p>
                  </>
                )}

                {/* OTP STEP */}
                {step === "otp" && (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Verify OTP
                    </h2>
                    <p className="text-gray-500 mb-6">
                      OTP sent to +91 {phone}
                    </p>

                    <input
                      type="text"
                      maxLength={6}
                      placeholder="••••••"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-center tracking-widest text-lg focus:border-blue-600 outline-none"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                    />

                    <button
                      onClick={verifyOtp}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition shadow-lg"
                    >
                      {loading ? "Verifying..." : "Verify & Continue →"}
                    </button>

                    <button
                      onClick={() => setStep("phone")}
                      className="block mx-auto mt-4 text-sm text-blue-600 hover:underline"
                    >
                      Change number
                    </button>
                  </>
                )}

                {/* SUCCESS STEP */}
                {step === "success" && (
                  <div className="text-center py-10">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Registration Successful 🎉
                    </h2>
                    <p className="text-gray-500">
                      Redirecting you to complete profile setup…
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="hidden md:flex justify-center">
              <img
                src="/illustrations/image.png"
                alt="Service Professional"
                className="w-[420px] drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0f172a] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* BRAND */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-8 w-8 text-[#007BFF]" />
                <span className="text-2xl font-bold">FixMate</span>
              </div>
              <p className="text-[#cbd5e1] mb-4">
                Your trusted partner for all home repair and maintenance services.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-[#cbd5e1]">
                <li>Plumbing</li>
                <li>Electrical</li>
                <li>AC Repair</li>
                <li>Carpentry</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#cbd5e1]">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@nexsyn.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Madhya Pradesh, India</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-[#cbd5e1]">
            © 2024 FixMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
