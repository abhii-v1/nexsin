import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Briefcase, CheckCircle2, TrendingUp } from "lucide-react"

export default function ServiceDashboardPage() {
  const stats = [
    {
      title: "Total Jobs Completed",
      value: "142",
      icon: CheckCircle2,
      change: "+12% this month",
    },
    {
      title: "Active Jobs",
      value: "8",
      icon: Briefcase,
      change: "2 scheduled today",
    },
    {
      title: "Today's Earnings",
      value: "$425",
      icon: DollarSign,
      change: "5 jobs completed",
    },
    {
      title: "Monthly Earnings",
      value: "$6,840",
      icon: TrendingUp,
      change: "+18% growth",
    },
  ]

  return (
    <DashboardLayout>
      {/* 🌌 LUXURY SaaS BACKGROUND */}
      <div
        className="
          min-h-full px-10 py-10 space-y-14
          text-white
          bg-[radial-gradient(1100px_circle_at_10%_-10%,#2563eb22,transparent_40%),radial-gradient(900px_circle_at_90%_10%,#1e40af22,transparent_45%),#050814]
        "
      >
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Performance overview
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="
                relative overflow-hidden
                rounded-2xl
                bg-[#0a0f25]/90
                backdrop-blur-xl
                border border-white/10
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:shadow-[0_24px_70px_-20px_rgba(37,99,235,0.45)]
              "
            >
              {/* soft light layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

              <CardContent className="relative p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {stat.title}
                  </p>
                  <stat.icon className="h-5 w-5 text-blue-400" />
                </div>

                <div className="text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </div>

                <p className="text-xs text-blue-300/80">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LOWER SECTION */}
        <div className="grid gap-12 lg:grid-cols-2">

          {/* TODAY'S SCHEDULE */}
          <Card
            className="
              relative overflow-hidden
              rounded-2xl
              bg-[#0a0f25]/90
              backdrop-blur-xl
              border border-white/10
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <CardContent className="relative p-6 space-y-6">
              <h2 className="text-sm font-semibold tracking-tight text-white">
                Today’s Schedule
              </h2>

              {[
                {
                  time: "9 AM",
                  service: "AC Repair",
                  customer: "Sarah Johnson",
                  location: "Main Street",
                },
                {
                  time: "2 PM",
                  service: "Plumbing Fix",
                  customer: "Mike Williams",
                  location: "Oak Avenue",
                },
              ].map((job, i) => (
                <div
                  key={i}
                  className="
                    flex items-start gap-4 p-4 rounded-xl
                    border border-white/5
                    transition-all
                    hover:border-blue-500/40
                    hover:bg-blue-500/5
                  "
                >
                  <div className="
                    min-w-[52px] h-12 rounded-lg
                    bg-blue-500/10
                    text-blue-400
                    flex items-center justify-center
                    text-sm font-semibold
                  ">
                    {job.time}
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-white">
                      {job.service}
                    </p>
                    <p className="text-xs text-gray-400">
                      {job.customer}
                    </p>
                    <p className="text-xs text-gray-500">
                      {job.location}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* REVIEWS */}
          <Card
            className="
              relative overflow-hidden
              rounded-2xl
              bg-[#0a0f25]/90
              backdrop-blur-xl
              border border-white/10
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <CardContent className="relative p-6 space-y-6">
              <h2 className="text-sm font-semibold tracking-tight text-white">
                Recent Reviews
              </h2>

              {[
                {
                  name: "Emily Davis",
                  comment: "Excellent service. Very professional.",
                  time: "2 hours ago",
                },
                {
                  name: "Robert Brown",
                  comment: "Quick and clean work. Recommended.",
                  time: "5 hours ago",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="
                    p-4 rounded-xl
                    border border-white/5
                    transition-all
                    hover:border-blue-500/40
                    hover:bg-blue-500/5
                  "
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      {review.name}
                    </p>
                    <span className="text-yellow-400 text-xs">
                      ★★★★★
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mt-1">
                    {review.comment}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {review.time}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="pt-6 text-center text-xs text-gray-500">
          Powered by <span className="text-blue-400 font-medium">Nexsin</span>
        </div>
      </div>
    </DashboardLayout>
  )
}
