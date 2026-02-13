"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { CTASection } from "@/components/marketing";

// Sample project data
const projects = [
  {
    id: 1,
    title: "Complete Roof Replacement",
    service: "roofing",
    location: "Springfield, MA",
    description: "Full roof replacement with architectural shingles",
  },
  {
    id: 2,
    title: "Window Upgrade Package",
    service: "windows",
    location: "Hartford, CT",
    description: "12 energy-efficient window replacements",
  },
  {
    id: 3,
    title: "Vinyl Siding Installation",
    service: "siding",
    location: "Westfield, MA",
    description: "Complete exterior siding renovation",
  },
  {
    id: 4,
    title: "Gutter System Overhaul",
    service: "gutters",
    location: "Enfield, CT",
    description: "Seamless gutters with gutter guards",
  },
  {
    id: 5,
    title: "Storm Damage Repair",
    service: "roofing",
    location: "Agawam, MA",
    description: "Emergency roof repair and replacement",
  },
  {
    id: 6,
    title: "Historic Home Windows",
    service: "windows",
    location: "Springfield, MA",
    description: "Custom window installation for historic property",
  },
  {
    id: 7,
    title: "Fiber Cement Siding",
    service: "siding",
    location: "Windsor, CT",
    description: "Premium James Hardie siding installation",
  },
  {
    id: 8,
    title: "Copper Gutter Installation",
    service: "gutters",
    location: "Holyoke, MA",
    description: "High-end copper gutter system",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.service === filter);

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
              OUR WORK
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Project Gallery
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our portfolio of completed projects. Each one represents
              our commitment to quality and customer satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-gradient-primary" : ""}
            >
              All Projects
            </Button>
            {services.map((service) => (
              <Button
                key={service.slug}
                variant={filter === service.slug ? "default" : "outline"}
                onClick={() => setFilter(service.slug)}
                className={filter === service.slug ? "bg-gradient-primary" : ""}
              >
                {service.shortTitle}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      Project Photo
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      asChild
                      variant="secondary"
                      size="sm"
                    >
                      <Link href={`/calculator?service=${project.service}`}>
                        Get Similar Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs text-primary font-medium uppercase">
                    {services.find((s) => s.slug === project.service)?.shortTitle}
                  </span>
                  <h3 className="font-semibold text-foreground mt-1 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
