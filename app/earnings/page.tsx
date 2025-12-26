"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/* ---------------- DATA ---------------- */
const weeklyData = [
  { day: "Mon", earnings: 320 },
  { day: "Tue", earnings: 450 },
  { day: "Wed", earnings: 280 },
  { day: "Thu", earnings: 510 },
  { day: "Fri", earnings: 380 },
  { day: "Sat", earnings: 620 },
  { day: "Sun", earnings: 290 },
]

const monthlyData = [
  { month: "Jul", earnings: 4200 },
  { month: "Aug", earnings: 5100 },
  { month: "Sep", earnings: 4800 },
  { month: "Oct", earnings: 6200 },
  { month: "Nov", earnings: 5800 },
  { month: "Dec", earnings: 6840 },
]

const recentPayouts = [
  { id: 1, date: "Dec 15, 2024", amount: "$1,850", status: "Completed", jobs: 12 },
  { id: 2, date: "Dec 8, 2024", amount: "$2,120", status: "Completed", jobs: 15 },
  { id: 3, date: "Dec 1, 2024", amount: "$1,640", status: "Completed", jobs: 11 },
]

/* ---------------- PAGE ---------------- */
export default function EarningsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 bg-[#0a1a33] text-white">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">
              Earnings
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Track your income, trends and payout history
            </p>
          </div>

          <Button
            variant="outline"
            className="
              border-[#1E293B]
              text-black
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Total Earnings",
              value: "$32,910",
              icon: DollarSign,
              footer: "+18% from last month",
              footerColor: "text-green-400",
            },
            {
              title: "This Month",
              value: "$6,840",
              icon: Calendar,
              footer: "45 jobs completed",
              footerColor: "text-[#9CA3AF]",
            },
            {
              title: "Average per Job",
              value: "$152",
              icon: TrendingUp,
              footer: "Based on last 30 days",
              footerColor: "text-[#9CA3AF]",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="bg-[#0F172A] border border-[#1E293B]"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-[#9CA3AF]">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {item.value}
                </div>
                <p className={`text-xs mt-2 ${item.footerColor}`}>
                  {item.footer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* WEEKLY */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white">
                Weekly Earnings
              </CardTitle>
              <p className="text-sm text-[#9CA3AF]">
                Last 7 days performance
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  earnings: { label: "Earnings", color: "#3B82F6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid stroke="#1E293B" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="earnings"
                      fill="#3B82F6"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* MONTHLY */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white">
                Monthly Earnings Trend
              </CardTitle>
              <p className="text-sm text-[#9CA3AF]">
                Last 6 months overview
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  earnings: { label: "Earnings", color: "#3B82F6" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid stroke="#1E293B" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* RECENT PAYOUTS */}
        <Card className="bg-[#0F172A] border border-[#1E293B]">
          <CardHeader>
            <CardTitle className="text-white">
              Recent Payouts
            </CardTitle>
            <p className="text-sm text-[#9CA3AF]">
              Your latest payment history
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPayouts.map((payout) => (
              <div
                key={payout.id}
                className="
                  flex items-center justify-between
                  rounded-lg border border-[#1E293B]
                  p-4
                "
              >
                <div>
                  <p className="font-medium text-white">
                    {payout.date}
                  </p>
                  <p className="text-sm text-[#9CA3AF]">
                    {payout.jobs} jobs completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">
                    {payout.amount}
                  </p>
                  <Badge className="mt-1 bg-green-500/10 text-green-400">
                    {payout.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
