import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { calculateQuote, type CalculatorInput, type MaterialTier, type ServiceType, type PropertyType } from "@/lib/calculator/pricing";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lead_id,
      service,
      tier,
      squareFootage,
      stories,
      propertyType,
      currentCondition,
      needsRemoval,
      addons,
    } = body;

    // Validate required fields
    if (!service || !tier || !squareFootage) {
      return NextResponse.json(
        { error: "Service, tier, and square footage are required" },
        { status: 400 }
      );
    }

    // Calculate quote
    const calculatorInput: CalculatorInput = {
      service: service as ServiceType,
      materialTier: tier as MaterialTier,
      squareFootage: Number(squareFootage),
      stories: Number(stories) || 1,
      propertyType: (propertyType || "residential") as PropertyType,
      currentCondition: currentCondition || "good",
      needsRemoval: needsRemoval || false,
      addons: addons || [],
    };

    const quote = calculateQuote(calculatorInput);

    const supabase = await createClient();

    // Insert quote into database
    const { data, error } = await supabase
      .from("quotes")
      .insert({
        lead_id,
        service_type: service,
        tier,
        square_footage: squareFootage,
        stories,
        addons,
        price_low: quote.breakdown.lowEstimate,
        price_high: quote.breakdown.highEstimate,
        breakdown: quote.breakdown,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // If Supabase is not configured, still return quote for demo
      if (error.message.includes("relation") || error.code === "PGRST204") {
        return NextResponse.json({
          success: true,
          message: "Quote calculated (demo mode - database not configured)",
          id: `demo_${Date.now()}`,
          quote,
        });
      }
      return NextResponse.json(
        { error: "Failed to save quote" },
        { status: 500 }
      );
    }

    // Trigger Zapier webhook if configured
    const zapierWebhook = process.env.ZAPIER_QUOTES_WEBHOOK;
    if (zapierWebhook) {
      try {
        await fetch(zapierWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "quote.created",
            timestamp: new Date().toISOString(),
            data: {
              id: data.id,
              lead_id,
              service,
              tier,
              price_low: quote.breakdown.lowEstimate,
              price_high: quote.breakdown.highEstimate,
            },
          }),
        });
      } catch (webhookError) {
        console.error("Zapier webhook error:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Quote created successfully",
      id: data.id,
      quote,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Quotes API endpoint - use POST to create quotes" },
    { status: 200 }
  );
}
