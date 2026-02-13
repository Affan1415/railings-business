"use client";
import { Check, Star } from "lucide-react";
import { services } from "@/data/services";
import { formatCurrency } from "@/lib/calculator/pricing";
import type { CalculatorData } from "./CalculatorWizard";
import type { MaterialTier } from "@/lib/calculator/pricing";

interface MaterialStepProps { data: CalculatorData; updateData: (updates: Partial<CalculatorData>) => void; }

const tierInfo: Record<MaterialTier, { name: string; description: string; features: string[] }> = {
  good: { name: "Good", description: "Quality materials at an affordable price", features: ["Standard warranty", "Entry-level products", "Good durability"] },
  better: { name: "Better", description: "Enhanced quality with improved features", features: ["Extended warranty", "Mid-range products", "Better efficiency"] },
  best: { name: "Best", description: "Premium materials with maximum protection", features: ["Lifetime warranty", "Premium products", "Maximum efficiency"] },
};

export function MaterialStep({ data, updateData }: MaterialStepProps) {
  const service = services.find((s) => s.slug === data.service);
  if (!service) return null;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose your material quality</h2>
        <p className="text-muted-foreground">Select the quality tier that fits your needs and budget.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {(["good", "better", "best"] as MaterialTier[]).map((tier, index) => {
          const info = tierInfo[tier];
          const rate = service.baseRate[tier];
          const isSelected = data.materialTier === tier;
          const isPopular = tier === "better";
          return (
            <button key={tier} onClick={() => updateData({ materialTier: tier })} className={`relative p-6 rounded-xl border-2 text-left transition-all ${isSelected ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50"}`}>
              {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">Most Popular</div>}
              <div className="flex items-center gap-2 mb-3">{[...Array(index + 1)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${isSelected ? "text-orange-500 fill-orange-500" : "text-yellow-500 fill-yellow-500"}`} />))}</div>
              <h3 className="text-xl font-bold text-foreground mb-1">{info.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{info.description}</p>
              <div className="mb-4"><span className="text-2xl font-bold text-orange-500">{formatCurrency(rate)}</span><span className="text-sm text-muted-foreground">/{service.unit}</span></div>
              <ul className="space-y-2">{info.features.map((feature, i) => (<li key={i} className="flex items-start gap-2 text-sm"><Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isSelected ? "text-orange-500" : "text-green-500"}`} /><span className="text-muted-foreground">{feature}</span></li>))}</ul>
              {isSelected && <div className="absolute top-4 right-4"><div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center"><Check className="h-4 w-4 text-white" /></div></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
