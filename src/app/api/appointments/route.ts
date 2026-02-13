import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      lead_id,
      name,
      email,
      phone,
      service,
      preferred_date,
      preferred_time,
      notes,
    } = body;

    // Validate required fields
    if (!name || !email || !preferred_date) {
      return NextResponse.json(
        { error: "Name, email, and preferred date are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // If no lead_id provided, create a new lead first
    let finalLeadId = lead_id;
    if (!finalLeadId) {
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .insert({
          name,
          email,
          phone,
          service_interest: service,
          source: "appointment_booking",
          status: "new",
        })
        .select()
        .single();

      if (leadError && !leadError.message.includes("relation")) {
        console.error("Lead creation error:", leadError);
      } else if (leadData) {
        finalLeadId = leadData.id;
      }
    }

    // Insert appointment into database
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        lead_id: finalLeadId,
        service_type: service,
        preferred_date,
        preferred_time,
        notes,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // If Supabase is not configured, still return success for demo
      if (error.message.includes("relation") || error.code === "PGRST204") {
        return NextResponse.json({
          success: true,
          message: "Appointment requested (demo mode - database not configured)",
          id: `demo_${Date.now()}`,
        });
      }
      return NextResponse.json(
        { error: "Failed to save appointment" },
        { status: 500 }
      );
    }

    // Trigger Zapier webhook if configured
    const zapierWebhook = process.env.ZAPIER_APPOINTMENTS_WEBHOOK;
    if (zapierWebhook) {
      try {
        await fetch(zapierWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "appointment.created",
            timestamp: new Date().toISOString(),
            data: {
              id: data.id,
              lead_id: finalLeadId,
              name,
              email,
              phone,
              service,
              preferred_date,
              preferred_time,
            },
          }),
        });
      } catch (webhookError) {
        console.error("Zapier webhook error:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Appointment scheduled successfully",
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
    { message: "Appointments API endpoint - use POST to schedule appointments" },
    { status: 200 }
  );
}
