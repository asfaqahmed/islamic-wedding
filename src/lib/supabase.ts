import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://xllofjvzvyqlecjorvqz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG9manZ6dnlxbGVjam9ydnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTM0MzUsImV4cCI6MjA3NzkyOTQzNX0.1NBTqZTnUu-bA8yZowtfmOfF5FcmFi6GHZdpNEQS6MM';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbG9manZ6dnlxbGVjam9ydnF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjM1MzQzNSwiZXhwIjoyMDc3OTI5NDM1fQ.yP3K1MYbLnfDJ9diNAmlwtd5l24Sl8jew3Lh4ponytE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// TypeScript interfaces for database tables
export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone?: string;
  guest_count: number;
  meal_preference: 'halal' | 'vegetarian' | 'kids' | 'special';
  will_attend: boolean;
  created_at: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}

export interface Photo {
  id: string;
  filename: string;
  url: string;
  uploaded_by?: string;
  approved: boolean;
  created_at: string;
}

export interface CantMakeIt {
  id: string;
  name: string;
  email: string;
  message?: string;
  created_at: string;
}
