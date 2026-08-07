import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'both',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Client-side validation with specific messages
    if (!formData.name.trim()) {
      setError('Please enter a display name.');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    setLoading(true);
    try {
      const user = await register(formData);
      navigate(formData.accountType === 'creator' ? '/creator' : '/home');
    } catch (err) {
      // Map backend errors to user-friendly messages
      const serverMsg = err.response?.data?.message;
      if (serverMsg?.includes('already registered') || serverMsg?.includes('already exists')) {
        setError('An account with this email already exists. Try signing in instead.');
      } else if (serverMsg?.includes('password')) {
        setError('Password must be at least 8 characters long.');
      } else if (serverMsg) {
        setError(serverMsg);
      } else {
        setError('Something went wrong. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-redd-600 rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg">A</span>
          </div>
          <span className="font-display font-bold text-2xl">
            <span className="text-redd-500">Alaeze</span>
          </span>
        </Link>

        <div className="card p-8">
          <h1 className="text-2xl font-display font-bold text-center mb-2">
            Join Alaeze
          </h1>
          <p className="text-dark-400 text-center mb-8">
            Stream and create bold, independent content
          </p>

          {error && (
            <div className="bg-redd-600/10 border border-redd-600/30 text-redd-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                Display Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Your display name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-11"
                  placeholder="At least 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pr-11"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Account Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                I want to...
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-dark-900 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'viewer' })}
                  className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                    formData.accountType === 'viewer'
                      ? 'bg-redd-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  Watch
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'creator' })}
                  className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                    formData.accountType === 'creator'
                      ? 'bg-redd-600 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accountType: 'both' })}
                  className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                    formData.accountType === 'both'
                      ? 'bg-gradient-to-r from-redd-600 to-gold-500 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  Both
                </button>
              </div>
              <p className="text-dark-500 text-xs mt-2">
                {formData.accountType === 'viewer' && 'Stream content from independent creators.'}
                {formData.accountType === 'creator' && 'Upload and monetize your content.'}
                {formData.accountType === 'both' && 'Stream and create — switch seamlessly between modes.'}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-dark-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-redd-400 hover:text-redd-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
