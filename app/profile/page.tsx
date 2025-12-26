"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Shield,
  CheckCircle2,
} from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@fixmate.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    bio: "Experienced technician with 8+ years in AC repair, plumbing, and electrical services. Committed to providing high-quality, reliable service.",
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 text-[#E5E7EB]">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Manage your personal information and account security
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Profile Photo */}
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle className="text-white">Profile Photo</CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Update your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500"
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#1E293B] text-black hover:bg-[#1E293B]"
                >
                  Upload New Photo
                </Button>
              </CardContent>
            </Card>

            {/* Verification */}
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Verification
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Your account verification status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Identity Verified", "Background Check", "License Valid"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg border border-[#1E293B] p-3"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-[#E5E7EB]">{item}</span>
                      </div>
                      <Badge className="bg-green-500/10 text-green-400">
                        Verified
                      </Badge>
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Info */}
            <Card className="bg-[#0F172A] border border-[#1E293B]">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Update your basic profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[#9CA3AF] flex items-center gap-2">
                      <User className="h-4 w-4" /> Full Name
                    </Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-[#020617] border-[#1E293B] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#9CA3AF] flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-[#020617] border-[#1E293B] text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#9CA3AF] flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-[#020617] border-[#1E293B] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#9CA3AF] flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Address
                  </Label>
                  <Input
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-[#020617] border-[#1E293B] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Professional Bio</Label>
                  <Textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="bg-[#020617] border-[#1E293B] text-white resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* ACTION BUTTONS (FIXED) */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="
                  border-[#1E293B]
                  text-[#E5E7EB]
                  bg-transparent
                  hover:bg-[#1E293B]
                  px-8
                "
              >
                Cancel
              </Button>

              <Button
                className="
                  bg-blue-600
                  text-white
                  hover:bg-blue-500
                  px-8
                "
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
