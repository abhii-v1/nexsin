"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wrench, Droplet, Zap, Wind, Plus, Edit2 } from "lucide-react"

/* ================= DATA ================= */
const initialServices = [
  {
    id: 1,
    name: "AC Repair & Maintenance",
    icon: Wind,
    price: 85,
    available: true,
    jobs: 34,
  },
  {
    id: 2,
    name: "Plumbing Services",
    icon: Droplet,
    price: 75,
    available: true,
    jobs: 48,
  },
  {
    id: 3,
    name: "Electrical Wiring",
    icon: Zap,
    price: 120,
    available: true,
    jobs: 28,
  },
  {
    id: 4,
    name: "General Repairs",
    icon: Wrench,
    price: 65,
    available: false,
    jobs: 22,
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices)
  const [editingService, setEditingService] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState("")

  const toggleAvailability = (id: number) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, available: !s.available } : s,
      ),
    )
  }

  const handleEditPrice = (id: number) => {
    const price = Number(editPrice)
    if (!isNaN(price) && price > 0) {
      setServices(
        services.map((s) => (s.id === id ? { ...s, price } : s)),
      )
      setEditingService(null)
      setEditPrice("")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              My Services
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Manage your services, pricing and availability
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0F172A] border border-[#1E293B] text-white">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription className="text-[#9CA3AF]">
                  Create a new service offering
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[#E5E7EB]">Service Name</Label>
                  <Input className="bg-[#020617] border-[#1E293B] text-white" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#E5E7EB]">Base Price</Label>
                  <Input
                    type="number"
                    className="bg-[#020617] border-[#1E293B] text-white"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-500">
                  Add Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                Total Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {services.length}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                {services.filter((s) => s.available).length} active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                Average Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                $
                {Math.round(
                  services.reduce((a, s) => a + s.price, 0) /
                    services.length,
                )}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                Per service
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                Total Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {services.reduce((a, s) => a + s.jobs, 0)}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                Across all services
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-[#0F172A] border border-[#1E293B]"
            >
              <CardContent className="p-6 space-y-5">

                {/* TITLE */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#9CA3AF]">
                      {service.jobs} jobs completed
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="flex items-center justify-between rounded-lg border border-[#1E293B] bg-[#020617] p-3">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Base Price</p>
                    <p className="text-2xl font-bold text-white">
                      ${service.price}
                    </p>
                  </div>

                  <Dialog
                    open={editingService === service.id}
                    onOpenChange={(o) => !o && setEditingService(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:bg-blue-500/10"
                        onClick={() => {
                          setEditingService(service.id)
                          setEditPrice(service.price.toString())
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0F172A] border border-[#1E293B] text-white">
                      <DialogHeader>
                        <DialogTitle>Edit Price</DialogTitle>
                        <DialogDescription className="text-[#9CA3AF]">
                          Update price for {service.name}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="bg-[#020617] border-[#1E293B] text-white"
                        />
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-500"
                          onClick={() =>
                            handleEditPrice(service.id)
                          }
                        >
                          Update Price
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* AVAILABILITY */}
                <div className="flex items-center justify-between rounded-lg border border-[#1E293B] p-3">
                  <div>
                    <p className="text-sm text-white">
                      Availability
                    </p>
                    <p className="text-xs text-[#9CA3AF]">
                      {service.available
                        ? "Accepting jobs"
                        : "Not available"}
                    </p>
                  </div>

                  <Switch
                    checked={service.available}
                    onCheckedChange={() =>
                      toggleAvailability(service.id)
                    }
                    className="
                      data-[state=checked]:bg-blue-600
                      data-[state=unchecked]:bg-[#020617]
                      border border-[#1E293B]
                      [&>span]:bg-white
                      [&>span]:shadow-md
                    "
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
