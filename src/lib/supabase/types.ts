export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          zoho_id: string | null;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          service_interest: string | null;
          property_type: string | null;
          square_footage: number | null;
          source: string;
          quote_data: Json | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          zoho_id?: string | null;
          name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          service_interest?: string | null;
          property_type?: string | null;
          square_footage?: number | null;
          source?: string;
          quote_data?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          zoho_id?: string | null;
          name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          service_interest?: string | null;
          property_type?: string | null;
          square_footage?: number | null;
          source?: string;
          quote_data?: Json | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quotes: {
        Row: {
          id: string;
          lead_id: string | null;
          service_type: string;
          tier: string;
          square_footage: number;
          stories: number | null;
          addons: Json | null;
          price_low: number;
          price_high: number;
          breakdown: Json | null;
          pdf_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          service_type: string;
          tier: string;
          square_footage: number;
          stories?: number | null;
          addons?: Json | null;
          price_low: number;
          price_high: number;
          breakdown?: Json | null;
          pdf_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          service_type?: string;
          tier?: string;
          square_footage?: number;
          stories?: number | null;
          addons?: Json | null;
          price_low?: number;
          price_high?: number;
          breakdown?: Json | null;
          pdf_url?: string | null;
          created_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          lead_id: string | null;
          service_type: string | null;
          preferred_date: string;
          preferred_time: string | null;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          service_type?: string | null;
          preferred_date: string;
          preferred_time?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          service_type?: string | null;
          preferred_date?: string;
          preferred_time?: string | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      voice_conversations: {
        Row: {
          id: string;
          lead_id: string | null;
          elevenlabs_conversation_id: string;
          transcript: string | null;
          extracted_data: Json | null;
          duration_seconds: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          elevenlabs_conversation_id: string;
          transcript?: string | null;
          extracted_data?: Json | null;
          duration_seconds?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string | null;
          elevenlabs_conversation_id?: string;
          transcript?: string | null;
          extracted_data?: Json | null;
          duration_seconds?: number | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type Quote = Database["public"]["Tables"]["quotes"]["Row"];
export type QuoteInsert = Database["public"]["Tables"]["quotes"]["Insert"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type AppointmentInsert = Database["public"]["Tables"]["appointments"]["Insert"];
export type VoiceConversation = Database["public"]["Tables"]["voice_conversations"]["Row"];
