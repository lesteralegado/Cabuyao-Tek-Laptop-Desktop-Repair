import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signIn } from '../services/authService';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect authenticated users away from login page
  React.useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email.');
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      setIsLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // AuthContext handles the state update and redirection
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      // Handle Supabase Auth errors
      if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Invalid email or password.');
      } else {
        setError('We couldn\'t sign you in right now. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Cabuyao Tek</h1>
          <h2 className="text-xl font-semibold text-gray-600 mb-6">Staff Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to manage repair requests and monitor service activity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              placeholder="staff@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-400 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Authorized staff only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
