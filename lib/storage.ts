import type { ProviderApplication } from "@/types/provider"

const STORAGE_KEY = "provider_applications"
const CURRENT_APPLICATION_KEY = "current_application"

export function saveApplication(application: ProviderApplication) {
  const applications = getApplications()
  const existingIndex = applications.findIndex((app) => app.id === application.id)

  if (existingIndex >= 0) {
    applications[existingIndex] = application
  } else {
    applications.push(application)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
}

export function getApplications(): ProviderApplication[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function getApplicationById(id: string): ProviderApplication | null {
  const applications = getApplications()
  return applications.find((app) => app.id === id) || null
}

export function updateApplicationStatus(id: string, status: ProviderApplication["status"], reviewNotes?: string) {
  const applications = getApplications()
  const application = applications.find((app) => app.id === id)

  if (application) {
    application.status = status
    application.reviewedAt = new Date()
    if (reviewNotes) {
      application.reviewNotes = reviewNotes
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }
}

export function saveCurrentApplication(data: any) {
  localStorage.setItem(CURRENT_APPLICATION_KEY, JSON.stringify(data))
}

export function getCurrentApplication() {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(CURRENT_APPLICATION_KEY)
  return data ? JSON.parse(data) : null
}

export function clearCurrentApplication() {
  localStorage.removeItem(CURRENT_APPLICATION_KEY)
}
