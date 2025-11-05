import { useState, useEffect } from 'react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import StorySection from './components/StorySection';
import EventsSection from './components/EventsSection';
import RSVPSection from './components/RSVPSection';
import CantMakeItSection from './components/CantMakeItSection';
import GallerySection from './components/GallerySection';
import WishesSection from './components/WishesSection';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    // Check if admin is logged in and session is still valid
    const isLoggedIn = localStorage.getItem('wedding_admin_logged_in');
    const loginTime = localStorage.getItem('wedding_admin_login_time');

    if (isLoggedIn === 'true' && loginTime) {
      const currentTime = Date.now();
      const timeDiff = currentTime - parseInt(loginTime);
      const hoursElapsed = timeDiff / (1000 * 60 * 60);

      // Session valid for 24 hours
      if (hoursElapsed < 24) {
        setIsAdmin(true);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('wedding_admin_logged_in');
        localStorage.removeItem('wedding_admin_login_time');
      }
    }

    // Check for admin login trigger in URL
    if (window.location.hash === '#admin-login') {
      setShowAdminLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    window.location.hash = '';
  };

  const handleLogout = () => {
    localStorage.removeItem('wedding_admin_logged_in');
    localStorage.removeItem('wedding_admin_login_time');
    setIsAdmin(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showAdminLogin && !isAdmin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header isAdmin={isAdmin} onLogout={handleLogout} />
      <main>
        <WelcomeSection />
        <StorySection />
        <EventsSection />
        <RSVPSection />
        <CantMakeItSection />
        <GallerySection />
        <WishesSection />
        {isAdmin && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-islamic-navy text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-arabic text-2xl mb-2">
            بارك الله لهما وبارك عليهما وجمع بينهما في خير
          </p>
          <p className="font-english text-sm mb-4 italic">
            May Allah bless them both and unite them in goodness
          </p>
          <div className="h-px w-32 bg-islamic-gold mx-auto mb-4"></div>
          <p className="font-english text-sm text-white/70">
            Ahmed & Zainab | March 15, 2025 | Colombo, Sri Lanka
          </p>
          <p className="font-english text-xs text-white/50 mt-4">
            <button
              onClick={() => setShowAdminLogin(true)}
              className="hover:text-islamic-gold transition-colors"
            >
              Admin Access
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
