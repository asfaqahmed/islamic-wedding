import { Heart, Sparkles, Users } from 'lucide-react';

export default function StorySection() {
  return (
    <section
      id="story"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic font-bold text-islamic-navy mb-4">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-islamic-gold"></div>
            <Heart className="text-islamic-gold" fill="currentColor" size={24} />
            <div className="h-px w-20 bg-islamic-gold"></div>
          </div>
          <p className="text-lg text-islamic-navy/70 font-english italic max-w-2xl mx-auto">
            A journey blessed by Allah, guided by faith, and bound by love
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* First Meeting */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="w-20 h-20 rounded-full bg-islamic-gold/20 flex items-center justify-center">
                <Sparkles className="text-islamic-gold" size={32} />
              </div>
            </div>
            <div className="md:w-2/3 bg-islamic-cream/30 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-english font-semibold text-islamic-navy mb-3">
                The First Meeting
              </h3>
              <p className="text-islamic-navy/80 font-english leading-relaxed">
                Our paths first crossed at a community gathering in Colombo. It was a blessed occasion
                where families came together, and in that moment, we felt an instant connection.
                With the guidance of our families and our faith in Allah's plan, we began our journey
                of getting to know each other in a halal manner.
              </p>
            </div>
          </div>

          {/* The Proposal */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
            <div className="md:w-1/3 flex justify-center md:justify-start">
              <div className="w-20 h-20 rounded-full bg-islamic-teal/20 flex items-center justify-center">
                <Heart className="text-islamic-teal" size={32} fill="currentColor" />
              </div>
            </div>
            <div className="md:w-2/3 bg-islamic-cream/30 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-english font-semibold text-islamic-navy mb-3">
                The Proposal
              </h3>
              <p className="text-islamic-navy/80 font-english leading-relaxed">
                After months of getting to know each other with the blessings of our families,
                Ahmed formally proposed. With hearts full of love and faith, Zainab accepted.
                Together, we made dua to Allah to bless our union and guide us on this beautiful
                journey of marriage. Alhamdulillah for His blessings!
              </p>
            </div>
          </div>

          {/* Building Together */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="w-20 h-20 rounded-full bg-islamic-burgundy/20 flex items-center justify-center">
                <Users className="text-islamic-burgundy" size={32} />
              </div>
            </div>
            <div className="md:w-2/3 bg-islamic-cream/30 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-english font-semibold text-islamic-navy mb-3">
                Building Our Future
              </h3>
              <p className="text-islamic-navy/80 font-english leading-relaxed">
                As we prepare for our Nikah and Walima, we are excited to begin our life together
                as husband and wife. We are grateful for the love and support of our families and
                the Muslim community. Together, we look forward to building a home filled with faith,
                love, compassion, and devotion to Allah.
              </p>
            </div>
          </div>
        </div>

        {/* Hadith Quote */}
        <div className="max-w-3xl mx-auto mt-16 p-6 bg-islamic-gold/10 border-l-4 border-islamic-gold rounded-r-lg">
          <p className="text-lg font-english text-islamic-navy mb-2 italic">
            "When a man marries, he has fulfilled half of his religion, so let him fear Allah
            regarding the remaining half."
          </p>
          <p className="text-sm font-english text-islamic-navy/70">
            - Prophet Muhammad (peace be upon him)
          </p>
        </div>
      </div>
    </section>
  );
}
