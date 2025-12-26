import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, ThumbsUp } from "lucide-react"

/* ---------------- DATA ---------------- */
const reviews = [
  {
    id: 1,
    customer: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    date: "Dec 18, 2024",
    service: "AC Repair",
    comment:
      "Excellent service! John was very professional, arrived on time, and fixed the AC quickly. The unit is working perfectly now. Highly recommend!",
    helpful: 12,
  },
  {
    id: 2,
    customer: "Michael Chen",
    avatar: "MC",
    rating: 5,
    date: "Dec 17, 2024",
    service: "Electrical Wiring",
    comment:
      "Great work on the electrical wiring. Very knowledgeable and explained everything clearly. Will definitely call again for future electrical needs.",
    helpful: 8,
  },
  {
    id: 3,
    customer: "Emma Wilson",
    avatar: "EW",
    rating: 4,
    date: "Dec 15, 2024",
    service: "Plumbing",
    comment:
      "Good service overall. Fixed the leak efficiently. Only minor issue was arriving 15 minutes late, but the quality of work made up for it.",
    helpful: 5,
  },
  {
    id: 4,
    customer: "Robert Brown",
    avatar: "RB",
    rating: 5,
    date: "Dec 14, 2024",
    service: "Circuit Breaker Repair",
    comment:
      "Fantastic technician! Very friendly and professional. The circuit breaker issue was resolved quickly and he even gave me tips on maintenance.",
    helpful: 15,
  },
  {
    id: 5,
    customer: "Jennifer Lee",
    avatar: "JL",
    rating: 5,
    date: "Dec 12, 2024",
    service: "Faucet Replacement",
    comment:
      "Quick and efficient service. The new faucet looks great and works perfectly. Very satisfied with the work done.",
    helpful: 6,
  },
]

export default function ReviewsPage() {
  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1)

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length
  const helpfulVotes = reviews.reduce((acc, r) => acc + r.helpful, 0)

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Reviews & Ratings
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1">
            See what customers are saying about your services
          </p>
        </div>

        {/* ================= SUMMARY ================= */}
        <div className="grid gap-4 md:grid-cols-3">

          {/* Overall Rating */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                Overall Rating
              </CardTitle>
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-white">
                {averageRating}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(Number(averageRating))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-[#334155]"
                    }`}
                  />
                ))}
                <span className="text-xs text-[#9CA3AF] ml-2">
                  ({reviews.length} reviews)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 5 Star */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                5-Star Reviews
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-white">
                {Math.round((fiveStarCount / reviews.length) * 100)}%
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                {fiveStarCount} out of {reviews.length} reviews
              </p>
            </CardContent>
          </Card>

          {/* Helpful */}
          <Card className="bg-[#0F172A] border border-[#1E293B]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-[#9CA3AF]">
                Helpful Votes
              </CardTitle>
              <ThumbsUp className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-white">
                {helpfulVotes}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                Total helpful votes received
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= REVIEWS LIST ================= */}
        <Card className="bg-[#0F172A] border border-[#1E293B]">
          <CardHeader>
            <CardTitle className="text-white">
              Customer Reviews
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-[#1E293B] bg-[#020617] p-6 space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium text-white">
                        {review.customer}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-[#334155]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#9CA3AF]">
                          • {review.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {review.service}
                  </Badge>
                </div>

                {/* Comment */}
                <p className="text-[#E5E7EB] leading-relaxed">
                  {review.comment}
                </p>

                {/* Helpful */}
                <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful} people found this helpful</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
