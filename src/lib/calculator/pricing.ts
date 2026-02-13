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

export const addons: Record<ServiceType, { id: string; name: string; price: number }[]> = {
  roofing: [
    { id: "ventilation", name: "Ridge Ventilation", price: 800 },
    { id: "skylights", name: "Skylight Installation", price: 1500 },
    { id: "gutters", name: "New Gutters", price: 1200 },
    { id: "insulation", name: "Attic Insulation", price: 1000 },
  ],
  windows: [
    { id: "triple_pane", name: "Triple Pane Upgrade", price: 150 },
    { id: "low_e", name: "Low-E Coating", price: 75 },
    { id: "grids", name: "Decorative Grids", price: 60 },
  ],
  siding: [
    { id: "insulation", name: "Insulated Backing", price: 1.50 },
    { id: "trim_wrap", name: "Aluminum Trim Wrap", price: 800 },
    { id: "soffit", name: "Soffit & Fascia", price: 1200 },
  ],
  gutters: [
    { id: "guards", name: "Gutter Guards", price: 5.00 },
    { id: "downspout_ext", name: "Downspout Extensions", price: 200 },
    { id: "heat_cable", name: "Heat Cable System", price: 600 },
  ],
};

const storyMultipliers: Record<number, number> = { 1: 1.0, 2: 1.15, 3: 1.30, 4: 1.50 };
const conditionMultipliers: Record<string, number> = { good: 1.0, fair: 1.10, poor: 1.25 };

export function calculateQuote(input: CalculatorInput): QuoteResult {
  const service = services.find((s) => s.slug === input.service);
  if (!service) throw new Error(`Service not found: ${input.service}`);

  const baseRate = service.baseRate[input.materialTier];
  const storyMultiplier = storyMultipliers[input.stories] || 1.3;
  const conditionMultiplier = conditionMultipliers[input.currentCondition];

  let quantity = input.squareFootage;
  let unit = service.unit;

  if (input.service === "windows") { quantity = Math.ceil(input.squareFootage / 80); unit = "windows"; }
  if (input.service === "gutters") { quantity = Math.ceil(Math.sqrt(input.squareFootage) * 4); unit = "linear ft"; }

  const basePrice = quantity * baseRate;
  const materialCost = basePrice * 0.4;
  const laborCost = basePrice * 0.6;
  const removalCost = input.needsRemoval ? quantity * 1.5 : 0;
  const storyAdjustment = basePrice * (storyMultiplier - 1);
  const conditionAdjustment = basePrice * (conditionMultiplier - 1);

  const serviceAddons = addons[input.service];
  let addonsCost = 0;
  input.addons.forEach((addonId) => {
    const addon = serviceAddons.find((a) => a.id === addonId);
    if (addon) addonsCost += addon.price < 10 ? addon.price * quantity : addon.price;
  });

  const subtotal = basePrice + removalCost + storyAdjustment + conditionAdjustment + addonsCost;

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
      lowEstimate: Math.round(subtotal * 0.85),
      highEstimate: Math.round(subtotal * 1.15),
    },
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);
}
