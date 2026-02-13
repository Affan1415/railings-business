"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Complete Home Improvement Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From roofing to gutters, we provide comprehensive exterior home
            improvement services with quality materials and expert installation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
