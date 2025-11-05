-- Create RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guest_count INTEGER NOT NULL DEFAULT 1,
  meal_preference TEXT NOT NULL CHECK (meal_preference IN ('halal', 'vegetarian', 'kids', 'special')),
  will_attend BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Wishes table
CREATE TABLE IF NOT EXISTS wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  uploaded_by TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Can't Make It table
CREATE TABLE IF NOT EXISTS cant_make_it (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE cant_make_it ENABLE ROW LEVEL SECURITY;

-- RSVPs policies
CREATE POLICY "Allow public insert on rsvps" ON rsvps
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read on rsvps" ON rsvps
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow service role all on rsvps" ON rsvps
  FOR ALL TO service_role
  USING (true);

-- Wishes policies
CREATE POLICY "Allow public insert on wishes" ON wishes
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read approved wishes" ON wishes
  FOR SELECT TO anon
  USING (approved = true);

CREATE POLICY "Allow service role all on wishes" ON wishes
  FOR ALL TO service_role
  USING (true);

-- Photos policies
CREATE POLICY "Allow public insert on photos" ON photos
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read approved photos" ON photos
  FOR SELECT TO anon
  USING (approved = true);

CREATE POLICY "Allow service role all on photos" ON photos
  FOR ALL TO service_role
  USING (true);

-- Can't Make It policies
CREATE POLICY "Allow public insert on cant_make_it" ON cant_make_it
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read on cant_make_it" ON cant_make_it
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow service role all on cant_make_it" ON cant_make_it
  FOR ALL TO service_role
  USING (true);
