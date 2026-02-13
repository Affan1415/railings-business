"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Square, Layers, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { CTASection } from "@/components/marketing";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-8 w-8" />,
  square: <Square className="h-8 w-8" />,
  layers: <Layers className="h-8 w-8" />,
  droplets: <Droplets className="h-8 w-8" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,107,53,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,107,53,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-medium mb-4 block">
              OUR SERVICES
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Complete Home Improvement Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From roofing to gutters, we provide comprehensive exterior home
              improvement services with quality materials and expert
              installation.
            </p>
            <Button asChild size="lg" className="bg-gradient-primary">
              <Link href="/calculator">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {iconMap[service.icon]}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {service.longDescription}
                  </p>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Starting from
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {service.priceRange}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild variant="outline">
                        <Link href={`/services/${service.slug}`}>
                          Learn More
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        <Link href={`/calculator?service=${service.slug}`}>
                          Get Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl bg-card border border-border overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          {iconMap[service.icon]}
                        </div>
                        <p>{service.shortTitle} Service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
