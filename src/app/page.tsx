"use client";

import { Hero } from "@/components/marketing/Hero";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { TestimonialSlider } from "@/components/marketing/TestimonialSlider";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}
