import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
      // Check if already logged in
      const isLoggedIn = localStorage.getItem('wedding_admin_logged_in');
      const loginTime = localStorage.getItem('wedding_admin_login_time');

      if (isLoggedIn === 'true' && loginTime) {
        const currentTime = Date.now();
        const timeDiff = currentTime - parseInt(loginTime);
        const hoursElapsed = timeDiff / (1000 * 60 * 60);

        // Session valid for 24 hours
        if (hoursElapsed < 24) {
          navigate('/admin');
          return;
        }
      }

      // Minimum loading time for smooth animation
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsLoading(false);
    };

    loadPage();
  }, [navigate]);

  const handleLogin = () => {
    navigate('/admin');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <AdminLogin onLogin={handleLogin} />;
}
