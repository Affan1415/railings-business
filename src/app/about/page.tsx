"use client";

import { motion } from "framer-motion";
import { Award, Users, Calendar, ShieldCheck, Target, Heart } from "lucide-react";
import { company } from "@/data/company";
import { CTASection } from "@/components/marketing";

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Quality First",
    description:
      "We never compromise on quality. Every project uses premium materials and expert craftsmanship.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We listen, communicate, and deliver beyond expectations.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Integrity",
    description:
      "Honest pricing, transparent communication, and standing behind our work with comprehensive warranties.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description:
      "We're proud to serve our local community and treat every home like it's our own.",
  },
];

const team = [
  {
    name: "John Mitchell",
    role: "Founder & CEO",
    bio: "25+ years of experience in home improvement",
  },
  {
    name: "Sarah Thompson",
    role: "Operations Manager",
    bio: "Ensures every project runs smoothly",
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Estimator",
    bio: "Expert in accurate, fair pricing",
  },
  {
    name: "Emily Chen",
    role: "Customer Relations",
    bio: "Dedicated to your satisfaction",
  },
];

export default function AboutPage() {
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
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Building Trust, One Home at a Time
            </h1>
            <p className="text-lg text-muted-foreground">
              For over {company.stats.yearsInBusiness} years, we&apos;ve been
              the trusted choice for homeowners across Massachusetts and
              Connecticut.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {company.name} was founded with a simple mission: to provide
                  homeowners with honest, quality home improvement services at
                  fair prices.
                </p>
                <p>
                  What started as a small roofing company has grown into a
                  full-service home improvement business, serving thousands of
                  families throughout Western Massachusetts and Northern
                  Connecticut.
                </p>
                <p>
                  Our success is built on a foundation of integrity, quality
                  workmanship, and genuine care for our customers. We treat
                  every home as if it were our own, and every customer like
                  family.
                </p>
                <p>
                  Today, we&apos;re proud to be one of the region&apos;s most
                  trusted home improvement companies, with a team of skilled
                  professionals dedicated to exceeding your expectations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  icon: <Calendar className="h-8 w-8" />,
                  value: `${company.stats.yearsInBusiness}+`,
                  label: "Years Experience",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  value: `${company.stats.projectsCompleted.toLocaleString()}+`,
                  label: "Projects Done",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  value: `${company.stats.satisfactionRate}%`,
                  label: "Satisfaction",
                },
                {
                  icon: <ShieldCheck className="h-8 w-8" />,
                  value: `${company.stats.warrantyYears}+`,
                  label: "Year Warranty",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium mb-4 block">
              OUR VALUES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do, from the first call to the
              final inspection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium mb-4 block">
              OUR TEAM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet the Experts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our experienced team is dedicated to delivering exceptional
              results on every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-lg font-semibold text-foreground mb-8">
              Certifications & Awards
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {company.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
