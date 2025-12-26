"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface SuccessStepProps {
  applicationId: string
}

export function SuccessStep({ applicationId }: SuccessStepProps) {
  const router = useRouter()

  // ⏳ Auto redirect after 3 seconds (ONLY ONE ROUTE)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/providerdashboard") // ✅ correct & single route
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 text-center shadow-lg">

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          🎉 Your account has been created successfully!
        </h1>

        <p className="mb-6 text-lg text-gray-600">
          Thank you for registering as a service provider.
        </p>

        {/* Application ID */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">Your Application ID</p>
          <p className="text-2xl font-bold text-indigo-600">
            {applicationId}
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Redirecting you to your dashboard...
        </p>

        {/* Thank You Button (NO ROUTE) */}
        <Button size="lg" disabled>
          Thank you 🙏
        </Button>
      </div>
    </div>
  )
}
