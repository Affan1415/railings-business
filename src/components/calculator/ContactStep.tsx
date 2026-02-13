"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CalculatorData } from "./CalculatorWizard";

interface ContactStepProps { data: CalculatorData; updateData: (updates: Partial<CalculatorData>) => void; }

export function ContactStep({ data, updateData }: ContactStepProps) {
  const updateContact = (field: string, value: string) => updateData({ contact: { ...data.contact, [field]: value } });

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Almost there! Your contact info</h2>
        <p className="text-muted-foreground">We&apos;ll send your detailed quote and may follow up with questions.</p>
      </div>
      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" value={data.contact.name} onChange={(e) => updateContact("name", e.target.value)} placeholder="John Smith" required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={data.contact.email} onChange={(e) => updateContact("email", e.target.value)} placeholder="john@example.com" required /></div>
          <div className="space-y-2"><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" value={data.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} placeholder="(555) 123-4567" required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="address">Property Address</Label><Input id="address" value={data.contact.address} onChange={(e) => updateContact("address", e.target.value)} placeholder="123 Main St, Springfield, MA" /></div>
        <div className="space-y-2"><Label htmlFor="message">Additional Notes (Optional)</Label><Textarea id="message" value={data.contact.message} onChange={(e) => updateContact("message", e.target.value)} placeholder="Any specific details about your project..." rows={3} /></div>
        <p className="text-xs text-muted-foreground text-center pt-2">By submitting, you agree to receive your quote and occasional updates. We never share your information.</p>
      </div>
    </div>
  );
}
