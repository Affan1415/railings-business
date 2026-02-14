"use client";
import { motion } from "framer-motion";
import { Award, Users, Calendar, ShieldCheck } from "lucide-react";
import { company } from "@/data/company";

export function StatsSection() {
  const stats = [
    { icon: <Calendar className="h-8 w-8" />, value: company.stats[0].value, label: company.stats[0].label },
    { icon: <Users className="h-8 w-8" />, value: company.stats[1].value, label: company.stats[1].label },
    { icon: <Award className="h-8 w-8" />, value: company.stats[2].value, label: company.stats[2].label },
    { icon: <ShieldCheck className="h-8 w-8" />, value: company.stats[3].value, label: company.stats[3].label },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} /></div>
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
