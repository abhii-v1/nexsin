"use client"

import { useState, useEffect } from "react"

import { PersonalDetailsStep } from "@/components/registerAsprovider/personal-details-step"
import { ServiceDetailsStep } from "@/components/registerAsprovider/service-details-step"
import { DocumentUploadStep } from "@/components/registerAsprovider/document-upload-step"
import { ReviewSubmitStep } from "@/components/registerAsprovider/review-submit-step"
import { SuccessStep } from "@/components/registerAsprovider/success-step"
import { StepperIntroCard } from "@/components/ui/StepperIntroCard"

import type {
  PersonalDetails,
  ServiceDetails,
  Documents,
  BankDetails,
} from "@/types/provider"

import {
  saveCurrentApplication,
  getCurrentApplication,
  clearCurrentApplication,
} from "@/lib/storage"

const steps = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Service Details" },
  { id: 3, label: "Documents" },
  { id: 4, label: "Review" },
]

export default function ProviderRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [showStepperIntro, setShowStepperIntro] = useState(true)

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    category: "electrician",
    experience: "",
    serviceAreas: [],
    description: "",
  })

  const [documents, setDocuments] = useState<Documents>({
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    bankProof: null,
    profilePhoto: null,
  })

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  })

  /* Restore saved progress */
  useEffect(() => {
    const saved = getCurrentApplication()
    if (saved) {
      setCurrentStep(saved.currentStep || 1)
      setPersonalDetails(saved.personalDetails || personalDetails)
      setServiceDetails(saved.serviceDetails || serviceDetails)
      setBankDetails(saved.bankDetails || bankDetails)
    }
  }, [])

  const saveProgress = () => {
    saveCurrentApplication({
      currentStep,
      personalDetails,
      serviceDetails,
      bankDetails,
    })
  }

  const handleNext = () => {
    saveProgress()
    setCurrentStep((p) => Math.min(p + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((p) => Math.max(p - 1, 1))
  }

  const handleSubmit = (id: string) => {
    setApplicationId(id)
    setSubmitted(true)
    clearCurrentApplication()
  }

  if (submitted) {
    return <SuccessStep applicationId={applicationId} />
  }

  return (
    <>
      {showStepperIntro && (
        <StepperIntroCard onFinish={() => setShowStepperIntro(false)} />
      )}

      {!showStepperIntro && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center px-4 py-14">
          <div className="w-full max-w-4xl">

            {/* HEADER */}
            <div className="text-center mb-14">
              <h1 className="text-3xl font-bold text-gray-900">
                Service Provider Registration
              </h1>
              <p className="text-sm font-medium text-gray-600 mt-2">
                Join our network of trusted professionals
              </p>
            </div>

            {/* ======= CENTERED PREMIUM STEPPER ======= */}
            <div className="flex justify-center mb-14">
              <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-1 items-center">

                      {/* STEP */}
                      <div className="flex flex-col items-center z-10">
                        <div
                          className={`h-9 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                            ${
                              currentStep >= step.id
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white border border-gray-300 text-gray-500"
                            }`}
                        >
                          {step.id}
                        </div>
                        <span className="mt-2 text-xs font-medium text-gray-600 text-center">
                          {step.label}
                        </span>
                      </div>

                      {/* CONNECTOR */}
                      {index !== steps.length - 1 && (
                        <div
                          className={`flex-1 h-[2px] mx-1 mt-[-15px] transition-all duration-600
                            ${
                              currentStep > step.id
                                ? "bg-blue-600"
                                : "bg-gray-300"
                            }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10">

              {currentStep === 1 && (
                <PersonalDetailsStep
                  data={personalDetails}
                  onUpdate={setPersonalDetails}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <ServiceDetailsStep
                  data={serviceDetails}
                  onUpdate={setServiceDetails}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <DocumentUploadStep
                  documents={documents}
                  bankDetails={bankDetails}
                  onUpdateDocuments={setDocuments}
                  onUpdateBankDetails={setBankDetails}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 4 && (
                <ReviewSubmitStep
                  personalDetails={personalDetails}
                  serviceDetails={serviceDetails}
                  documents={documents}
                  bankDetails={bankDetails}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                />
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}
