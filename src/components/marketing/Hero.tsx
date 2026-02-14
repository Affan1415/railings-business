"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Play, Shield, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(255,107,53,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.1) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-6">
              <Award className="h-4 w-4" /><span className="text-sm font-medium">15+ Years of Excellence</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">Transform Your Home with <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Expert Craftsmanship</span></h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">Premium roofing, windows, siding, and gutter services. Trusted by thousands of homeowners across Massachusetts and Connecticut.</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-lg px-8 shadow-lg shadow-orange-500/25">
                <Link href="/calculator">Get Instant Quote<ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href={`tel:${company.phone}`}><Phone className="mr-2 h-5 w-5" />Call Now</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Licensed & Insured</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">98% Satisfaction</span></div>
              <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Free Estimates</span></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-orange-500/30 transition-colors">
                    <Play className="h-8 w-8 text-orange-500 ml-1" />
                  </div>
                  <p className="text-muted-foreground">Watch Our Work in Action</p>
                </div>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-md border border-border rounded-xl p-4">
              <div className="text-3xl font-bold text-orange-500">2,500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="absolute -top-6 -right-6 bg-card/80 backdrop-blur-md border border-border rounded-xl p-4">
              <div className="flex items-center gap-1 mb-1">{[...Array(5)].map((_, i) => (<svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}</div>
              <div className="text-sm text-muted-foreground">500+ 5-Star Reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
