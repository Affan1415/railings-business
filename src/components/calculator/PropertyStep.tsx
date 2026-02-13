"use client";
import { Building, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorData } from "./CalculatorWizard";

interface PropertyStepProps { data: CalculatorData; updateData: (updates: Partial<CalculatorData>) => void; }

export function PropertyStep({ data, updateData }: PropertyStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your property</h2>
        <p className="text-muted-foreground">These details help us provide an accurate estimate.</p>
      </div>
      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label>Property Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => updateData({ propertyType: "residential" })} className={`p-4 rounded-xl border-2 text-center transition-all ${data.propertyType === "residential" ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50"}`}>
              <Home className={`h-6 w-6 mx-auto mb-2 ${data.propertyType === "residential" ? "text-orange-500" : "text-muted-foreground"}`} /><span className="font-medium text-foreground">Residential</span>
            </button>
            <button onClick={() => updateData({ propertyType: "commercial" })} className={`p-4 rounded-xl border-2 text-center transition-all ${data.propertyType === "commercial" ? "border-orange-500 bg-orange-500/5" : "border-border hover:border-orange-500/50"}`}>
              <Building className={`h-6 w-6 mx-auto mb-2 ${data.propertyType === "commercial" ? "text-orange-500" : "text-muted-foreground"}`} /><span className="font-medium text-foreground">Commercial</span>
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sqft">{data.service === "windows" ? "Total Living Space (sq ft)" : "Project Area (sq ft)"}</Label>
          <Input id="sqft" type="number" min="100" max="50000" value={data.squareFootage} onChange={(e) => updateData({ squareFootage: parseInt(e.target.value) || 0 })} placeholder="e.g., 2000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stories">Number of Stories</Label>
          <Select value={data.stories.toString()} onValueChange={(value) => updateData({ stories: parseInt(value) })}>
            <SelectTrigger><SelectValue placeholder="Select stories" /></SelectTrigger>
            <SelectContent><SelectItem value="1">1 Story</SelectItem><SelectItem value="2">2 Stories</SelectItem><SelectItem value="3">3 Stories</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Current Condition</Label>
          <Select value={data.currentCondition} onValueChange={(value: "good" | "fair" | "poor") => updateData({ currentCondition: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="good">Good - Minor wear only</SelectItem><SelectItem value="fair">Fair - Some repairs needed</SelectItem><SelectItem value="poor">Poor - Significant damage</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Need removal of existing materials?</Label>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => updateData({ needsRemoval: true })} className={`p-3 rounded-xl border-2 text-center transition-all ${data.needsRemoval ? "border-orange-500 bg-orange-500/5 text-orange-500" : "border-border hover:border-orange-500/50 text-foreground"}`}>Yes</button>
            <button onClick={() => updateData({ needsRemoval: false })} className={`p-3 rounded-xl border-2 text-center transition-all ${!data.needsRemoval ? "border-orange-500 bg-orange-500/5 text-orange-500" : "border-border hover:border-orange-500/50 text-foreground"}`}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
