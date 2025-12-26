export type ServiceCategory =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "painter"
  | "cleaner"
  | "appliance-repair"
  | "pest-control"
  | "other"

export type ApplicationStatus = "pending" | "approved" | "rejected" | "under-review"

export interface PersonalDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export interface ServiceDetails {
  category: ServiceCategory
  experience: string
  serviceAreas: string[]
  description: string
}

export interface Documents {
  aadhaarFront: File | null
  aadhaarBack: File | null
  panCard: File | null
  bankProof: File | null
  profilePhoto: File | null
}

export interface BankDetails {
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  bankName: string
}

export interface ProviderApplication {
  id: string
  personalDetails: PersonalDetails
  serviceDetails: ServiceDetails
  documents: {
    aadhaarFront: string
    aadhaarBack: string
    panCard: string
    bankProof: string
    profilePhoto: string
  }
  bankDetails: BankDetails
  status: ApplicationStatus
  submittedAt: Date
  reviewedAt?: Date
  reviewNotes?: string
}
