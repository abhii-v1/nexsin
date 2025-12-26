"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Wrench,
  Laptop,
  Car,
  Droplets,
  Zap,
  Snowflake,
  Hammer,
  Paintbrush,
  Shield,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import CardNav, { CardNavItem } from "@/components/CardNav";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useRouter();

  const services = [
    {
      name: "Cooler Repair",
      icon: Snowflake,
      description: "AC & Cooler maintenance",
      color: "bg-[#E3F2FD] text-[#007BFF]",
    },
    {
      name: "Laptop Repair",
      icon: Laptop,
      description: "Computer & laptop fixes",
      color: "bg-[#F3E5F5] text-[#9C27B0]",
    },
    {
      name: "Car Mechanic",
      icon: Car,
      description: "Auto repair services",
      color: "bg-[#FFEBEE] text-[#F44336]",
    },
    {
      name: "Plumber",
      icon: Droplets,
      description: "Water & pipe solutions",
      color: "bg-[#E0F2F1] text-[#00BCD4]",
    },
    {
      name: "Electrician",
      icon: Zap,
      description: "Electrical installations",
      color: "bg-[#FFF8E1] text-[#FF9800]",
    },
    {
      name: "AC Service",
      icon: Snowflake,
      description: "Air conditioning repair",
      color: "bg-[#E8EAF6] text-[#3F51B5]",
    },
    {
      name: "Carpenter",
      icon: Hammer,
      description: "Wood work & furniture",
      color: "bg-[#FFF3E0] text-[#FF5722]",
    },
    {
      name: "Painter",
      icon: Paintbrush,
      description: "Interior & exterior painting",
      color: "bg-[#E8F5E8] text-[#4CAF50]",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are background checked",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get service within 2 hours of booking",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "100% satisfaction or money back guarantee",
    },
  ];
  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", href: "/about", ariaLabel: "About Company" },
        { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          href: "/features",
          ariaLabel: "Featured Projects",
        },
        {
          label: "Case Studies",
          href: "/Projects",
          ariaLabel: "Project Case Studies",
        },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", href: "/email", ariaLabel: "Email us" },
        { label: "Twitter", href: "/twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", href: "/linkedin", ariaLabel: "LinkedIn" },
      ],
    },
  ];

  function slugify(name: string) {
    return name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <CardNav
            items={items}
            baseColor="rgba(235, 222, 222, 0.05)"
            menuColor="#0e0c0cff"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            showSearch={true}
            onSearch={(query) => console.log("Search for:", query)}
            navButtons={[
              {
                label: "STARTED",
                href: "/login",
                bgColor: "#832386ff",
              },
            ]}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#1e40af] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#0F172A] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center space-x-2">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-[#007BFF]" />
                <span className="text-xl sm:text-5xl font-bold text-white">
                  Nexcyn
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Your Home Services,
                <span className="text-[#60a5fa]"> On-Demand</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#cbd5e1] mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Book trusted local professionals for all your repair and
                maintenance needs. From plumbing to electronics, we have got you
                covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <Input
                    placeholder="What service do you need?"
                    className="pl-9 sm:pl-10 h-11 sm:h-12 text-base sm:text-lg rounded-xl border-2 border-gray-200 focus:border-[#007BFF] bg-white"
                  />
                </div>

                <Button
                  size="lg"
                  className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-[#00C49A] hover:bg-[#00B894] text-sm sm:text-base"
                >
                  Find Services
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-[#cbd5e1]">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span>Verified Pros</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <span>Same Day Service</span>

                  <Badge className="mb-4 bg-[#E3F2FD] text-[#007BFF] hover:bg-[#E3F2FD] text-xs sm:text-sm">
                    Trusted by 10,000+ customers
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transform rotate-1 lg:rotate-2">
                <Image
                  src="/home-repair-technician.png"
                  alt="Professional technician"
                  width={800}
                  height={600}
                  className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-blue-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                {/* <div className="text-xl sm:text-2xl font-bold">2hrs</div> */}
                <div className="text-xs sm:text-sm opacity-90">
                  Quick Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-1 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-2xl mx-auto">
              Professional repair and maintenance services for your home and
              office needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3">
            {services.map((service, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white touch-manipulation"
                  role="link"
                  tabIndex={0}
                  onClick={() => router.push(`/login`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/login`);
                    }
                  }}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#343A40] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[#6C757D] text-sm">
                      {service.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="mt-3 sm:mt-4 text-[#00C49A] hover:text-[#00B894] text-sm"
                    >
                      <Link href={`/Homepage`}>Book Now →</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How FixMate Works
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1]">
              Simple steps to get your problems fixed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-[#007BFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                1. Choose Service
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Select the service you need from our wide range of options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E8F5E8] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[#00C49A]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                2. Book Appointment
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Schedule a convenient time and provide your location details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F3E5F5] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-[#9C27B0]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                3. Get It Fixed
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Our verified professional arrives and fixes your problem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">
                Why Choose FixMate?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E3F2FD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#007BFF]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#cbd5e1] text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <Image
                src="/happy-customer-repairman.png"
                alt="Happy customer"
                width={800}
                height={600}
                unoptimized
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                priority // optional: improves LCP for above-the-fold images
              />
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-green-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="text-xl sm:text-2xl font-bold">98%</div>
                <div className="text-xs sm:text-sm opacity-90">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-2xl mx-auto">
              Do npt just take our word for it - hear from thousands of
              satisfied customers
            </p>
            <div className="flex flex-wrap items-center justify-center mt-4 sm:mt-6 gap-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white ml-2 sm:ml-3">
                4.8
              </span>
              <span className="text-[#cbd5e1] text-sm sm:text-base">
                out of 5 (2,847 reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Testimonial Cards - keeping original content but with better mobile spacing */}
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                image: "/professional-woman-smiling.png",
                review:
                  "Amazing service! The plumber arrived exactly on time and fixed our kitchen sink issue in under an hour. Professional, clean, and reasonably priced.",
                service: "Plumbing Service",
                icon: Droplets,
                iconColor: "text-[#00BCD4]",
              },
              {
                name: "Mike Chen",
                role: "Business Owner",
                image: "/middle-aged-man-smiling.png",
                review:
                  "My laptop was completely dead, but the technician brought it back to life! Quick diagnosis, fair pricing, and excellent communication throughout.",
                service: "Laptop Repair",
                icon: Laptop,
                iconColor: "text-[#9C27B0]",
              },
              {
                name: "Emily Rodriguez",
                role: "Apartment Renter",
                image: "/young-professional-woman.png",
                review:
                  "The electrician was incredibly knowledgeable and solved our power outlet issues safely. I'll definitely use FixMate again for future repairs.",
                service: "Electrical Service",
                icon: Zap,
                iconColor: "text-[#FF9800]",
              },
              {
                name: "Robert Williams",
                role: "Retiree",
                image: "/older-man-glasses.png",
                review:
                  "Our AC broke down during a heatwave. FixMate got someone out the same day and had us cool again within 2 hours. Lifesavers!",
                service: "AC Repair",
                icon: Snowflake,
                iconColor: "text-[#3F51B5]",
              },
              {
                name: "Jessica Park",
                role: "Marketing Manager",
                image: "/young-professional-woman.png",
                review:
                  "The carpenter did an amazing job fixing our kitchen cabinets. Attention to detail was perfect and the pricing was very transparent.",
                service: "Carpentry",
                icon: Hammer,
                iconColor: "text-[#FF5722]",
              },
              {
                name: "David Kumar",
                role: "Software Engineer",
                image: "/business-man.png",
                review:
                  "Needed my car serviced urgently before a road trip. The mechanic was thorough, honest about what needed fixing, and got me back on the road safely.",
                service: "Auto Repair",
                icon: Car,
                iconColor: "text-[#F44336]",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <Image
                      src="/placeholder.svg"
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-[#343A40] text-sm sm:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#6C757D]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-2 sm:mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-[#6C757D] mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                    {testimonial.review}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm">
                    <testimonial.icon
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${testimonial.iconColor} mr-2`}
                    />
                    <span className="text-[#007BFF] font-medium">
                      {testimonial.service}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              {
                number: "10,000+",
                label: "Happy Customers",
                color: "text-[#00C49A]",
              },
              {
                number: "98%",
                label: "Satisfaction Rate",
                color: "text-[#007BFF]",
              },
              {
                number: "2,847",
                label: "5-Star Reviews",
                color: "text-[#FF9800]",
              },
              {
                number: "24/7",
                label: "Customer Support",
                color: "text-[#9C27B0]",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-xl p-4 sm:p-6 shadow-md"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-[#6C757D] text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Section - Simplified for mobile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1]">
              Help others by sharing your experience with FixMate services
            </p>
          </div>

          <Card className="bg-[#F5F9FF] border-0 shadow-xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form className="space-y-4 sm:space-y-6">
                {/* Simplified form for mobile - keeping key fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-sm font-medium text-[#343A40] mb-2"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="customerName"
                      placeholder="Enter your full name"
                      className="h-11 sm:h-12 border-2 border-gray-200 focus:border-[#007BFF] rounded-xl text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="customerEmail"
                      className="block text-sm font-medium text-[#343A40] mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      className="h-11 sm:h-12 border-2 border-gray-200 focus:border-[#007BFF] rounded-xl text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-[#343A40] mb-2"
                  >
                    Service Used *
                  </label>
                  <select
                    id="serviceType"
                    className="w-full h-11 sm:h-12 border-2 border-gray-200 focus:border-[#007BFF] rounded-xl px-4 bg-white text-sm sm:text-base"
                    required
                  >
                    <option value="">Select the service you used</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="ac-repair">AC Repair</option>
                    <option value="laptop-repair">Laptop Repair</option>
                    <option value="car-mechanic">Car Mechanic</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="cooler-repair">Cooler Repair</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#343A40] mb-3">
                    Overall Rating *
                  </label>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="group focus:outline-none touch-manipulation"
                        onClick={() => {
                          const stars =
                            document.querySelectorAll(".rating-star");
                          stars.forEach((star, index) => {
                            if (index < rating) {
                              star.classList.add(
                                "text-yellow-400",
                                "fill-current"
                              );
                              star.classList.remove("text-gray-300");
                            } else {
                              star.classList.remove(
                                "text-yellow-400",
                                "fill-current"
                              );
                              star.classList.add("text-gray-300");
                            }
                          });
                        }}
                      >
                        <Star className="rating-star h-7 w-7 sm:h-8 sm:w-8 text-gray-300 hover:text-yellow-400 transition-colors duration-200" />
                      </button>
                    ))}
                    <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-[#6C757D]">
                      Tap to rate
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reviewText"
                    className="block text-sm font-medium text-[#343A40] mb-2"
                  >
                    Your Review *
                  </label>
                  <textarea
                    id="reviewText"
                    rows={4}
                    placeholder="Tell us about your experience with our service. What went well? What could be improved?"
                    className="w-full border-2 border-gray-200 focus:border-[#007BFF] rounded-xl p-3 sm:p-4 resize-none text-sm sm:text-base"
                    required
                  ></textarea>
                  <p className="text-xs sm:text-sm text-[#6C757D] mt-2">
                    Minimum 50 characters
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-11 sm:h-12 px-6 sm:px-8 border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white rounded-xl bg-transparent text-sm sm:text-base"
                  >
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-11 sm:h-12 px-6 sm:px-8 border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white rounded-xl bg-transparent text-sm sm:text-base"
                  >
                    Preview
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Fix Your Problems?
          </h2>
          <p className="text-lg sm:text-xl text-[#E3F2FD] mb-6 sm:mb-8">
            Join thousands of satisfied customers who trust FixMate for their
            home service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Button
              // href="/services"
              size="lg"
              variant="secondary"
              className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-[#00C49A] hover:bg-[#00B894] text-white text-sm sm:text-base"
              onClick={() => {
                window.location.href = "#";
              }}
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-[#007BFF]" />
                <span className="text-xl sm:text-2xl font-bold">FixMate</span>
              </div>
              <p className="text-[#cbd5e1] mb-4 text-sm sm:text-base">
                Your trusted partner for all home repair and maintenance
                services.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Services
              </h3>
              <ul className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Plumbing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Electrical
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    AC Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Carpentry
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>+91 xxx </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>support@nexsyn.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-[#cbd5e1] text-sm sm:text-base">
            <p>&copy; 2024 FixMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
