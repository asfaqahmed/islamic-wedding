import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function EventsSection() {
  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-islamic-cream via-white to-islamic-gold/10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-islamic-navy mb-4">
            Wedding Events
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <Calendar className="text-islamic-gold" size={24} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <p className="text-lg text-islamic-navy/70 font-english italic">
            Join us in celebrating our special day
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Nikah Ceremony */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border-t-4 border-islamic-gold hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-islamic-gold to-islamic-teal p-6">
              <h3 className="text-3xl font-arabic font-bold text-white mb-2">
                Nikah Ceremony
              </h3>
              <p className="text-white/90 font-english">
                نكاح
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="text-islamic-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Date</p>
                  <p className="font-english text-islamic-navy/70">Friday, March 14, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-islamic-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Time</p>
                  <p className="font-english text-islamic-navy/70">10:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-islamic-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Venue</p>
                  <p className="font-english text-islamic-navy/70">
                    Grand Mosque<br />
                    Colombo 7, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-islamic-gold mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Attire</p>
                  <p className="font-english text-islamic-navy/70">
                    Traditional Islamic dress (Modest attire required)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-islamic-cream/50 rounded-lg">
                <p className="font-english text-sm text-islamic-navy/80 leading-relaxed">
                  The Nikah ceremony will be an intimate gathering where the marriage contract
                  will be solemnized in the presence of family, close friends, and witnesses.
                  Please arrive on time as the ceremony will begin promptly.
                </p>
              </div>
            </div>
          </div>

          {/* Walima Reception */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border-t-4 border-islamic-burgundy hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-islamic-burgundy to-islamic-navy p-6">
              <h3 className="text-3xl font-arabic font-bold text-white mb-2">
                Walima Reception
              </h3>
              <p className="text-white/90 font-english">
                وليمة
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="text-islamic-burgundy mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Date</p>
                  <p className="font-english text-islamic-navy/70">Saturday, March 15, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-islamic-burgundy mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Time</p>
                  <p className="font-english text-islamic-navy/70">6:00 PM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-islamic-burgundy mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Venue</p>
                  <p className="font-english text-islamic-navy/70">
                    Cinnamon Grand Hotel<br />
                    77 Galle Road, Colombo 3, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-islamic-burgundy mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-english font-semibold text-islamic-navy">Attire</p>
                  <p className="font-english text-islamic-navy/70">
                    Formal/Traditional (Men: Suit or Thawb, Women: Elegant modest dress)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-islamic-cream/50 rounded-lg">
                <p className="font-english text-sm text-islamic-navy/80 leading-relaxed">
                  Join us for a grand celebration with dinner, music, and festivities.
                  The evening will include traditional Sri Lankan Muslim cuisine and
                  entertainment for all our guests. Your presence will make our day complete!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border-l-4 border-islamic-gold">
          <h4 className="text-xl font-english font-semibold text-islamic-navy mb-4">
            Important Information
          </h4>
          <ul className="space-y-2 font-english text-islamic-navy/80">
            <li className="flex items-start gap-2">
              <span className="text-islamic-gold mt-1">•</span>
              <span>Please confirm your attendance by submitting the RSVP form below</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-gold mt-1">•</span>
              <span>Parking is available at both venues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-gold mt-1">•</span>
              <span>For any queries, please contact us through the provided details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-islamic-gold mt-1">•</span>
              <span>Gender-segregated seating will be available at both events</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
