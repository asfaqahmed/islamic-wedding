-- Update storage bucket configuration for file size and type restrictions
UPDATE storage.buckets
SET
  file_size_limit = 5242880, -- 5MB in bytes
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
WHERE id = 'photos';
