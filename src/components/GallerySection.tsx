import { useState, useEffect } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Photo } from '../lib/supabase';

export default function GallerySection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploaderName, setUploaderName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // READ operation: Fetch photos from database
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE operation: Upload photos to storage and save metadata to database
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError('Please select at least one photo');
      return;
    }

    if (!uploaderName.trim()) {
      setUploadError('Please enter your name');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess(false);
    setUploadProgress('Preparing to upload...');

    let uploadedCount = 0;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        // Validate file
        if (!file.type.startsWith('image/')) {
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          continue; // Skip files larger than 5MB
        }

        setUploadProgress(`Uploading ${i + 1} of ${selectedFiles.length}...`);

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Storage
        // Try uploading first without upsert
        let { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type
          });

        // Retry with upsert if needed
        if (uploadError) {
          const { error: retryError } = await supabase.storage
            .from('photos')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.type
            });

          uploadError = retryError;
        }

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('photos')
          .getPublicUrl(filePath);

        // Save metadata to database
        const { data: photoData, error: dbError } = await supabase
          .from('photos')
          .insert([{
            filename: fileName,
            url: publicUrl,
            uploaded_by: uploaderName.trim(),
            approved: true // Auto-approve for immediate display
          }])
          .select();

        if (!dbError && photoData) {
          setPhotos(prev => [photoData[0], ...prev]);
        }

        uploadedCount++;
      }

      setUploadSuccess(true);
      setUploadProgress(`Successfully uploaded ${uploadedCount} photo(s)!`);

      // Reset form
      setSelectedFiles(null);
      setUploaderName('');
      setShowUploadForm(false);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadProgress('');
      }, 5000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload photos. Please try again.';
      setUploadError(errorMessage);
      setUploadProgress('');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-islamic-cream via-white to-islamic-gold/10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-islamic-navy mb-4">
            Photo Gallery
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <Camera className="text-islamic-gold" size={24} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <p className="text-lg text-islamic-navy/70 font-english italic max-w-2xl mx-auto mb-6">
            Share your favorite moments from our special day
          </p>

          {/* Upload Button */}
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            <Upload size={20} />
            {showUploadForm ? 'Cancel Upload' : 'Upload Photos'}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-white p-8 rounded-lg shadow-lg">
            {uploadSuccess && (
              <div className="mb-6 p-4 bg-islamic-emerald/20 border border-islamic-emerald rounded-lg flex items-start gap-3">
                <CheckCircle2 className="text-islamic-emerald mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-english font-semibold text-islamic-emerald">
                    Upload Successful!
                  </p>
                  <p className="font-english text-sm text-islamic-emerald/80">
                    {uploadProgress}
                  </p>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <p className="font-english text-red-700">{uploadError}</p>
              </div>
            )}

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label htmlFor="uploader_name" className="block font-english font-semibold text-islamic-navy mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="uploader_name"
                  required
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                  placeholder="Enter your name"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label htmlFor="photos" className="block font-english font-semibold text-islamic-navy mb-2">
                  Select Photos * (Max 5MB per file)
                </label>
                <input
                  type="file"
                  id="photos"
                  accept="image/*"
                  multiple
                  required
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                  disabled={isUploading}
                />
                <p className="text-sm text-islamic-navy/60 font-english mt-2">
                  You can select multiple images at once
                </p>
              </div>

              {isUploading && uploadProgress && (
                <div className="p-4 bg-islamic-gold/10 rounded-lg">
                  <p className="font-english text-islamic-navy">{uploadProgress}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-4 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  'Uploading...'
                ) : (
                  <>
                    <Upload size={20} />
                    Upload Photos
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Photo Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="font-english text-islamic-navy/70">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="mx-auto mb-4 text-islamic-navy/30" size={48} />
            <p className="font-english text-islamic-navy/70">
              No photos yet. Be the first to share a memory!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-islamic-cream/20"
              >
                <img
                  src={photo.url}
                  alt={`Photo by ${photo.uploaded_by || 'Guest'}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext fill="%23999" x="50" y="50" font-size="14" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-white font-english text-sm mb-2">
                    By: {photo.uploaded_by || 'Anonymous'}
                  </p>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white font-english text-sm hover:text-islamic-gold transition-colors"
                  >
                    <ExternalLink size={16} />
                    View Full Size
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
