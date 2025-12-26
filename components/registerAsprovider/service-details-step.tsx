"use client"

import type React from "react"

import type { ServiceDetails, ServiceCategory } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ServiceDetailsStepProps {
  data: ServiceDetails
  onUpdate: (data: ServiceDetails) => void
  onNext: () => void
  onBack: () => void
}

const serviceCategories: { value: ServiceCategory; label: string }[] = [
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
  { value: "carpenter", label: "Carpenter" },
  { value: "painter", label: "Painter" },
  { value: "cleaner", label: "Cleaner" },
  { value: "appliance-repair", label: "Appliance Repair" },
  { value: "pest-control", label: "Pest Control" },
  { value: "other", label: "Other" },
]

export function ServiceDetailsStep({ data, onUpdate, onNext, onBack }: ServiceDetailsStepProps) {
  const [newArea, setNewArea] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleChange = (field: keyof ServiceDetails, value: any) => {
    onUpdate({ ...data, [field]: value })
  }

  const addServiceArea = () => {
    if (newArea.trim() && !data.serviceAreas.includes(newArea.trim())) {
      handleChange("serviceAreas", [...data.serviceAreas, newArea.trim()])
      setNewArea("")
    }
  }

  const removeServiceArea = (area: string) => {
    handleChange(
      "serviceAreas",
      data.serviceAreas.filter((a) => a !== area),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
        <p className="mt-1 text-sm text-gray-600">Tell us about your professional services</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Service Category *</Label>
          <select
            id="category"
            required
            value={data.category}
            onChange={(e) => handleChange("category", e.target.value as ServiceCategory)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {serviceCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            type="number"
            required
            min="0"
            value={data.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder="5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Service Description *</Label>
          <Textarea
            id="description"
            required
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe your services, specializations, and what makes you unique..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Service Areas *</Label>
          <div className="flex gap-2">
            <Input
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              placeholder="Enter area name"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addServiceArea())}
            />
            <Button type="button" onClick={addServiceArea} variant="outline">
              Add
            </Button>
          </div>
          {data.serviceAreas.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {data.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeServiceArea(area)}
                    className="ml-1 rounded-full hover:bg-indigo-200"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
          {data.serviceAreas.length === 0 && (
            <p className="text-sm text-red-600">Please add at least one service area</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button type="submit" size="lg" className="min-w-32" disabled={data.serviceAreas.length === 0}>
          Next
        </Button>
      </div>
    </form>
  )
}
