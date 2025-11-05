import { useState, useEffect } from 'react';
import { MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Wish } from '../lib/supabase';
import { format } from 'date-fns';

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showWishForm, setShowWishForm] = useState(false);
  const [wishForm, setWishForm] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // READ operation: Fetch approved wishes from database
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  // CREATE operation: Insert new wish into database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error } = await supabase
        .from('wishes')
        .insert([{
          name: wishForm.name.trim(),
          message: wishForm.message.trim(),
          approved: false // Pending admin approval
        }]);

      if (error) throw error;

      setShowSuccess(true);
      setWishForm({ name: '', message: '' });
      setShowWishForm(false);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCardColor = (index: number) => {
    const colors = [
      'border-islamic-gold',
      'border-islamic-teal',
      'border-islamic-burgundy',
      'border-islamic-emerald',
      'border-islamic-navy',
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      id="wishes"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-islamic-navy mb-4">
            Wedding Wishes
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <MessageCircle className="text-islamic-gold" size={24} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <p className="text-lg text-islamic-navy/70 font-english italic max-w-2xl mx-auto mb-6">
            Share your blessings and well-wishes for the couple
          </p>

          <button
            onClick={() => setShowWishForm(!showWishForm)}
            className="px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            <MessageCircle size={20} />
            {showWishForm ? 'Cancel' : 'Write a Wish'}
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-2xl mx-auto mb-12 p-4 bg-islamic-emerald/20 border border-islamic-emerald rounded-lg flex items-start gap-3">
            <CheckCircle2 className="text-islamic-emerald mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-english font-semibold text-islamic-emerald">
                Wish Submitted Successfully!
              </p>
              <p className="font-english text-sm text-islamic-emerald/80">
                Your wish is pending approval and will appear soon. Jazakallah Khair!
              </p>
            </div>
          </div>
        )}

        {/* Wish Form */}
        {showWishForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-islamic-cream/30 p-8 rounded-lg shadow-lg">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
                <p className="font-english text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="wish_name" className="block font-english font-semibold text-islamic-navy mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="wish_name"
                  required
                  value={wishForm.name}
                  onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="wish_message" className="block font-english font-semibold text-islamic-navy mb-2">
                  Your Wish *
                </label>
                <textarea
                  id="wish_message"
                  rows={5}
                  required
                  value={wishForm.message}
                  onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english resize-none"
                  placeholder="Share your blessings and well-wishes..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send size={20} />
                    Submit Wish
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Wishes Display */}
        {wishes.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="mx-auto mb-4 text-islamic-navy/30" size={48} />
            <p className="font-english text-islamic-navy/70">
              No wishes yet. Be the first to share your blessings!
            </p>
          </div>
        ) : (
          <>
            {/* Wishes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {wishes.slice(0, 6).map((wish, index) => (
                <div
                  key={wish.id}
                  className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${getCardColor(index)} hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MessageCircle className="text-islamic-gold mt-1 flex-shrink-0" size={20} />
                    <div className="flex-1">
                      <h4 className="font-english font-semibold text-islamic-navy">
                        {wish.name}
                      </h4>
                      <p className="text-xs text-islamic-navy/50 font-english">
                        {format(new Date(wish.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className="font-english text-islamic-navy/80 leading-relaxed">
                    "{wish.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Marquee for additional wishes */}
            {wishes.length > 6 && (
              <div className="relative overflow-hidden bg-islamic-cream/30 py-6 rounded-lg">
                <div className="flex gap-6 animate-marquee">
                  {[...wishes.slice(6), ...wishes.slice(6)].map((wish, index) => (
                    <div
                      key={`${wish.id}-${index}`}
                      className="flex-shrink-0 w-80 bg-white p-4 rounded-lg shadow-md border-l-4 border-islamic-teal"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <MessageCircle className="text-islamic-gold flex-shrink-0" size={16} />
                        <h4 className="font-english font-semibold text-islamic-navy text-sm">
                          {wish.name}
                        </h4>
                      </div>
                      <p className="font-english text-sm text-islamic-navy/80 line-clamp-3">
                        "{wish.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
