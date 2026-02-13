import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Home, Square, Layers, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, getServiceBySlug } from "@/data/services";
import { CTASection } from "@/components/marketing";
import type { Metadata } from "next";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="h-8 w-8" />,
  square: <Square className="h-8 w-8" />,
  layers: <Layers className="h-8 w-8" />,
  droplets: <Droplets className="h-8 w-8" />,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Major Home Improvements`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

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
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
              {iconMap[service.icon]}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              {service.longDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-primary glow-sm">
                <Link href={`/calculator?service=${service.slug}`}>
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  What We Offer
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Why Choose Our {service.shortTitle} Services
                </h2>
                <div className="space-y-4">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Our Process
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Free Consultation",
                      description:
                        "We start with a thorough inspection of your property and discuss your needs and budget.",
                    },
                    {
                      step: "2",
                      title: "Detailed Quote",
                      description:
                        "Receive a comprehensive, transparent quote with all costs clearly outlined.",
                    },
                    {
                      step: "3",
                      title: "Professional Installation",
                      description:
                        "Our certified team completes the work efficiently while maintaining the highest quality standards.",
                    },
                    {
                      step: "4",
                      title: "Final Inspection",
                      description:
                        "We conduct a thorough walkthrough to ensure your complete satisfaction.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Pricing
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Starting from
                  </p>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {service.priceRange}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Final price depends on project size, materials selected, and
                    specific requirements.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    <Link href={`/calculator?service=${service.slug}`}>
                      Calculate Your Price
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Contact Card */}
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our experts are ready to answer your questions.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>

                {/* Other Services */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Other Services
                  </h3>
                  <div className="space-y-2">
                    {services
                      .filter((s) => s.slug !== service.slug)
                      .map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <span className="font-medium text-foreground">
                            {s.shortTitle}
                          </span>
                          <span className="text-sm text-muted-foreground block">
                            {s.priceRange}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
