"use client"

import type { PersonalDetails, ServiceDetails, Documents, BankDetails } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { saveApplication } from "@/lib/storage"

interface ReviewSubmitStepProps {
  personalDetails: PersonalDetails
  serviceDetails: ServiceDetails
  documents: Documents
  bankDetails: BankDetails
  onBack: () => void
  onSubmit: (applicationId: string) => void
}

export function ReviewSubmitStep({
  personalDetails,
  serviceDetails,
  documents,
  bankDetails,
  onBack,
  onSubmit,
}: ReviewSubmitStepProps) {

  const handleSubmit = () => {
    const applicationId = `APP${Date.now()}`

    // ✅ LIGHT DATA ONLY (NO DOCUMENTS)
    const application = {
      id: applicationId,
      personalDetails,
      serviceDetails,
      bankDetails,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    
    onSubmit(applicationId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please review all information before submitting
        </p>
      </div>

      {/* Personal Details */}
      <Section title="Personal Details">
        <InfoGrid>
          <InfoItem label="Full Name" value={personalDetails.fullName} />
          <InfoItem label="Email" value={personalDetails.email} />
          <InfoItem label="Phone" value={personalDetails.phone} />
          <InfoItem label="City" value={personalDetails.city} />
          <InfoItem label="State" value={personalDetails.state} />
          <InfoItem label="Pincode" value={personalDetails.pincode} />
          <InfoItem label="Address" value={personalDetails.address} className="md:col-span-2" />
        </InfoGrid>
      </Section>

      {/* Service Details */}
      <Section title="Service Details">
        <InfoGrid>
          <InfoItem label="Category" value={serviceDetails.category} />
          <InfoItem label="Experience" value={`${serviceDetails.experience} years`} />
          <InfoItem
            label="Service Areas"
            value={serviceDetails.serviceAreas.join(", ")}
            className="md:col-span-2"
          />
          <InfoItem
            label="Description"
            value={serviceDetails.description}
            className="md:col-span-2"
          />
        </InfoGrid>
      </Section>

      {/* Bank Details */}
      <Section title="Bank Details">
        <InfoGrid>
          <InfoItem label="Account Holder" value={bankDetails.accountHolderName} />
          <InfoItem label="Account Number" value={bankDetails.accountNumber} />
          <InfoItem label="IFSC Code" value={bankDetails.ifscCode} />
          <InfoItem label="Bank Name" value={bankDetails.bankName} />
        </InfoGrid>
      </Section>

      {/* Documents (UI only, not saved) */}
      <Section title="Documents Uploaded">
        <ul className="space-y-2">
          <DocumentItem label="Aadhaar Card (Front)" file={documents.aadhaarFront} />
          <DocumentItem label="Aadhaar Card (Back)" file={documents.aadhaarBack} />
          <DocumentItem label="PAN Card" file={documents.panCard} />
          <DocumentItem label="Bank Proof" file={documents.bankProof} />
          <DocumentItem label="Profile Photo" file={documents.profilePhoto} />
        </ul>
      </Section>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg">
          Submit Application
        </Button>
      </div>
    </div>
  )
}

/* ---------- Helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  )
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-4 md:grid-cols-2">{children}</dl>
}

function InfoItem({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}

function DocumentItem({ label, file }: { label: string; file: File | null }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span className="text-green-600">✔</span>
      {label}: <span className="text-gray-600">{file?.name}</span>
    </li>
  )
}
