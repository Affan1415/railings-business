export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  priceRange: string;
  baseRate: { good: number; better: number; best: number };
  unit: string;
}

export const services: Service[] = [
  {
    slug: "roofing",
    title: "Roofing Installation & Replacement",
    shortTitle: "Roofing",
    description: "Complete roof replacement and installation services with premium materials and expert craftsmanship.",
    longDescription: "Protect your home with our professional roofing services. We offer complete roof replacement, new installations, and repairs using the highest quality materials.",
    icon: "home",
    image: "/images/roofing.jpg",
    features: ["Complete roof replacement", "New roof installation", "Emergency roof repairs", "Shingle, tile, and metal options", "Ventilation solutions", "Ice dam prevention"],
    benefits: ["Increase energy efficiency by up to 30%", "Boost home value significantly", "25-50 year warranty options", "Licensed and insured professionals", "Free detailed inspections"],
    priceRange: "$8,000 - $25,000",
    baseRate: { good: 4.50, better: 6.50, best: 9.00 },
    unit: "sq ft"
  },
  {
    slug: "windows",
    title: "Window Replacement",
    shortTitle: "Windows",
    description: "Energy-efficient window installation to modernize your home and reduce energy costs.",
    longDescription: "Transform your home with our premium window replacement services. Our energy-efficient windows reduce heating and cooling costs while giving your home a fresh, modern appearance.",
    icon: "square",
    image: "/images/windows.jpg",
    features: ["Double and triple-pane options", "Custom sizes and shapes", "Multiple frame materials", "Low-E glass coatings", "Sound reduction technology", "Easy-clean tilt-in sashes"],
    benefits: ["Reduce energy bills by up to 25%", "Enhance curb appeal instantly", "Minimize outside noise", "UV protection for interiors", "Lifetime warranty available"],
    priceRange: "$300 - $1,200 per window",
    baseRate: { good: 350, better: 550, best: 850 },
    unit: "window"
  },
  {
    slug: "siding",
    title: "Siding Installation",
    shortTitle: "Siding",
    description: "Premium vinyl and fiber cement siding to protect and beautify your home's exterior.",
    longDescription: "Give your home a stunning makeover with our professional siding installation services. We specialize in vinyl, fiber cement, and engineered wood siding.",
    icon: "layers",
    image: "/images/siding.jpg",
    features: ["Vinyl siding installation", "Fiber cement options", "Engineered wood siding", "Aluminum trim wrapping", "Insulated siding options", "Wide color selection"],
    benefits: ["Zero maintenance required", "50+ year lifespan", "Improved insulation value", "Weather and pest resistant", "Fade-resistant colors"],
    priceRange: "$6,000 - $20,000",
    baseRate: { good: 5.00, better: 7.50, best: 12.00 },
    unit: "sq ft"
  },
  {
    slug: "gutters",
    title: "Gutter Installation & Guards",
    shortTitle: "Gutters",
    description: "Seamless gutter installation and guard systems to protect your home from water damage.",
    longDescription: "Protect your home's foundation and landscaping with our professional gutter services. We install seamless aluminum gutters custom-fitted to your home.",
    icon: "droplets",
    image: "/images/gutters.jpg",
    features: ["Seamless aluminum gutters", "Gutter guard installation", "Downspout extensions", "Copper gutter options", "Custom color matching", "French drain connections"],
    benefits: ["Prevent foundation damage", "Eliminate gutter cleaning", "Custom seamless fit", "Multiple color options", "20+ year warranty"],
    priceRange: "$1,500 - $5,000",
    baseRate: { good: 8.00, better: 12.00, best: 18.00 },
    unit: "linear ft"
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};
