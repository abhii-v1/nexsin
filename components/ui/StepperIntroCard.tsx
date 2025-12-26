"use client"

import { useEffect, useState } from "react"
import { ShieldCheck, ArrowRight } from "lucide-react"

interface StepperIntroCardProps {
    onFinish: () => void
}

const steps = [
    "Personal Details",
    "Service Information",
    "Documents & Bank",
    "Review & Submit",
]

export function StepperIntroCard({ onFinish }: StepperIntroCardProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => p + 1)
        }, 20) // 2 seconds total

        const timer = setTimeout(() => {
            onFinish()
        }, 4000)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [onFinish])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">

            <div
                className="
          w-full max-w-lg
          rounded-2xl
          
          bg-black
          text-white
         shadow-2xl

          p-6
          animate-in fade-in zoom-in
        "
            >
                {/* 🔔 HEADER */}
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-400">
                        <ShieldCheck className="h-4 w-4" />
                        Secure Onboarding
                    </span>

                    <span className="text-xs text-gray-400">
                        Step-by-step setup
                    </span>
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-bold mb-1">
                    Complete Your Provider Setup
                </h2>
                <p className="text-sm text-gray-400">
                    Just a few quick steps to activate your FixMate account
                </p>

                {/* STEPS */}
                <div className="mt-6 space-y-3">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className="flex items-center gap-3"
                        >
                            <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-semibold">
                                {index + 1}
                            </div>
                            <p className="text-sm text-gray-300 flex-1">
                                {step}
                            </p>
                            
                        </div>
                    ))}
                </div>

                {/* PROGRESS BAR */}
                <div className="mt-6">
                    <div className="h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-400 text-center">
                        Preparing your onboarding…
                    </p>
                </div>

            </div>
        </div>
    )
}
