"use client"

import type React from "react"

import type { PersonalDetails } from "@/types/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PersonalDetailsStepProps {
  data: PersonalDetails
  onUpdate: (data: PersonalDetails) => void
  onNext: () => void
}

export function PersonalDetailsStep({ data, onUpdate, onNext }: PersonalDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>
        <p className="mt-1 text-sm text-gray-600">Please provide your accurate personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            required
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input
            id="pincode"
            required
            value={data.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            placeholder="110001"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            required
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Street address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            required
            value={data.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="New Delhi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            required
            value={data.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="Delhi"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-32">
          Next
        </Button>
      </div>
    </form>
  )
}
