"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter } from "lucide-react";

const categories = ["All", "Roofing", "Windows", "Siding", "Gutters"];

const projects = [
  {
    id: 1,
    title: "Complete Roof Replacement",
    category: "Roofing",
    description: "Full tear-off and installation of architectural shingles",
    location: "Springfield, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 2,
    title: "Energy-Efficient Windows",
    category: "Windows",
    description: "20 double-hung windows with Low-E glass",
    location: "Chicago, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 3,
    title: "Vinyl Siding Installation",
    category: "Siding",
    description: "Complete home exterior transformation",
    location: "Naperville, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 4,
    title: "Seamless Gutter System",
    category: "Gutters",
    description: "Aluminum gutters with leaf guards",
    location: "Aurora, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 5,
    title: "Metal Roof Installation",
    category: "Roofing",
    description: "Standing seam metal roof with 50-year warranty",
    location: "Rockford, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 6,
    title: "Bay Window Addition",
    category: "Windows",
    description: "Custom bay window with built-in seating",
    location: "Evanston, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 7,
    title: "Fiber Cement Siding",
    category: "Siding",
    description: "James Hardie fiber cement with custom trim",
    location: "Peoria, IL",
    image: "/api/placeholder/600/400",
  },
  {
    id: 8,
    title: "Copper Gutter Installation",
    category: "Gutters",
    description: "Premium copper gutters and downspouts",
    location: "Lake Forest, IL",
    image: "/api/placeholder/600/400",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our portfolio of completed home improvement projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <Filter className="h-5 w-5 text-muted-foreground my-auto mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full bg-card/50 border-border/50 overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-[4/3] relative bg-muted overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/20">
                          {project.category}
                        </span>
                      </div>
                      <Badge className="absolute top-4 left-4">
                        {project.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        📍 {project.location}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl p-8 md:p-12 text-center border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can transform your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
