"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              {company.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center px-4 py-2 text-foreground/80 hover:text-primary transition-colors">
                    {link.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 bg-card rounded-lg shadow-xl border border-border p-2"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="block px-4 py-3 rounded-md hover:bg-muted transition-colors"
                          >
                            <div className="font-medium text-foreground">
                              {service.shortTitle}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {service.description.substring(0, 50)}...
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-border mt-2 pt-2">
                          <Link
                            href="/services"
                            className="block px-4 py-2 text-primary font-medium hover:underline"
                          >
                            View All Services
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              {company.phone}
            </a>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link href="/calculator">Get Free Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-card rounded-b-lg border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-muted rounded-md"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4"
                            >
                              {services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  className="block px-4 py-2 text-muted-foreground hover:text-primary"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {service.shortTitle}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-foreground hover:bg-muted rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4 space-y-3 border-t border-border">
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center text-foreground"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {company.phone}
                  </a>
                  <Button asChild className="w-full bg-gradient-primary">
                    <Link href="/calculator">Get Free Quote</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
