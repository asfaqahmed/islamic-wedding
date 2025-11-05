import { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function CantMakeItSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // CREATE operation: Insert cant_make_it entry into database
      const { error } = await supabase
        .from('cant_make_it')
        .insert([formData]);

      if (error) throw error;

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-islamic-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-arabic font-bold text-islamic-navy mb-4">
              Can't Make It?
            </h3>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-islamic-gold"></div>
              <Heart className="text-islamic-gold" fill="currentColor" size={20} />
              <div className="h-px w-16 bg-islamic-gold"></div>
            </div>
            <p className="text-base text-islamic-navy/70 font-english italic">
              If you're unable to attend, we'd still love to hear from you.
              Send us your blessings and well-wishes!
            </p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-islamic-emerald/20 border border-islamic-emerald rounded-lg flex items-start gap-3">
              <Heart className="text-islamic-emerald mt-1 flex-shrink-0" fill="currentColor" size={20} />
              <div>
                <p className="font-english font-semibold text-islamic-emerald">
                  Message Sent Successfully!
                </p>
                <p className="font-english text-sm text-islamic-emerald/80">
                  Thank you for your kind words and blessings. May Allah bless you too!
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="font-english text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="cant_name" className="block font-english font-semibold text-islamic-navy mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="cant_name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="cant_email" className="block font-english font-semibold text-islamic-navy mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="cant_email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="cant_message" className="block font-english font-semibold text-islamic-navy mb-2">
                Your Message (Optional)
              </label>
              <textarea
                id="cant_message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english resize-none"
                placeholder="Share your blessings and well-wishes..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-islamic-burgundy to-islamic-navy text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send size={20} />
                  Send Blessings
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
