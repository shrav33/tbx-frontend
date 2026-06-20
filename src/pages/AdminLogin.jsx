import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Gift, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm]            = useState({ username: '', password: '' });
  const [showPassword, setShowPwd] = useState(false);
  const [loading, setLoading]      = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { toast.error('Please enter credentials.'); return; }
    setLoading(true);
    try {
      const res = await api.post('/api/admin/login', form);
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="w-14 h-14 mx-auto flex items-center justify-center mb-5"
            style={{ backgroundColor: '#1A1A1D' }}
          >
            <Gift size={26} style={{ color: '#FF9E35' }} />
          </div>
          <h1 className="font-display text-3xl font-bold" style={{ color: '#1A1A1D', letterSpacing: '-0.02em' }}>
            GiftCraft
          </h1>
          <p className="text-xs font-semibold uppercase mt-2" style={{ color: '#E67722', letterSpacing: '0.22em' }}>
            Administrator Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8" style={{ border: '1px solid rgba(26,26,29,0.09)' }}>
          <h2 className="font-display text-xl font-bold mb-1" style={{ color: '#1A1A1D' }}>Sign In</h2>
          <p className="text-sm mb-7" style={{ color: '#888888', lineHeight: '1.6' }}>
            Enter your admin credentials to continue.
          </p>

          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label htmlFor="admin-username" className="form-label">Username</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: '#D4B06A' }} />
                <input
                  id="admin-username" name="username" type="text" placeholder="admin"
                  value={form.username} onChange={handleChange}
                  className="form-input pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="form-label">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: '#D4B06A' }} />
                <input
                  id="admin-password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" value={form.password} onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button" id="toggle-password-btn"
                  onClick={() => setShowPwd(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: '#AAAAAA' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E67722'}
                  onMouseLeave={e => e.currentTarget.style.color = '#AAAAAA'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Hint */}
            <div className="px-4 py-3 text-xs" style={{ backgroundColor: '#FAF7F2', border: '1px solid rgba(212,176,106,0.35)' }}>
              <span style={{ color: '#888888' }}>Default: </span>
              <strong style={{ color: '#1A1A1D' }}>admin</strong>
              <span style={{ color: '#888888' }}> / </span>
              <strong style={{ color: '#1A1A1D' }}>admin@123</strong>
            </div>

            {/* Submit */}
            <button
              id="admin-login-btn" type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{ borderColor: 'rgba(26,26,29,0.2)', borderTopColor: '#1A1A1D' }} />
                  Signing in…
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#BBBBBB' }}>
            Protected area — authorised personnel only.
          </p>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: '#888888' }}>
          Not an admin?{' '}
          <a href="/" style={{ color: '#E67722', fontWeight: 600 }}
             onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
             onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            Go to Website
          </a>
        </p>
      </div>
    </div>
  );
}
