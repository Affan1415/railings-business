"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Square, Layers, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-6 w-6" />,
  square: <Square className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  droplets: <Droplets className="h-6 w-6" />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-6 lg:p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
          {iconMap[service.icon]}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {service.shortTitle}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Price Range */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="text-2xl font-bold text-primary">{service.priceRange}</p>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/services/${service.slug}`}>
              Learn More
            </Link>
          </Button>
          <Button asChild className="flex-1 bg-gradient-primary hover:opacity-90">
            <Link href={`/calculator?service=${service.slug}`}>
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
