import { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple authentication (credentials: admin / muslim2025)
    if (username === 'admin' && password === 'muslim2025') {
      // Store login info in localStorage
      localStorage.setItem('wedding_admin_logged_in', 'true');
      localStorage.setItem('wedding_admin_login_time', Date.now().toString());
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-islamic-cream via-white to-islamic-gold/10 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-islamic-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-islamic-gold" size={32} />
          </div>
          <h2 className="text-3xl font-arabic font-bold text-islamic-navy mb-2">
            Admin Login
          </h2>
          <p className="text-islamic-navy/70 font-english">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="font-english text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="username" className="block font-english font-semibold text-islamic-navy mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-english font-semibold text-islamic-navy mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-islamic-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold font-english"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-islamic-gold to-islamic-teal text-white font-english font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-islamic-navy/60 font-english">
          Default credentials: admin / muslim2025
        </p>
      </div>
    </div>
  );
}
