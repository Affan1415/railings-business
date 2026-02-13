import { NextRequest, NextResponse } from "next/server";

// Generic Zapier webhook endpoint for outgoing events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, payload } = body;

    if (!event) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    // Map events to corresponding Zapier webhooks
    const webhookMap: Record<string, string | undefined> = {
      "lead.created": process.env.ZAPIER_LEADS_WEBHOOK,
      "quote.created": process.env.ZAPIER_QUOTES_WEBHOOK,
      "appointment.created": process.env.ZAPIER_APPOINTMENTS_WEBHOOK,
      "voice_conversation.ended": process.env.ZAPIER_VOICE_WEBHOOK,
      "review.requested": process.env.ZAPIER_REVIEW_WEBHOOK,
    };

    const webhookUrl = webhookMap[event] || process.env.ZAPIER_GENERAL_WEBHOOK;

    if (!webhookUrl) {
      return NextResponse.json({
        success: true,
        message: `Event ${event} received but no webhook configured`,
        demo: true,
      });
    }

    // Forward to Zapier
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!response.ok) {
      console.error("Zapier webhook failed:", await response.text());
      return NextResponse.json(
        { error: "Failed to forward to Zapier" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Event ${event} forwarded to Zapier`,
    });
  } catch (error) {
    console.error("Zapier webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Endpoint for Zapier to poll/subscribe
export async function GET() {
  return NextResponse.json({
    status: "active",
    supported_events: [
      "lead.created",
      "quote.created",
      "appointment.created",
      "voice_conversation.ended",
      "review.requested",
    ],
    message: "Zapier integration endpoint - use POST to trigger webhooks",
  });
}
