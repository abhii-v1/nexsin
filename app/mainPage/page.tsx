/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardNav, { CardNavItem } from "@/components/CardNav";
import MapComponent from "./MapComponent";

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

export default function MainPage() {
  return (
    <div className="h-screen w-full relative">
      
      {/* 🎯 Google Map */}
      <MapComponent />

      {/* 🎯 Your Nav */}
      <CardNav
        items={items}
        baseColor="rgba(235, 222, 222, 0.05)"
        menuColor="#0e0c0cff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        showSearch={true}
        onSearch={(query) => console.log("Search:", query)}
      />
    </div>
  );
}
