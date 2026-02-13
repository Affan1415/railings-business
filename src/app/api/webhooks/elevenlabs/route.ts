import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      conversation_id,
      transcript,
      extracted_data,
      duration_seconds,
    } = body;

    // Validate webhook payload
    if (!conversation_id) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Extract lead info from conversation
    const leadInfo = extracted_data || {};

    // Create or update lead if contact info was captured
    let leadId = null;
    if (leadInfo.name || leadInfo.email || leadInfo.phone) {
      const { data: leadData, error: leadError } = await supabase
        .from("leads")
        .insert({
          name: leadInfo.name || "Voice Agent Lead",
          email: leadInfo.email,
          phone: leadInfo.phone,
          service_interest: leadInfo.service,
          source: "voice_agent",
          status: "new",
          notes: `Captured via AI voice agent conversation`,
        })
        .select()
        .single();

      if (!leadError && leadData) {
        leadId = leadData.id;
      }
    }

    // Save conversation log
    const { data, error } = await supabase
      .from("voice_conversations")
      .insert({
        lead_id: leadId,
        elevenlabs_conversation_id: conversation_id,
        transcript,
        extracted_data: leadInfo,
        duration_seconds,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // If Supabase is not configured, still return success
      if (error.message.includes("relation") || error.code === "PGRST204") {
        return NextResponse.json({
          success: true,
          message: "Webhook received (demo mode - database not configured)",
        });
      }
      return NextResponse.json(
        { error: "Failed to save conversation" },
        { status: 500 }
      );
    }

    // Trigger Zapier webhook if configured
    const zapierWebhook = process.env.ZAPIER_VOICE_WEBHOOK;
    if (zapierWebhook) {
      try {
        await fetch(zapierWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "voice_conversation.ended",
            timestamp: new Date().toISOString(),
            data: {
              conversation_id: data.id,
              lead_id: leadId,
              ...leadInfo,
              duration_seconds,
            },
          }),
        });
      } catch (webhookError) {
        console.error("Zapier webhook error:", webhookError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Conversation logged successfully",
      id: data.id,
      lead_id: leadId,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "ElevenLabs webhook endpoint - use POST to log conversations" },
    { status: 200 }
  );
}
