import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
      // Check if admin is logged in and session is still valid
      const isLoggedIn = localStorage.getItem('wedding_admin_logged_in');
      const loginTime = localStorage.getItem('wedding_admin_login_time');

      if (!isLoggedIn || isLoggedIn !== 'true' || !loginTime) {
        navigate('/login');
        return;
      }

      const currentTime = Date.now();
      const timeDiff = currentTime - parseInt(loginTime);
      const hoursElapsed = timeDiff / (1000 * 60 * 60);

      // Session valid for 24 hours
      if (hoursElapsed >= 24) {
        // Session expired, clear storage and redirect
        localStorage.removeItem('wedding_admin_logged_in');
        localStorage.removeItem('wedding_admin_login_time');
        navigate('/login');
        return;
      }

      // Minimum loading time for smooth animation
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsLoading(false);
    };

    loadPage();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('wedding_admin_logged_in');
    localStorage.removeItem('wedding_admin_login_time');
    navigate('/');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-islamic-navy text-white py-4 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-arabic font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-islamic-burgundy hover:bg-islamic-burgundy/80 rounded-lg font-english transition-colors"
        >
          Logout
        </button>
      </div>
      <AdminDashboard />
    </div>
  );
}
