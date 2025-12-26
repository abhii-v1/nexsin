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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Power } from "lucide-react"

/* ---------------- DATA ---------------- */
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const timeSlots = [
  { label: "Morning", value: "morning", time: "8:00 AM - 12:00 PM" },
  { label: "Afternoon", value: "afternoon", time: "12:00 PM - 5:00 PM" },
  { label: "Evening", value: "evening", time: "5:00 PM - 9:00 PM" },
]

export default function AvailabilityPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [vacationMode, setVacationMode] = useState(false)

  const [workingDays, setWorkingDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false,
  })

  const [workingHours, setWorkingHours] = useState<Record<string, boolean>>({
    morning: true,
    afternoon: true,
    evening: false,
  })

  const toggleDay = (day: string) =>
    setWorkingDays((p) => ({ ...p, [day]: !p[day] }))

  const toggleTimeSlot = (slot: string) =>
    setWorkingHours((p) => ({ ...p, [slot]: !p[slot] }))

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Availability
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Control when you are available to accept new jobs
          </p>
        </div>

        {/* ================= ONLINE / OFFLINE ================= */}
        <Card className="bg-[#0F172A] border border-[#1E293B]">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`h-14 w-14 rounded-full flex items-center justify-center
                ${
                  isOnline
                    ? "bg-blue-500/15 text-blue-400"
                    : "bg-[#020617] text-[#64748B]"
                }`}
              >
                <Power className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {isOnline ? "You're Online" : "You're Offline"}
                </h3>
                <p className="text-sm text-[#9CA3AF]">
                  {isOnline
                    ? "Accepting new job requests"
                    : "Not accepting job requests"}
                </p>
              </div>
            </div>

            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="
                scale-125
                data-[state=checked]:bg-blue-600
                data-[state=unchecked]:bg-[#020617]
                border border-[#1E293B]
                [&>span]:bg-white
              "
            />
          </CardContent>
        </Card>

        {/* ================= DAYS + HOURS ================= */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* -------- WORKING DAYS -------- */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-blue-400" />
                Working Days
              </CardTitle>
              <CardDescription className="text-[#9CA3AF]">
                Select days you are available
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#020617] p-4"
                >
                  <Label className="text-white">{day}</Label>
                  <Switch
                    checked={workingDays[day]}
                    onCheckedChange={() => toggleDay(day)}
                    className="
                      data-[state=checked]:bg-blue-600
                      data-[state=unchecked]:bg-[#020617]
                      border border-[#1E293B]
                      [&>span]:bg-white
                    "
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* -------- WORKING HOURS -------- */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-blue-400" />
                Working Hours
              </CardTitle>
              <CardDescription className="text-[#9CA3AF]">
                Choose preferred time slots
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.value}
                  className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#020617] p-4"
                >
                  <div>
                    <Label className="text-white">{slot.label}</Label>
                    <p className="text-sm text-[#9CA3AF] mt-1">
                      {slot.time}
                    </p>
                  </div>

                  <Switch
                    checked={workingHours[slot.value]}
                    onCheckedChange={() =>
                      toggleTimeSlot(slot.value)
                    }
                    className="
                      data-[state=checked]:bg-blue-600
                      data-[state=unchecked]:bg-[#020617]
                      border border-[#1E293B]
                      [&>span]:bg-white
                    "
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ================= VACATION MODE ================= */}
        <Card className="bg-[#0F172A] border border-[#1E293B]">
          <CardHeader>
            <CardTitle className="text-white">
              Vacation Mode
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              Temporarily pause all job requests
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#020617] p-4">
              <div>
                <p className="text-white font-medium">
                  Enable Vacation Mode
                </p>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  {vacationMode
                    ? "All job requests are paused"
                    : "You will stop receiving new requests"}
                </p>
              </div>

              <Switch
                checked={vacationMode}
                onCheckedChange={setVacationMode}
                className="
                  data-[state=checked]:bg-blue-600
                  data-[state=unchecked]:bg-[#020617]
                  border border-[#1E293B]
                  [&>span]:bg-white
                "
              />
            </div>
          </CardContent>
        </Card>

        {/* ================= SAVE ================= */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-500 px-10">
            Save Availability Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
