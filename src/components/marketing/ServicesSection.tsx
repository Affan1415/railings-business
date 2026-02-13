"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Square, Layers, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-6 w-6" />,
  square: <Square className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  droplets: <Droplets className="h-6 w-6" />,
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-orange-500 font-medium mb-4 block">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Complete Home Improvement Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From roofing to gutters, we provide comprehensive exterior home improvement services with quality materials and expert installation.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-orange-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 lg:p-8">
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">{iconMap[service.icon]}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.shortTitle}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">{service.features.slice(0, 3).map((feature, i) => (<li key={i} className="flex items-center text-sm text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2" />{feature}</li>))}</ul>
                <div className="mb-6 pb-6 border-b border-border"><p className="text-sm text-muted-foreground">Starting from</p><p className="text-2xl font-bold text-orange-500">{service.priceRange}</p></div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1"><Link href={`/services/${service.slug}`}>Learn More</Link></Button>
                  <Button asChild className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"><Link href={`/calculator?service=${service.slug}`}>Get Quote<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
