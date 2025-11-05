import { Heart, Calendar, MapPin } from 'lucide-react';

export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-cream via-white to-islamic-gold/10 pt-20"
    >
      <div className="container mx-auto px-4 py-20 text-center">
        {/* Bismillah */}
        <div className="mb-8 animate-fade-in">
          <p className="text-2xl md:text-3xl font-arabic text-islamic-gold mb-2">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="text-sm md:text-base text-islamic-navy/70 font-english italic">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-arabic font-bold text-islamic-navy mb-4">
            Nikah & Walima
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <Heart className="text-islamic-gold" fill="currentColor" size={32} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-english text-islamic-burgundy mb-2">
            Ahmed & Zainab
          </h2>
          <p className="text-xl md:text-2xl font-arabic text-islamic-teal">
            أحمد و زينب
          </p>
        </div>

        {/* Islamic Quote */}
        <div className="max-w-3xl mx-auto mb-12 p-6 bg-white/50 rounded-lg shadow-lg animate-fade-in">
          <p className="text-lg md:text-xl font-arabic text-islamic-navy mb-3 leading-relaxed">
            "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
          </p>
          <p className="text-sm md:text-base font-english text-islamic-navy/80 italic leading-relaxed">
            "And among His signs is that He created for you mates from among yourselves
            that you may dwell in tranquility with them, and He has put love and mercy between you."
          </p>
          <p className="text-sm font-english text-islamic-gold mt-2">
            - Quran 30:21
          </p>
        </div>

        {/* Event Details */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <div className="flex items-center gap-3 bg-white/70 px-6 py-4 rounded-lg shadow-md">
            <Calendar className="text-islamic-gold" size={24} />
            <div className="text-left">
              <p className="text-sm text-islamic-navy/70 font-english">Date</p>
              <p className="text-lg font-english font-semibold text-islamic-navy">
                March 15, 2025
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/70 px-6 py-4 rounded-lg shadow-md">
            <MapPin className="text-islamic-gold" size={24} />
            <div className="text-left">
              <p className="text-sm text-islamic-navy/70 font-english">Location</p>
              <p className="text-lg font-english font-semibold text-islamic-navy">
                Colombo, Sri Lanka
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-islamic-gold rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-islamic-gold rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
