"use client"

import type React from "react"

import type { Documents, BankDetails } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DocumentUploadStepProps {
  documents: Documents
  bankDetails: BankDetails
  onUpdateDocuments: (docs: Documents) => void
  onUpdateBankDetails: (bank: BankDetails) => void
  onNext: () => void
  onBack: () => void
}

export function DocumentUploadStep({
  documents,
  bankDetails,
  onUpdateDocuments,
  onUpdateBankDetails,
  onNext,
  onBack,
}: DocumentUploadStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleFileChange = (field: keyof Documents, file: File | null) => {
    onUpdateDocuments({ ...documents, [field]: file })
  }

  const handleBankChange = (field: keyof BankDetails, value: string) => {
    onUpdateBankDetails({ ...bankDetails, [field]: value })
  }

  const allDocumentsUploaded =
    documents.aadhaarFront &&
    documents.aadhaarBack &&
    documents.panCard &&
    documents.bankProof &&
    documents.profilePhoto

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
        <p className="mt-1 text-sm text-gray-600">Please upload clear copies of all required documents</p>
      </div>

      {/* Document Uploads */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Identity Documents</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FileUploadField
            label="Aadhaar Card (Front) *"
            file={documents.aadhaarFront}
            onChange={(file) => handleFileChange("aadhaarFront", file)}
          />
          <FileUploadField
            label="Aadhaar Card (Back) *"
            file={documents.aadhaarBack}
            onChange={(file) => handleFileChange("aadhaarBack", file)}
          />
          <FileUploadField
            label="PAN Card *"
            file={documents.panCard}
            onChange={(file) => handleFileChange("panCard", file)}
          />
          <FileUploadField
            label="Profile Photo *"
            file={documents.profilePhoto}
            onChange={(file) => handleFileChange("profilePhoto", file)}
            accept="image/*"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account Holder Name *</Label>
            <Input
              id="accountHolderName"
              required
              value={bankDetails.accountHolderName}
              onChange={(e) => handleBankChange("accountHolderName", e.target.value)}
              placeholder="As per bank records"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input
              id="accountNumber"
              required
              value={bankDetails.accountNumber}
              onChange={(e) => handleBankChange("accountNumber", e.target.value)}
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code *</Label>
            <Input
              id="ifscCode"
              required
              value={bankDetails.ifscCode}
              onChange={(e) => handleBankChange("ifscCode", e.target.value.toUpperCase())}
              placeholder="ABCD0123456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name *</Label>
            <Input
              id="bankName"
              required
              value={bankDetails.bankName}
              onChange={(e) => handleBankChange("bankName", e.target.value)}
              placeholder="State Bank of India"
            />
          </div>
        </div>

        <FileUploadField
          label="Bank Proof (Cancelled Cheque / Passbook) *"
          file={documents.bankProof}
          onChange={(file) => handleFileChange("bankProof", file)}
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button type="submit" size="lg" className="min-w-32" disabled={!allDocumentsUploaded}>
          Next
        </Button>
      </div>
    </form>
  )
}

function FileUploadField({
  label,
  file,
  onChange,
  accept = "image/*,.pdf",
}: {
  label: string
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="cursor-pointer"
        />
        {file && (
          <p className="mt-1 text-sm text-green-600">
            ✓ {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        )}
      </div>
    </div>
  )
}
