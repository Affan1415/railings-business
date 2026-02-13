"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Clock, Wallet, Users, Wrench } from "lucide-react";

const reasons = [
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Licensed & Insured", description: "Fully licensed contractors with comprehensive insurance coverage for your peace of mind." },
  { icon: <Award className="h-6 w-6" />, title: "Quality Materials", description: "We use only premium, manufacturer-certified materials with extended warranties." },
  { icon: <Clock className="h-6 w-6" />, title: "On-Time Completion", description: "We respect your time with efficient project management and reliable scheduling." },
  { icon: <Wallet className="h-6 w-6" />, title: "Competitive Pricing", description: "Transparent pricing with no hidden fees. Financing options available." },
  { icon: <Users className="h-6 w-6" />, title: "Expert Team", description: "Our skilled craftsmen have decades of combined experience in home improvement." },
  { icon: <Wrench className="h-6 w-6" />, title: "Comprehensive Service", description: "From initial consultation to final cleanup, we handle every detail." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <span className="text-orange-500 font-medium mb-4 block">WHY CHOOSE US</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Your Trusted Partner in <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Home Improvement</span></h2>
              <p className="text-lg text-muted-foreground mb-8">For over 15 years, we&apos;ve been the go-to choice for homeowners who want quality workmanship, honest pricing, and exceptional customer service.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="flex flex-wrap gap-3">
              {["GAF Master Elite", "EPA Certified", "BBB A+ Rating", "Angi Super Service"].map((cert) => (<span key={cert} className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium">{cert}</span>))}
            </motion.div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="p-6 rounded-xl bg-card border border-border hover:border-orange-500/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">{reason.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
