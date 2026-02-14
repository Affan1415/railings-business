# Zoho CRM/ERP Integration Guide

Complete guide for integrating Zoho CRM and ERP with the Home Improvement Business Platform.

---

## Why Zoho?

| Benefit | Description |
|---------|-------------|
| **All-in-one** | CRM, Projects, Invoice, Books, Analytics |
| **Affordable** | Free tier available, reasonable paid plans |
| **API-first** | Excellent REST APIs for integration |
| **Industry Templates** | Home services templates available |

---

## Zoho Products Overview

| Product | Purpose | Pricing |
|---------|---------|---------|
| **Zoho CRM** | Lead management, pipeline, contacts | Free (3 users) |
| **Zoho Projects** | Job/project tracking | Free (2 projects) |
| **Zoho Invoice** | Quotes, invoices, payments | Free (5 customers) |
| **Zoho Books** | Full accounting | $15/month |
| **Zoho Analytics** | Reporting dashboards | Free (2 users) |

---

## Integration Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Next.js Site   │────▶│   Supabase   │────▶│  Zoho CRM   │
│                 │     │  (Database)  │     │             │
│ - Calculator    │     │              │     │ - Leads     │
│ - Contact Form  │     │ - leads      │     │ - Contacts  │
│ - Voice Agent   │     │ - quotes     │     │ - Deals     │
│ - Booking       │     │ - bookings   │     │             │
└─────────────────┘     └──────────────┘     └─────────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │Zoho Projects│
                        │             │
                        │ - Jobs      │
                        │ - Tasks     │
                        │ - Timeline  │
                        └─────────────┘
```

---

## Part 1: Zoho CRM Setup

### Step 1: Create Zoho Account

1. Go to [zoho.com/crm](https://www.zoho.com/crm/)
2. Sign up for free account
3. Complete initial setup wizard
4. Choose "Services" industry template

### Step 2: Enable API Access

1. Go to [api-console.zoho.com](https://api-console.zoho.com/)
2. Click "Add Client"
3. Choose "Server-based Applications"
4. Fill in details:
   - Client Name: `Home Improvement App`
   - Homepage URL: `https://yourdomain.com`
   - Redirect URI: `https://yourdomain.com/api/zoho/callback`
5. Copy **Client ID** and **Client Secret**

### Step 3: Generate Refresh Token

```bash
# Step 1: Get authorization code
# Visit this URL in browser:
https://accounts.zoho.com/oauth/v2/auth?
  scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&
  client_id=YOUR_CLIENT_ID&
  response_type=code&
  access_type=offline&
  redirect_uri=https://yourdomain.com/api/zoho/callback

# Step 2: Exchange code for refresh token
curl -X POST https://accounts.zoho.com/oauth/v2/token \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=https://yourdomain.com/api/zoho/callback" \
  -d "code=AUTHORIZATION_CODE_FROM_STEP_1"
```

### Step 4: Add to Environment Variables

```env
# .env.local
ZOHO_CLIENT_ID=your-zoho-client-id
ZOHO_CLIENT_SECRET=your-zoho-client-secret
ZOHO_REFRESH_TOKEN=your-zoho-refresh-token
ZOHO_API_DOMAIN=https://www.zohoapis.com
```

---

## Part 2: Custom Fields Setup

### Lead Module - Custom Fields

Create these custom fields in Zoho CRM → Settings → Modules → Leads → Fields:

| Field Name | API Name | Type | Values |
|------------|----------|------|--------|
| Service Interest | Service_Interest | Picklist | Roofing, Windows, Siding, Gutters |
| Property Type | Property_Type | Picklist | Residential, Commercial |
| Square Footage | Square_Footage | Number | - |
| Estimated Value | Estimated_Value | Currency | - |
| Lead Source | Lead_Source1 | Picklist | Website, Voice Agent, Calculator, Referral |
| Quote PDF | Quote_PDF | File Upload | - |
| Number of Stories | Stories | Number | - |
| Current Condition | Current_Condition | Picklist | Good, Fair, Poor |

### Deal Module - Custom Fields

Create these in Zoho CRM → Settings → Modules → Deals → Fields:

| Field Name | API Name | Type | Values |
|------------|----------|------|--------|
| Job Type | Job_Type | Picklist | Roofing, Windows, Siding, Gutters |
| Start Date | Start_Date | Date | - |
| Completion Date | Completion_Date | Date | - |
| Crew Assigned | Crew_Assigned | Lookup (Users) | - |
| Materials Cost | Materials_Cost | Currency | - |
| Labor Cost | Labor_Cost | Currency | - |
| Permit Status | Permit_Status | Picklist | Not Required, Pending, Approved |
| Material Tier | Material_Tier | Picklist | Good, Better, Best |

---

## Part 3: API Integration Code

### Zoho API Client

Create `/src/lib/zoho/client.ts`:

```typescript
interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface ZohoLead {
  Last_Name: string;
  Email?: string;
  Phone?: string;
  Service_Interest?: string;
  Property_Type?: string;
  Square_Footage?: number;
  Lead_Source1?: string;
  Description?: string;
}

class ZohoClient {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private apiDomain: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.ZOHO_CLIENT_ID!;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET!;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN!;
    this.apiDomain = process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com';
  }

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    // Refresh the token
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh Zoho access token');
    }

    const data: ZohoTokenResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Buffer of 60 seconds

    return this.accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.apiDomain}/crm/v3/${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Zoho API Error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  // Create a new lead
  async createLead(lead: ZohoLead) {
    return this.request('Leads', {
      method: 'POST',
      body: JSON.stringify({ data: [lead] }),
    });
  }

  // Update a lead
  async updateLead(id: string, lead: Partial<ZohoLead>) {
    return this.request(`Leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: [lead] }),
    });
  }

  // Get a lead by ID
  async getLead(id: string) {
    return this.request(`Leads/${id}`);
  }

  // Search leads
  async searchLeads(criteria: string) {
    return this.request(`Leads/search?criteria=${encodeURIComponent(criteria)}`);
  }

  // Convert lead to deal
  async convertLead(leadId: string, dealData: Record<string, unknown>) {
    return this.request(`Leads/${leadId}/actions/convert`, {
      method: 'POST',
      body: JSON.stringify({ data: [{ Deals: dealData }] }),
    });
  }

  // Create a deal
  async createDeal(deal: Record<string, unknown>) {
    return this.request('Deals', {
      method: 'POST',
      body: JSON.stringify({ data: [deal] }),
    });
  }

  // Update deal stage
  async updateDealStage(dealId: string, stage: string) {
    return this.request(`Deals/${dealId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: [{ Stage: stage }] }),
    });
  }

  // Create a task
  async createTask(task: Record<string, unknown>) {
    return this.request('Tasks', {
      method: 'POST',
      body: JSON.stringify({ data: [task] }),
    });
  }

  // Add note to record
  async addNote(module: string, recordId: string, note: string) {
    return this.request('Notes', {
      method: 'POST',
      body: JSON.stringify({
        data: [{
          Parent_Id: recordId,
          Note_Content: note,
          se_module: module,
        }],
      }),
    });
  }
}

export const zohoClient = new ZohoClient();
```

### Sync Service

Create `/src/lib/zoho/sync.ts`:

```typescript
import { zohoClient } from './client';

interface LeadInput {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  propertyType?: string;
  squareFootage?: number;
  source?: string;
  notes?: string;
  quoteData?: {
    lowEstimate: number;
    highEstimate: number;
    tier: string;
  };
}

export async function syncLeadToZoho(lead: LeadInput) {
  try {
    // Check if lead already exists by email
    if (lead.email) {
      const existing = await zohoClient.searchLeads(`(Email:equals:${lead.email})`);
      if (existing.data && existing.data.length > 0) {
        // Update existing lead
        return zohoClient.updateLead(existing.data[0].id, {
          Service_Interest: lead.service,
          Square_Footage: lead.squareFootage,
          Description: lead.notes,
        });
      }
    }

    // Create new lead
    const zohoLead = {
      Last_Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Service_Interest: lead.service,
      Property_Type: lead.propertyType,
      Square_Footage: lead.squareFootage,
      Lead_Source1: lead.source || 'Website',
      Description: lead.notes,
    };

    const result = await zohoClient.createLead(zohoLead);

    // Add quote details as note if available
    if (lead.quoteData && result.data?.[0]?.details?.id) {
      await zohoClient.addNote(
        'Leads',
        result.data[0].details.id,
        `Quote Generated:
        - Tier: ${lead.quoteData.tier}
        - Estimate: $${lead.quoteData.lowEstimate.toLocaleString()} - $${lead.quoteData.highEstimate.toLocaleString()}`
      );
    }

    return result;
  } catch (error) {
    console.error('Failed to sync lead to Zoho:', error);
    throw error;
  }
}

export async function convertLeadToDeal(leadId: string, dealData: {
  dealName: string;
  amount: number;
  stage: string;
  closingDate: string;
}) {
  return zohoClient.convertLead(leadId, {
    Deal_Name: dealData.dealName,
    Amount: dealData.amount,
    Stage: dealData.stage,
    Closing_Date: dealData.closingDate,
  });
}

export async function createFollowUpTask(
  relatedTo: { module: string; id: string },
  task: { subject: string; dueDate: string; priority: string }
) {
  return zohoClient.createTask({
    Subject: task.subject,
    Due_Date: task.dueDate,
    Priority: task.priority,
    What_Id: relatedTo.id,
    se_module: relatedTo.module,
  });
}
```

---

## Part 4: Webhook Integration

### Zoho Sync Route

Create `/src/app/api/zoho/sync/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { syncLeadToZoho } from '@/lib/zoho/sync';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lead_id } = body;

    // Get lead from Supabase
    const supabase = await createClient();
    const { data: lead, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Sync to Zoho
    const zohoResult = await syncLeadToZoho({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.service_interest,
      propertyType: lead.property_type,
      squareFootage: lead.square_footage,
      source: lead.source,
      notes: lead.notes,
      quoteData: lead.quote_data,
    });

    // Update Supabase with Zoho ID
    if (zohoResult.data?.[0]?.details?.id) {
      await supabase
        .from('leads')
        .update({ zoho_id: zohoResult.data[0].details.id })
        .eq('id', lead_id);
    }

    return NextResponse.json({
      success: true,
      zoho_id: zohoResult.data?.[0]?.details?.id,
    });
  } catch (error) {
    console.error('Zoho sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync with Zoho' },
      { status: 500 }
    );
  }
}
```

---

## Part 5: Workflow Automations (Built-in Zoho)

Set these up directly in Zoho CRM → Settings → Automation → Workflow Rules:

### Lead Follow-up Workflow

```
Name: New Lead Follow-up
Module: Leads
Trigger: On Create

Actions:
1. Instant Action: Send welcome email
2. Scheduled Action (1 hour): Create task "Initial follow-up call"
3. Scheduled Action (3 days): If status = "New", send follow-up email
4. Scheduled Action (7 days): If status = "New", create task for manager
```

### Quote Follow-up Workflow

```
Name: Quote Follow-up
Module: Deals
Trigger: Stage = "Quote Sent"

Actions:
1. Scheduled Action (2 days): Send "checking in" email
2. Scheduled Action (5 days): Create call task
3. Scheduled Action (10 days): Send "limited time" offer email
```

### Job Completion Workflow

```
Name: Post-Job Review Request
Module: Deals
Trigger: Stage = "Completed"

Actions:
1. Scheduled Action (3 days): Send review request email
2. Scheduled Action (10 days): Send referral request email
3. Instant Action: Create "warranty follow-up" task for 6 months
```

---

## Part 6: Deal Pipeline Stages

Configure in Zoho CRM → Settings → Modules → Deals → Stages:

| Stage | Probability | Description |
|-------|-------------|-------------|
| New Lead | 10% | Initial contact made |
| Qualified | 25% | Needs confirmed, budget discussed |
| Quote Sent | 50% | Quote delivered to customer |
| Negotiation | 75% | Price/terms being discussed |
| Contract Signed | 90% | Awaiting project start |
| In Progress | 95% | Work underway |
| Completed | 100% | Job finished |
| Lost | 0% | Did not close |

---

## Part 7: Zoho Projects Integration

For job/project tracking after deal closes:

### Create Project from Deal

```typescript
// Add to /src/lib/zoho/sync.ts

export async function createProjectFromDeal(dealId: string, projectData: {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}) {
  // This uses Zoho Projects API
  const response = await fetch(
    `https://projectsapi.zoho.com/restapi/portal/${PORTAL_ID}/projects/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectData.name,
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        description: projectData.description,
        custom_fields: {
          deal_id: dealId,
        },
      }),
    }
  );

  return response.json();
}
```

### Project Task Templates

Pre-configure task templates in Zoho Projects for each service type:

**Roofing Project Tasks:**
1. Pre-job inspection
2. Material delivery
3. Tear-off old roofing
4. Install underlayment
5. Install new roofing
6. Install flashing/vents
7. Cleanup
8. Final inspection
9. Customer walkthrough

---

## Part 8: Zoho Invoice Integration

### Create Quote/Invoice from Deal

```typescript
// Add to /src/lib/zoho/sync.ts

export async function createInvoiceFromDeal(dealId: string, items: Array<{
  name: string;
  quantity: number;
  rate: number;
}>) {
  // Get deal details
  const deal = await zohoClient.getDeal(dealId);

  // Create invoice in Zoho Invoice
  const response = await fetch(
    'https://invoice.zoho.com/api/v3/invoices',
    {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name: deal.Contact_Name,
        reference_number: deal.id,
        line_items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          rate: item.rate,
        })),
      }),
    }
  );

  return response.json();
}
```

---

## Part 9: Reporting & Analytics

### Create Custom Reports in Zoho Analytics

1. **Lead Source Report**
   - Track where leads come from
   - Compare conversion rates by source

2. **Sales Pipeline Report**
   - Value at each stage
   - Average time in each stage
   - Win/loss ratio

3. **Revenue by Service Report**
   - Revenue breakdown by service type
   - Compare margins

4. **Crew Performance Report**
   - Jobs completed per crew
   - Customer satisfaction scores

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid OAuth token" | Refresh token may have expired. Generate new one. |
| "Field not found" | Check API name matches exactly (case-sensitive) |
| "Duplicate record" | Enable duplicate checking in Zoho settings |
| "Rate limit exceeded" | Implement exponential backoff |

### Debug API Calls

```typescript
// Add logging to track API calls
const response = await zohoClient.createLead(lead);
console.log('Zoho Response:', JSON.stringify(response, null, 2));
```

### Test API Connection

```bash
# Test your Zoho connection
curl -X GET "https://www.zohoapis.com/crm/v3/Leads" \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

---

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Rotate refresh tokens** - Regenerate every 90 days
3. **Limit API scopes** - Only request needed permissions
4. **Monitor API usage** - Set up alerts for unusual activity
5. **Use server-side only** - Never expose Zoho credentials to client

---

## Cost Summary

| Product | Free Tier | Paid (Recommended) |
|---------|-----------|-------------------|
| Zoho CRM | 3 users | Standard: $14/user/mo |
| Zoho Projects | 2 projects | Premium: $5/user/mo |
| Zoho Invoice | 5 customers | Basic: $9/org/mo |
| **Total** | **$0/mo** | **~$30/mo** (for small team) |
