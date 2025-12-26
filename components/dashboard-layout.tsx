"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  Wrench,
  Calendar,
  Star,
  User,
  Bell,
  Menu,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

/* ================= NAV ================= */

const navigation = [
  { name: "Dashboard", href: "/providerdashboard", icon: LayoutDashboard },
  { name: "My Jobs", href: "/jobs", icon: Briefcase },
  { name: "Earnings", href: "/earnings", icon: DollarSign },
  { name: "My Services", href: "/services", icon: Wrench },
  { name: "Availability", href: "/availability", icon: Calendar },
  { name: "Reviews & Ratings", href: "/reviews", icon: Star },
  { name: "Profile Settings", href: "/profile", icon: User },
]

/* ================= FAKE NOTIFICATIONS ================= */

const notifications = [
  {
    id: 1,
    title: "New Job Assigned",
    message: "AC repair job scheduled for today at 3:00 PM",
    time: "2 min ago",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "₹1,850 credited to your account",
    time: "1 hour ago",
    icon: CheckCircle2,
  },
  {
    id: 3,
    title: "Profile Verified",
    message: "Your documents have been successfully verified",
    time: "Yesterday",
    icon: AlertCircle,
  },
]

/* ================= LAYOUT ================= */

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [openAllNotif, setOpenAllNotif] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a1a33] text-white">

      {/* ================= TOP BAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0f172a] border-b border-[#1e293b]">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold">
              N
            </div>
            <span className="text-xl font-bold text-blue-500">
              Nexsin
            </span>
          </div>

          {/* CENTER NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition",
                    isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-gray-300 hover:bg-blue-500/10 hover:text-blue-400",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* RIGHT */}
          <div className="relative flex items-center gap-2">

            {/* MOBILE MENU */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>

            {/* 🔔 NOTIFICATION */}
            <Button
              size="icon"
              variant="ghost"
              className="relative"
              onClick={() => setNotifOpen((p) => !p)}
            >
              <Bell />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500" />
            </Button>

            {/* 🔔 SMALL DROPDOWN */}
            {notifOpen && (
              <div className="absolute right-0 top-14 w-80 rounded-xl bg-[#0f172a] border border-[#1e293b] shadow-xl z-50">
                <div className="px-4 py-3 border-b border-[#1e293b] font-semibold">
                  Notifications
                </div>

                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 border-b border-[#1e293b] hover:bg-blue-500/10"
                  >
                    <n.icon className="h-5 w-5 text-blue-400 mt-1" />
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-gray-400">{n.message}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}

                <button
                  className="w-full px-4 py-3 text-sm text-blue-400 hover:bg-blue-500/10"
                  onClick={() => {
                    setNotifOpen(false)
                    setOpenAllNotif(true)
                  }}
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0f172a] border-t border-[#1e293b]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-3 text-sm text-gray-300 hover:bg-blue-500/10"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="pt-16">
        <div className="h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* ================= BIG CENTER NOTIFICATION ================= */}
      <Dialog open={openAllNotif} onOpenChange={setOpenAllNotif}>
        <DialogContent className="max-w-xl bg-[#0f172a] border border-[#1e293b] text-white">
          <DialogHeader>
            <DialogTitle>All Notifications</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="border border-[#1e293b] rounded-lg p-4"
              >
                <div className="flex gap-3">
                  <n.icon className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-gray-400">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
