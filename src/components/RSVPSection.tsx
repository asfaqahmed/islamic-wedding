import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guest_count: 1,
    meal_preference: 'halal' as 'halal' | 'vegetarian' | 'kids' | 'special',
    will_attend: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // CREATE operation: Insert RSVP into database
      const { error } = await supabase
        .from('rsvps')
        .insert([formData]);

      if (error) throw error;

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        guest_count: 1,
        meal_preference: 'halal',
        will_attend: true,
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-islamic-navy mb-4">
            RSVP
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <CheckCircle2 className="text-islamic-gold" size={24} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <p className="text-lg text-islamic-navy/70 font-english italic max-w-2xl mx-auto">
            Kindly confirm your attendance by filling out the form below.
            Your presence would be a great honor to us.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {showSuccess && (
            <div className="mb-6 p-4 bg-islamic-emerald/20 border border-islamic-emerald rounded-lg flex items-start gap-3">
              <CheckCircle2 className="text-islamic-emerald mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="font-english font-semibold text-islamic-emerald">
                  RSVP Submitted Successfully!
                </p>
                <p className="font-english text-sm text-islamic-emerald/80">
                  Thank you for confirming your attendance. We look forward to celebrating with you!
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="font-english text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-islamic-cream/30 p-8 rounded-lg shadow-lg space-y-6">
            {/* Will Attend */}
            <div>
              <label className="block font-english font-semibold text-islamic-navy mb-3">
                Will you be attending? *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="will_attend"
                    checked={formData.will_attend === true}
                    onChange={() => setFormData({ ...formData, will_attend: true })}
                    className="w-4 h-4 text-islamic-gold"
                  />
                  <span className="font-english text-islamic-navy">
                    Yes, I will attend
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="will_attend"
                    checked={formData.will_attend === false}
                    onChange={() => setFormData({ ...formData, will_attend: false })}
                    className="w-4 h-4 text-islamic-gold"
                  />
                  <span className="font-english text-islamic-navy">
                    No, I cannot attend
                  </span>
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-english font-semibold text-islamic-navy mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-english font-semibold text-islamic-navy mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-english font-semibold text-islamic-navy mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
                placeholder="+94 XX XXX XXXX"
              />
            </div>

            {/* Guest Count */}
            <div>
              <label htmlFor="guest_count" className="block font-english font-semibold text-islamic-navy mb-2">
                Number of Guests *
              </label>
              <select
                id="guest_count"
                required
                value={formData.guest_count}
                onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Meal Preference */}
            <div>
              <label htmlFor="meal_preference" className="block font-english font-semibold text-islamic-navy mb-2">
                Meal Preference *
              </label>
              <select
                id="meal_preference"
                required
                value={formData.meal_preference}
                onChange={(e) => setFormData({ ...formData, meal_preference: e.target.value as any })}
                className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
              >
                <option value="halal">Halal (Standard)</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="kids">Kids Meal</option>
                <option value="special">Special Requirements</option>
              </select>
            </div>

            {/* Submit Button */}
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
                  Submit RSVP
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 font-english text-sm text-islamic-navy/60">
            * Required fields
          </p>
        </div>
      </div>
    </section>
  );
}
