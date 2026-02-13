import { services } from "@/data/services";

export type ServiceType = "roofing" | "windows" | "siding" | "gutters";
export type MaterialTier = "good" | "better" | "best";
export type PropertyType = "residential" | "commercial";

export interface CalculatorInput {
  service: ServiceType;
  propertyType: PropertyType;
  squareFootage: number;
  stories: number;
  materialTier: MaterialTier;
  currentCondition: "good" | "fair" | "poor";
  needsRemoval: boolean;
  addons: string[];
}

export interface QuoteBreakdown {
  basePrice: number;
  materialCost: number;
  laborCost: number;
  removalCost: number;
  storyAdjustment: number;
  conditionAdjustment: number;
  addonsCost: number;
  subtotal: number;
  lowEstimate: number;
  highEstimate: number;
}

export interface QuoteResult {
  service: ServiceType;
  materialTier: MaterialTier;
  breakdown: QuoteBreakdown;
  unit: string;
  quantity: number;
}

// Add-on pricing for each service
export const addons: Record<ServiceType, { id: string; name: string; price: number }[]> = {
  roofing: [
    { id: "ventilation", name: "Ridge Ventilation", price: 800 },
    { id: "skylights", name: "Skylight Installation", price: 1500 },
    { id: "gutters", name: "New Gutters", price: 1200 },
    { id: "insulation", name: "Attic Insulation", price: 1000 },
    { id: "ice_dam", name: "Ice Dam Protection", price: 600 },
  ],
  windows: [
    { id: "triple_pane", name: "Triple Pane Upgrade", price: 150 },
    { id: "low_e", name: "Low-E Coating", price: 75 },
    { id: "argon", name: "Argon Gas Fill", price: 50 },
    { id: "grids", name: "Decorative Grids", price: 60 },
    { id: "trim", name: "Interior Trim", price: 100 },
  ],
  siding: [
    { id: "insulation", name: "Insulated Backing", price: 1.50 },
    { id: "trim_wrap", name: "Aluminum Trim Wrap", price: 800 },
    { id: "soffit", name: "Soffit & Fascia", price: 1200 },
    { id: "house_wrap", name: "House Wrap", price: 500 },
    { id: "shutters", name: "Decorative Shutters", price: 400 },
  ],
  gutters: [
    { id: "guards", name: "Gutter Guards", price: 5.00 },
    { id: "downspout_ext", name: "Downspout Extensions", price: 200 },
    { id: "rain_barrel", name: "Rain Barrel System", price: 350 },
    { id: "heat_cable", name: "Heat Cable System", price: 600 },
    { id: "splash_blocks", name: "Splash Blocks", price: 100 },
  ],
};

// Story multipliers
const storyMultipliers: Record<number, number> = {
  1: 1.0,
  2: 1.15,
  3: 1.30,
  4: 1.50,
};

// Condition adjustments
const conditionMultipliers: Record<string, number> = {
  good: 1.0,
  fair: 1.10,
  poor: 1.25,
};

export function calculateQuote(input: CalculatorInput): QuoteResult {
  const service = services.find((s) => s.slug === input.service);
  if (!service) {
    throw new Error(`Service not found: ${input.service}`);
  }

  const baseRate = service.baseRate[input.materialTier];
  const storyMultiplier = storyMultipliers[input.stories] || 1.3;
  const conditionMultiplier = conditionMultipliers[input.currentCondition];

  // Calculate base price
  let quantity = input.squareFootage;
  let unit = service.unit;

  // For windows, assume 1 window per 80 sq ft of living space (rough estimate)
  if (input.service === "windows") {
    quantity = Math.ceil(input.squareFootage / 80);
    unit = "windows";
  }

  // For gutters, estimate linear feet (roughly perimeter based on sq footage)
  if (input.service === "gutters") {
    // Rough estimate: perimeter = sqrt(sqft) * 4
    quantity = Math.ceil(Math.sqrt(input.squareFootage) * 4);
    unit = "linear ft";
  }

  const basePrice = quantity * baseRate;

  // Material cost (roughly 40% of base)
  const materialCost = basePrice * 0.4;

  // Labor cost (roughly 60% of base)
  const laborCost = basePrice * 0.6;

  // Removal cost if needed
  const removalCost = input.needsRemoval ? quantity * 1.5 : 0;

  // Story adjustment
  const storyAdjustment = basePrice * (storyMultiplier - 1);

  // Condition adjustment
  const conditionAdjustment = basePrice * (conditionMultiplier - 1);

  // Calculate addons cost
  const serviceAddons = addons[input.service];
  let addonsCost = 0;
  input.addons.forEach((addonId) => {
    const addon = serviceAddons.find((a) => a.id === addonId);
    if (addon) {
      // Some addons are per-unit, some are flat
      if (addon.price < 10) {
        // Per-unit addons (like gutter guards per linear ft)
        addonsCost += addon.price * quantity;
      } else {
        addonsCost += addon.price;
      }
    }
  });

  // Subtotal
  const subtotal =
    basePrice +
    removalCost +
    storyAdjustment +
    conditionAdjustment +
    addonsCost;

  // Estimates with variance
  const lowEstimate = Math.round(subtotal * 0.85);
  const highEstimate = Math.round(subtotal * 1.15);

  return {
    service: input.service,
    materialTier: input.materialTier,
    unit,
    quantity: Math.round(quantity),
    breakdown: {
      basePrice: Math.round(basePrice),
      materialCost: Math.round(materialCost),
      laborCost: Math.round(laborCost),
      removalCost: Math.round(removalCost),
      storyAdjustment: Math.round(storyAdjustment),
      conditionAdjustment: Math.round(conditionAdjustment),
      addonsCost: Math.round(addonsCost),
      subtotal: Math.round(subtotal),
      lowEstimate,
      highEstimate,
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
