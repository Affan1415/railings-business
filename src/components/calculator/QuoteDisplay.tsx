"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Calendar, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { formatCurrency, type QuoteResult } from "@/lib/calculator/pricing";
import { company } from "@/data/company";

interface QuoteDisplayProps { quote: QuoteResult; contactData: { name: string; email: string }; }

export function QuoteDisplay({ quote, contactData }: QuoteDisplayProps) {
  const service = services.find((s) => s.slug === quote.service);

  return (
    <div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="h-8 w-8 text-green-500" /></motion.div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Instant Quote is Ready!</h2>
        <p className="text-muted-foreground">Thank you, {contactData.name.split(" ")[0]}! Here&apos;s your estimated price range.</p>
      </div>
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-center text-white mb-8">
        <p className="text-white/80 mb-2">Estimated Price Range</p>
        <div className="text-4xl md:text-5xl font-bold mb-2">{formatCurrency(quote.breakdown.lowEstimate)} - {formatCurrency(quote.breakdown.highEstimate)}</div>
        <p className="text-white/80 text-sm">for {quote.quantity} {quote.unit} of {service?.shortTitle}</p>
      </div>
      <div className="bg-muted/50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-foreground mb-4">Price Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Base Price ({quote.materialTier} tier)</span><span className="text-foreground">{formatCurrency(quote.breakdown.basePrice)}</span></div>
          {quote.breakdown.removalCost > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Removal & Disposal</span><span className="text-foreground">{formatCurrency(quote.breakdown.removalCost)}</span></div>}
          {quote.breakdown.storyAdjustment > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Multi-Story Adjustment</span><span className="text-foreground">{formatCurrency(quote.breakdown.storyAdjustment)}</span></div>}
          <div className="flex justify-between pt-2 border-t border-border font-medium"><span className="text-foreground">Subtotal</span><span className="text-orange-500">{formatCurrency(quote.breakdown.subtotal)}</span></div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* Final price may vary based on on-site inspection.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90"><Link href="/book"><Calendar className="mr-2 h-5 w-5" />Schedule Free Inspection</Link></Button>
        <Button asChild variant="outline" size="lg"><a href={`tel:${company.phone}`}><Phone className="mr-2 h-5 w-5" />Call Us Now</a></Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="ghost" size="sm"><Download className="mr-2 h-4 w-4" />Download PDF Quote</Button>
        <Button variant="ghost" size="sm" asChild><Link href="/services">View Other Services<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-4">We&apos;ve sent a copy of this quote to {contactData.email}</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground"><span>Free Inspections</span><span>|</span><span>No Obligation</span><span>|</span><span>Financing Available</span></div>
      </div>
    </div>
  );
}
