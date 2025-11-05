-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to read photos
CREATE POLICY "Public can read photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

-- Allow authenticated and anonymous users to upload photos
CREATE POLICY "Anyone can upload photos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'photos');

-- Allow service role full access
CREATE POLICY "Service role can manage photos"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'photos');
