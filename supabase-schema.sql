-- Supabase Schema for Home Improvement Business Platform
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table (syncs to Zoho CRM)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zoho_id VARCHAR(50),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  service_interest VARCHAR(50),
  property_type VARCHAR(50),
  square_footage INTEGER,
  source VARCHAR(50) DEFAULT 'website',
  quote_data JSONB,
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  service_type VARCHAR(50) NOT NULL,
  tier VARCHAR(20) NOT NULL,
  square_footage INTEGER NOT NULL,
  stories INTEGER DEFAULT 1,
  addons JSONB,
  price_low DECIMAL(10,2) NOT NULL,
  price_high DECIMAL(10,2) NOT NULL,
  breakdown JSONB,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  service_type VARCHAR(50),
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(20),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Voice conversations log (ElevenLabs)
CREATE TABLE IF NOT EXISTS voice_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  elevenlabs_conversation_id VARCHAR(100) NOT NULL,
  transcript TEXT,
  extracted_data JSONB,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_lead_id ON appointments(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_voice_conversations_lead_id ON voice_conversations(lead_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for leads table
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public forms)
CREATE POLICY "Allow anonymous inserts on leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on appointments" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on voice_conversations" ON voice_conversations
  FOR INSERT WITH CHECK (true);

-- Allow service role full access (for server-side operations)
CREATE POLICY "Allow service role full access on leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on quotes" ON quotes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on appointments" ON appointments
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on voice_conversations" ON voice_conversations
  FOR ALL USING (auth.role() = 'service_role');

-- Sample data for testing (optional)
-- INSERT INTO leads (name, email, phone, service_interest, source)
-- VALUES ('Test User', 'test@example.com', '555-123-4567', 'roofing', 'website');
