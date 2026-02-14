# Zapier Automation Workflows

Complete guide for setting up Zapier automations with the Home Improvement Business Platform.

---

## Overview

Zapier connects your website to 5000+ apps, automating lead management, notifications, follow-ups, and reporting without writing code.

### Architecture

```
┌─────────────────┐
│   Next.js Site  │
│                 │
│ - Contact Form  │──────┐
│ - Calculator    │      │
│ - Voice Agent   │      ▼
│ - Booking       │  ┌──────────┐     ┌─────────────┐
└─────────────────┘  │  Zapier  │────▶│  Zoho CRM   │
                     │          │     └─────────────┘
┌─────────────────┐  │ Webhooks │
│    Supabase     │──│          │     ┌─────────────┐
│   (Database)    │  │          │────▶│Google Sheets│
└─────────────────┘  │          │     └─────────────┘
                     │          │     ┌─────────────┐
                     │          │────▶│   Twilio    │
                     │          │     │    (SMS)    │
                     │          │     └─────────────┘
                     │          │     ┌─────────────┐
                     │          │────▶│   Gmail/    │
                     │          │     │  SendGrid   │
                     │          │     └─────────────┘
                     │          │     ┌─────────────┐
                     │          │────▶│   Slack     │
                     └──────────┘     └─────────────┘
```

---

## Initial Setup

### 1. Create Zapier Account
1. Go to [zapier.com](https://zapier.com) and sign up
2. Choose a plan (Free tier: 100 tasks/month, 5 Zaps)

### 2. Get Webhook URLs
For each workflow, Zapier provides a unique webhook URL:
1. Create a new Zap
2. Choose "Webhooks by Zapier" as trigger
3. Select "Catch Hook"
4. Copy the webhook URL provided

### 3. Add to Environment Variables
```env
# .env.local
ZAPIER_LEADS_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/lead-webhook
ZAPIER_QUOTES_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/quote-webhook
ZAPIER_APPOINTMENTS_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/appointment-webhook
ZAPIER_VOICE_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/voice-webhook
ZAPIER_REVIEW_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/review-webhook
ZAPIER_GENERAL_WEBHOOK=https://hooks.zapier.com/hooks/catch/xxxxx/general-webhook
```

---

## Essential Workflows (Zaps)

### 1. New Lead → Multi-Channel Notification

**Purpose:** Instantly notify your team and welcome the customer when a new lead comes in.

**Trigger:** Webhook (new lead from website)

**Actions:**
```
Step 1: Webhook receives lead data
   ↓
Step 2: Create Lead in Zoho CRM
   ↓
Step 3: Add row to Google Sheets (backup/tracking)
   ↓
Step 4: Send Slack notification to #sales channel
   ↓
Step 5: Send SMS to business owner (Twilio)
   ↓
Step 6: Send welcome email to customer (Gmail/SendGrid)
```

**Zapier Configuration:**

| Step | App | Action | Configuration |
|------|-----|--------|---------------|
| 1 | Webhooks | Catch Hook | Copy URL to `ZAPIER_LEADS_WEBHOOK` |
| 2 | Zoho CRM | Create Lead | Map: name, email, phone, service_interest |
| 3 | Google Sheets | Create Row | Map all fields to columns |
| 4 | Slack | Send Message | Channel: #sales, include lead details |
| 5 | Twilio | Send SMS | To: owner phone, Message: "New lead: {name}" |
| 6 | Gmail | Send Email | To: lead email, Template: welcome email |

**Sample Webhook Payload:**
```json
{
  "event": "lead.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "uuid-here",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "service": "roofing",
    "source": "calculator",
    "quote_value": 15000
  }
}
```

---

### 2. Calculator Quote → Sales Pipeline

**Purpose:** Route high-value quotes to priority handling.

**Trigger:** Webhook (quote completed)

**Flow with Paths:**
```
Step 1: Webhook receives quote data
   ↓
Step 2: Filter - Check quote value
   ↓
┌─────────────────────────────────────┐
│                                     │
▼                                     ▼
Path A: Value > $10,000           Path B: Value ≤ $10,000
│                                     │
├─ Create Deal (Priority: HIGH)      ├─ Create Deal (Priority: Normal)
├─ Slack: "🔥 Hot lead! ${value}"    ├─ Add to email nurture sequence
├─ Create follow-up task (today)     └─ Schedule follow-up (3 days)
└─ SMS alert to sales manager
```

**Zapier Configuration:**

| Step | App | Action | Notes |
|------|-----|--------|-------|
| 1 | Webhooks | Catch Hook | Trigger on quote.created |
| 2 | Paths | Create Paths | Condition: quote_value > 10000 |
| 3A | Zoho CRM | Create Deal | Priority: High, Stage: Quote Sent |
| 3B | Zoho CRM | Create Deal | Priority: Normal |
| 4A | Slack | Send Message | Include 🔥 emoji, full details |
| 4B | Mailchimp | Add Subscriber | Tag: "nurture-sequence" |

---

### 3. Voice Agent Lead → Instant Response

**Purpose:** Process leads captured by AI voice agent.

**Trigger:** Webhook from ElevenLabs (conversation ended)

**Flow:**
```
Step 1: Webhook receives conversation data
   ↓
Step 2: Formatter - Parse transcript and extract data
   ↓
Step 3: Create/Update Lead in Zoho CRM
   ↓
Step 4: Send SMS confirmation to customer
   ↓
Step 5: Check - Did they request appointment?
   ↓
┌─────────────────────────────────────┐
│                                     │
▼                                     ▼
YES                                   NO
│                                     │
├─ Create Google Calendar event       └─ Add to follow-up sequence
├─ Send calendar invite to customer
└─ Notify assigned sales rep
```

**Sample Voice Webhook Payload:**
```json
{
  "event": "voice_conversation.ended",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "conversation_id": "conv_123",
    "lead_id": "uuid-here",
    "name": "Jane Doe",
    "phone": "555-987-6543",
    "service": "windows",
    "appointment_requested": true,
    "preferred_date": "2024-01-20",
    "duration_seconds": 180
  }
}
```

---

### 4. Appointment Booking → Calendar Sync

**Purpose:** Sync bookings with Google Calendar and send confirmations.

**Trigger:** Webhook (new appointment)

**Flow:**
```
Step 1: Webhook receives appointment data
   ↓
Step 2: Create Google Calendar event
   ↓
Step 3: Send confirmation email with details
   ↓
Step 4: Schedule SMS reminder (24 hours before)
   ↓
Step 5: Update Zoho CRM lead status → "Appointment Set"
   ↓
Step 6: Create task for sales rep in Zoho
```

**Calendar Event Template:**
```
Title: Home Consultation - {customer_name}
Location: {customer_address}
Description:
  Service: {service_type}
  Phone: {phone}
  Notes: {notes}

  Lead ID: {lead_id}
```

---

### 5. Quote Follow-up Sequence

**Purpose:** Automatically follow up on sent quotes.

**Trigger:** Schedule (runs daily at 9am)

**Flow:**
```
Step 1: Scheduled trigger (9am daily)
   ↓
Step 2: Zoho CRM - Find quotes older than 3 days
   ↓
Step 3: Filter - Status = "Sent" AND no response
   ↓
Step 4: Loop through each quote:
   │
   ├─ If quote 3-6 days old:
   │     └─ Send follow-up email #1
   │
   ├─ If quote 7-10 days old:
   │     ├─ Send follow-up email #2
   │     └─ Create call task for sales rep
   │
   └─ If quote > 10 days old:
         ├─ Send "limited time offer" email
         └─ Mark as "Needs Attention" in CRM
```

**Email Templates:**

**Follow-up #1 (Day 3):**
```
Subject: Your {service} Quote - Any Questions?

Hi {name},

Just checking in about the quote we sent for your {service} project.

Do you have any questions I can answer?

Best,
{sales_rep_name}
```

**Follow-up #2 (Day 7):**
```
Subject: Still thinking about your {service} project?

Hi {name},

I wanted to follow up on your quote. We'd love to help with your project.

Would you like to schedule a quick call to discuss?

[Schedule Call Button]
```

---

### 6. Job Completion → Review Request

**Purpose:** Request reviews from satisfied customers.

**Trigger:** Zoho CRM Deal Stage = "Completed"

**Flow:**
```
Step 1: Deal stage changes to "Completed"
   ↓
Step 2: Delay - Wait 3 days
   ↓
Step 3: Send review request email with links:
         ├─ Google Reviews
         ├─ Yelp
         └─ Facebook
   ↓
Step 4: Delay - Wait 7 days
   ↓
Step 5: Check - Review submitted?
   ↓
┌─────────────────────────────────────┐
│                                     │
▼                                     ▼
NO                                    YES
│                                     │
├─ Send SMS reminder                  └─ Send thank you + referral request
└─ Log in tracking sheet
```

**Review Request Email Template:**
```
Subject: How did we do on your {service} project?

Hi {name},

We hope you're enjoying your new {service}! We'd love to hear
about your experience.

Would you take 2 minutes to leave us a review?

⭐ Google: [link]
⭐ Yelp: [link]
⭐ Facebook: [link]

Thank you for choosing {company_name}!
```

---

### 7. Negative Review Alert

**Purpose:** Immediately alert team to negative reviews.

**Trigger:** New Google Review (via ReviewTrackers or similar)

**Flow:**
```
Step 1: New review detected
   ↓
Step 2: Filter - Rating < 4 stars
   ↓
Step 3: Send URGENT Slack alert
   ↓
Step 4: Create high-priority task in Zoho CRM
   ↓
Step 5: Email owner immediately
   ↓
Step 6: Log in Google Sheets for tracking
```

**Slack Alert Template:**
```
🚨 NEGATIVE REVIEW ALERT 🚨

Rating: ⭐⭐ (2 stars)
Customer: {reviewer_name}
Date: {date}

Review:
"{review_text}"

Action Required: Respond within 24 hours
[View on Google →]
```

---

### 8. Monthly Reporting

**Purpose:** Generate and send monthly performance reports.

**Trigger:** Schedule (1st of month at 8am)

**Flow:**
```
Step 1: Scheduled trigger (1st of month)
   ↓
Step 2: Zoho CRM - Get last month's data:
         ├─ New leads count
         ├─ Quotes sent
         ├─ Deals closed
         └─ Revenue
   ↓
Step 3: Google Analytics - Get traffic data
   ↓
Step 4: Compile data in Google Sheets
   ↓
Step 5: Generate PDF summary (using PDF.co)
   ↓
Step 6: Email report to stakeholders
```

---

## Webhook Endpoints Reference

### Available Endpoints

| Endpoint | URL | Events |
|----------|-----|--------|
| Leads | `/api/leads` | POST: Create lead |
| Quotes | `/api/quotes` | POST: Create quote |
| Appointments | `/api/appointments` | POST: Create appointment |
| Zapier | `/api/webhooks/zapier` | POST: Trigger any event |
| ElevenLabs | `/api/webhooks/elevenlabs` | POST: Voice conversation data |

### Event Types

```javascript
// Supported event types for /api/webhooks/zapier
const events = [
  "lead.created",
  "quote.created",
  "appointment.created",
  "voice_conversation.ended",
  "review.requested"
];
```

---

## Recommended Apps to Connect

| App | Purpose | Free Tier |
|-----|---------|-----------|
| **Zoho CRM** | Lead & deal management | Yes (3 users) |
| **Google Calendar** | Appointment scheduling | Yes |
| **Gmail** | Email automation | Yes |
| **Twilio** | SMS notifications | Pay-as-you-go |
| **Slack** | Team notifications | Yes |
| **Google Sheets** | Reporting & backup | Yes |
| **Mailchimp** | Email marketing | Yes (500 contacts) |
| **Calendly** | Advanced scheduling | Yes (1 calendar) |

---

## Testing Your Zaps

### 1. Test with Sample Data
```bash
# Test lead webhook
curl -X POST https://hooks.zapier.com/hooks/catch/xxxxx/your-hook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "lead.created",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "555-0000",
      "service": "roofing"
    }
  }'
```

### 2. Check Zap History
- Go to Zapier Dashboard → Zap History
- View all runs and any errors
- Re-run failed tasks

### 3. Enable Error Notifications
- Zapier Settings → Notifications
- Enable email alerts for failed Zaps

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Webhook not triggering | Check URL is correct in .env.local |
| Data not mapping | Verify field names match webhook payload |
| Zap turning off | Check for errors in Zap History |
| Rate limiting | Upgrade Zapier plan or add delays |

### Debug Mode
Add console logging to webhook routes:
```typescript
console.log("Webhook received:", JSON.stringify(body, null, 2));
```

---

## Cost Optimization

### Free Tier Limits
- 100 tasks/month
- 5 Zaps
- 15-minute update time

### Tips to Stay Under Limits
1. Combine multiple actions into one Zap using Paths
2. Use Filters to reduce unnecessary runs
3. Batch operations where possible
4. Use Zapier Tables for simple data storage

---

## Security Best Practices

1. **Never expose webhook URLs** in client-side code
2. **Validate webhook payloads** before processing
3. **Use HTTPS** for all webhook endpoints
4. **Rotate webhook URLs** periodically
5. **Monitor Zap activity** for unusual patterns
