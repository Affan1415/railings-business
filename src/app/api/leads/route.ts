import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      address,
      service,
      source = "website",
      message,
      quote_data,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert lead into database
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        address,
        service_interest: service,
        source,
        notes: message,
        quote_data,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // If Supabase is not configured, still return success for demo
      if (error.message.includes("relation") || error.code === "PGRST204") {
        return NextResponse.json({
          success: true,
          message: "Lead captured (demo mode - database not configured)",
          id: `demo_${Date.now()}`,
        });
      }
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Trigger Zapier webhook if configured
    const zapierWebhook = process.env.ZAPIER_LEADS_WEBHOOK;
    if (zapierWebhook) {
      try {
        await fetch(zapierWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "lead.created",
            timestamp: new Date().toISOString(),
            data: {
              id: data.id,
              name,
              email,
              phone,
              service,
              source,
              quote_value: quote_data?.total,
            },
          }),
        });
      } catch (webhookError) {
        console.error("Zapier webhook error:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      id: data.id,
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
    { message: "Lead API endpoint - use POST to submit leads" },
    { status: 200 }
  );
}
