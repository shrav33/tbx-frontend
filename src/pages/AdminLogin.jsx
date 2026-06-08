import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Gift, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm]             = useState({ username: '', password: '' });
  const [showPassword, setShowPwd]  = useState(false);
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { toast.error('Please enter credentials.'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', form);
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
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4"
         style={{ background: 'linear-gradient(160deg,#fffef9 0%,#fdf8ec 60%,#faf3d8 100%)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-gold mb-4 animate-float"
               style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
            <Gift size={28} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-charcoal-900">
            Gift<span className="text-gold">Craft</span> Admin
          </h1>
          <p className="text-charcoal-400 text-sm mt-1">Secure Administrator Portal</p>
        </div>

        <div className="card p-8 shadow-gold">
          <h2 className="font-display text-xl font-semibold text-charcoal-900 mb-1">Sign In</h2>
          <p className="text-charcoal-400 text-sm mb-6">Enter your admin credentials to continue.</p>

          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-username" className="form-label">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input id="admin-username" name="username" type="text" placeholder="admin"
                       value={form.username} onChange={handleChange}
                       className="form-input pl-10" autoComplete="username" />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="form-label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input id="admin-password" name="password" type={showPassword ? 'text' : 'password'}
                       placeholder="••••••••" value={form.password} onChange={handleChange}
                       className="form-input pl-10 pr-10" autoComplete="current-password" />
                <button type="button" id="toggle-password-btn"
                        onClick={() => setShowPwd(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-gold-600 transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="bg-gold-100 border border-gold-200 rounded-xl p-3 text-xs text-charcoal-600">
              Default: <strong>admin</strong> / <strong>admin@123</strong>
            </div>

            <button id="admin-login-btn" type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</>
                : 'Sign In to Dashboard'
              }
            </button>
          </form>
          <p className="text-center text-charcoal-400 text-xs mt-5">Protected area — authorised personnel only.</p>
        </div>

        <p className="text-center text-charcoal-400 text-sm mt-5">
          Not an admin? <a href="/" className="text-gold-600 hover:underline">Go to Website</a>
        </p>
      </div>
    </div>
  );
}
