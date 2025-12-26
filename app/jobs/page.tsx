"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  PlayCircle,
} from "lucide-react"

/* ---------------- DATA ---------------- */
const newRequests = [
  {
    id: 1,
    customer: "Sarah Johnson",
    service: "AC Repair",
    address: "123 Main St, Apt 4B",
    date: "Dec 20, 2024",
    time: "9:00 AM",
    price: "$85",
  },
  {
    id: 2,
    customer: "Michael Chen",
    service: "Electrical Wiring",
    address: "789 Pine Road, Unit 12",
    date: "Dec 20, 2024",
    time: "1:00 PM",
    price: "$120",
  },
]

const ongoingJobs = [
  {
    id: 3,
    customer: "David Martinez",
    service: "Water Heater Installation",
    address: "321 Oak Avenue",
    date: "Dec 19, 2024",
    time: "2:00 PM",
    status: "In Progress",
  },
]

const completedJobs = [
  {
    id: 4,
    customer: "Robert Brown",
    service: "Circuit Breaker Repair",
    address: "987 Cedar Lane",
    date: "Dec 18, 2024",
    earnings: "$95",
  },
]

/* ---------------- PAGE ---------------- */
export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("new")

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-white">
            My Jobs
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            Manage requests, track progress and completed work
          </p>
        </div>

        {/* ================= TABS ================= */}
        <Tabs defaultValue="new" onValueChange={setActiveTab}>
          <TabsList className="bg-[#0F172A] border border-[#1E293B]">

            <TabsTrigger
              value="new"
              className="
                text-white
                data-[state=active]:bg-[#1E293B]
                data-[state=active]:text-white
              "
            >
              New Requests
              <Badge className="ml-2 bg-[#3B82F6] text-white">
                {newRequests.length}
              </Badge>
            </TabsTrigger>

            <TabsTrigger
              value="ongoing"
              className="
                text-white
                data-[state=active]:bg-[#1E293B]
                data-[state=active]:text-white
              "
            >
              Ongoing
            </TabsTrigger>

            <TabsTrigger
              value="completed"
              className="
                text-white
                data-[state=active]:bg-[#1E293B]
                data-[state=active]:text-white
              "
            >
              Completed
            </TabsTrigger>

          </TabsList>

          {/* ================= NEW REQUESTS ================= */}
          <TabsContent value="new" className="space-y-4 mt-6">
            {newRequests.map((job) => (
              <Card
                key={job.id}
                className="bg-[#0F172A] border border-[#1E293B]"
              >
                <CardContent className="p-6 flex justify-between gap-6">

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">
                      {job.service}
                    </h3>

                    <p className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <User className="h-4 w-4" />
                      {job.customer}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <MapPin className="h-4 w-4" />
                      {job.address}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Clock className="h-4 w-4" />
                      {job.date} · {job.time}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Badge className="bg-[#3B82F6] text-white">
                      {job.price}
                    </Badge>

                    <Button className="bg-[#22C55E] text-white hover:bg-[#16A34A]">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      className="border-[#1E293B] text-[#9CA3AF] hover:text-white"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= ONGOING ================= */}
          <TabsContent value="ongoing" className="space-y-4 mt-6">
            {ongoingJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-[#0F172A] border border-[#1E293B]"
              >
                <CardContent className="p-6 flex justify-between">

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">
                      {job.service}
                    </h3>
                    <p className="text-sm text-[#9CA3AF]">{job.customer}</p>
                    <p className="text-sm text-[#9CA3AF]">{job.address}</p>
                    <p className="text-sm text-[#9CA3AF]">
                      {job.date} · {job.time}
                    </p>
                  </div>

                  <Button className="bg-[#22C55E] text-white hover:bg-[#16A34A]">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete Job
                  </Button>

                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= COMPLETED ================= */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedJobs.map((job) => (
              <Card
                key={job.id}
                className="bg-[#0F172A] border border-[#1E293B]"
              >
                <CardContent className="p-6 flex justify-between">

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">
                      {job.service}
                    </h3>
                    <p className="text-sm text-[#9CA3AF]">{job.customer}</p>
                    <p className="text-sm text-[#9CA3AF]">{job.address}</p>
                    <p className="text-sm text-[#9CA3AF]">{job.date}</p>
                  </div>

                  <Badge className="bg-[#22C55E] text-white">
                    {job.earnings}
                  </Badge>

                </CardContent>
              </Card>
            ))}
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  )
}
