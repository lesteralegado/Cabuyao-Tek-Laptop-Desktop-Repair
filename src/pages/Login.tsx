import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
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
    <div className="min-h-screen page-surface flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 card-surface p-6 sm:p-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <p className="eyebrow mb-2">Cabuyao Tek / Service desk</p>
          <h1 className="display-heading text-3xl font-extrabold text-[#142825] mb-4">Staff sign in</h1>
          <p className="text-sm text-gray-500 mb-8">
            Sign in to manage repair requests and monitor service activity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="staff-email" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address</span>
            </label>
            <input
              id="staff-email"
              type="email"
              autoComplete="username"
              placeholder="staff@example.com"
              className="field-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="staff-password" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                id="staff-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                className="field-control pr-14"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div role="alert" className="p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium text-center border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-lg"
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
          <Link to="/" className="inline-block mt-4 text-sm font-semibold text-blue-700 hover:underline">Back to website</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
