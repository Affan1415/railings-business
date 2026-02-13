import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-dark border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {company.name}
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {company.tagline}. Serving Western Massachusetts and Northern
              Connecticut for over {company.stats.yearsInBusiness} years.
            </p>
            <div className="flex space-x-4">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={company.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={company.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/calculator"
                  className="text-primary font-medium hover:underline"
                >
                  Get Instant Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <a
                    href={`tel:${company.phone}`}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {company.phone}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Call for free estimate
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {company.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state}{" "}
                  {company.address.zip}
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <p>Mon-Fri: {company.hours.weekdays}</p>
                  <p>Sat: {company.hours.saturday}</p>
                  <p>Sun: {company.hours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Service Areas
          </h3>
          <p className="text-sm text-muted-foreground">
            {company.serviceAreas.join(" | ")}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
