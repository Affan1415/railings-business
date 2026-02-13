"use client";
import { Home, Square, Layers, Droplets } from "lucide-react";
import { services } from "@/data/services";
import type { CalculatorData } from "./CalculatorWizard";

const iconMap: Record<string, React.ReactNode> = { home: <Home className="h-8 w-8" />, square: <Square className="h-8 w-8" />, layers: <Layers className="h-8 w-8" />, droplets: <Droplets className="h-8 w-8" /> };

interface ServiceStepProps { data: CalculatorData; updateData: (updates: Partial<CalculatorData>) => void; }

export function ServiceStep({ data, updateData }: ServiceStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">What service do you need?</h2>
        <p className="text-muted-foreground">Select the type of home improvement project you&apos;re planning.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <button key={service.slug} onClick={() => updateData({ service: service.slug as CalculatorData["service"] })} className={`p-6 rounded-xl border-2 text-left transition-all ${data.service === service.slug ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50 bg-background"}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${data.service === service.slug ? "bg-orange-500 text-white" : "bg-orange-500/10 text-orange-500"}`}>{iconMap[service.icon]}</div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{service.shortTitle}</h3>
            <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
            <p className="text-sm text-orange-500 font-medium">{service.priceRange}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
