import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Header({ isAdmin, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="text-islamic-gold" fill="currentColor" size={28} />
            <span className="text-2xl font-arabic font-bold text-islamic-navy">
              Nikah & Walima
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('welcome')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection('rsvp')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              RSVP
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('wishes')}
              className="text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Wishes
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={() => scrollToSection('admin')}
                  className="text-islamic-burgundy hover:text-islamic-gold transition-colors font-english font-semibold"
                >
                  Admin
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-islamic-burgundy text-white rounded-lg hover:bg-islamic-navy transition-colors font-english"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-islamic-navy"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('welcome')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection('rsvp')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              RSVP
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('wishes')}
              className="text-left py-2 text-islamic-navy hover:text-islamic-gold transition-colors font-english"
            >
              Wishes
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={() => scrollToSection('admin')}
                  className="text-left py-2 text-islamic-burgundy hover:text-islamic-gold transition-colors font-english font-semibold"
                >
                  Admin
                </button>
                <button
                  onClick={onLogout}
                  className="text-left py-2 px-4 bg-islamic-burgundy text-white rounded-lg hover:bg-islamic-navy transition-colors font-english"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
