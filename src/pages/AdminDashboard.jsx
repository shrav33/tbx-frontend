import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Gift, LogOut, Trash2, Eye, X, Users, Package, Calendar, ChevronDown, Search } from 'lucide-react';

const categoryColors = {
  'Employee Onboarding Kits':    { bg: '#FFF7ED', text: '#C2410C', border: 'rgba(194,65,12,0.2)' },
  'Festive & Seasonal Hampers':  { bg: '#FFFBEB', text: '#B45309', border: 'rgba(180,83,9,0.2)' },
  'Executive Gifts':             { bg: '#FAF7F2', text: '#1A1A1D', border: 'rgba(212,176,106,0.4)' },
  'Premium Leather Collection':  { bg: '#FDF4E7', text: '#92400E', border: 'rgba(146,64,14,0.2)' },
  'Branded Merchandise':         { bg: '#F0FDF4', text: '#166534', border: 'rgba(22,101,52,0.2)' },
  'Custom Corporate Gift Boxes': { bg: '#FFF1F2', text: '#9F1239', border: 'rgba(159,18,57,0.2)' },
};

const giftCategories = [
  'Employee Onboarding Kits', 'Festive & Seasonal Hampers', 'Executive Gifts',
  'Premium Leather Collection', 'Branded Merchandise', 'Custom Corporate Gift Boxes',
];

export default function AdminDashboard() {
  const [quotes, setQuotes]            = useState([]);
  const [loading, setLoading]          = useState(true);
  const [selected, setSelected]        = useState(null);
  const [deleteConfirm, setDeleteConf] = useState(null);
  const [search, setSearch]            = useState('');
  const [filterGift, setFilterGift]    = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchQuotes();
  }, []); // eslint-disable-line

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/quotes', { headers: { Authorization: `Bearer ${token}` } });
      setQuotes(res.data.data);
    } catch (err) {
      if ([401, 403].includes(err.response?.status)) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      } else toast.error('Failed to load quotes.');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setQuotes((p) => p.filter((q) => q._id !== id));
      setDeleteConf(null);
      if (selected?._id === id) setSelected(null);
      toast.success('Quote deleted.');
    } catch { toast.error('Failed to delete.'); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const filtered = quotes.filter((q) => {
    const s = search.toLowerCase();
    const matchS = q.fullName.toLowerCase().includes(s) || q.companyName.toLowerCase().includes(s) || q.email.toLowerCase().includes(s);
    return matchS && (filterGift ? q.selectedGift === filterGift : true);
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Topbar ───────────────────────────── */}
      <header className="bg-white sticky top-0 z-40" style={{ borderBottom: '1px solid rgba(26,26,29,0.09)' }}>
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: '#1A1A1D' }}>
              <Gift size={17} style={{ color: '#FF9E35' }} />
            </div>
            <div>
              <p className="font-display font-bold text-sm" style={{ color: '#1A1A1D' }}>GiftCraft Admin</p>
              <p className="text-xs" style={{ color: '#AAAAAA', letterSpacing: '0.08em' }}>Dashboard</p>
            </div>
          </div>
          <button
            id="admin-logout-btn"
            onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }}
            className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: '#888888' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E67722'}
            onMouseLeave={e => e.currentTarget.style.color = '#888888'}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Stats ────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {[
            { icon: Users,    label: 'Total Requests', val: quotes.length,                                                accent: '#FF9E35' },
            { icon: Package,  label: 'Total Quantity',  val: quotes.reduce((a, q) => a + q.quantity, 0).toLocaleString(), accent: '#E67722' },
            { icon: Calendar, label: 'Latest Request',  val: quotes[0] ? formatDate(quotes[0].createdAt) : '—',           accent: '#D4B06A' },
          ].map(({ icon: Icon, label, val, accent }) => (
            <div key={label} className="bg-white flex items-center gap-4 p-5"
                 style={{ border: '1px solid rgba(26,26,29,0.09)' }}>
              <div className="w-11 h-11 flex items-center justify-center shrink-0"
                   style={{ backgroundColor: '#FAF7F2', border: `1px solid ${accent}30` }}>
                <Icon size={19} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase mb-0.5" style={{ color: '#AAAAAA', letterSpacing: '0.12em' }}>
                  {label}
                </p>
                <p className="font-display text-2xl font-bold" style={{ color: '#1A1A1D' }}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ──────────────────────────── */}
        <div className="bg-white flex flex-col sm:flex-row gap-3 p-4 mb-5"
             style={{ border: '1px solid rgba(26,26,29,0.09)' }}>
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#AAAAAA' }} />
            <input
              id="admin-search" type="text"
              placeholder="Search by name, company, or email…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-9 py-2.5 text-sm"
            />
          </div>
          <div className="relative">
            <select
              id="admin-filter-gift" value={filterGift}
              onChange={(e) => setFilterGift(e.target.value)}
              className="form-input text-sm py-2.5 pr-8 appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="">All Categories</option>
              {giftCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                         style={{ color: '#AAAAAA' }} />
          </div>
        </div>

        {/* ── Table ────────────────────────────── */}
        <div className="bg-white" style={{ border: '1px solid rgba(26,26,29,0.09)' }}>
          {/* Table header bar */}
          <div className="px-6 py-4 flex items-center justify-between"
               style={{ borderBottom: '1px solid rgba(26,26,29,0.09)' }}>
            <h2 className="font-display text-lg font-bold" style={{ color: '#1A1A1D' }}>
              Quote Requests
              <span className="font-sans text-sm font-normal ml-2" style={{ color: '#AAAAAA' }}>
                ({filtered.length})
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-2 rounded-full animate-spin"
                   style={{ borderColor: 'rgba(255,158,53,0.2)', borderTopColor: '#FF9E35' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Package size={36} className="mx-auto mb-3" style={{ color: '#D4B06A', opacity: 0.4 }} />
              <p className="text-sm font-semibold" style={{ color: '#AAAAAA' }}>No quote requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(26,26,29,0.07)', backgroundColor: '#FAF7F2' }}>
                    {['Customer', 'Company', 'Gift Category', 'Qty', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase"
                          style={{ color: '#AAAAAA', letterSpacing: '0.12em' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <tr
                      key={q._id}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(26,26,29,0.06)' : 'none' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold" style={{ color: '#1A1A1D' }}>{q.fullName}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#AAAAAA' }}>{q.email}</p>
                      </td>
                      <td className="px-6 py-4" style={{ color: '#555555' }}>{q.companyName}</td>
                      <td className="px-6 py-4">
                        {(() => {
                          const c = categoryColors[q.selectedGift] || { bg: '#FAF7F2', text: '#1A1A1D', border: 'rgba(26,26,29,0.15)' };
                          return (
                            <span className="px-2.5 py-1 text-xs font-semibold uppercase"
                                  style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`, letterSpacing: '0.06em' }}>
                              {q.selectedGift}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 font-semibold" style={{ color: '#1A1A1D', fontVariantNumeric: 'tabular-nums' }}>
                        {q.quantity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-xs whitespace-nowrap" style={{ color: '#AAAAAA' }}>
                        {formatDate(q.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            id={`view-btn-${q._id}`}
                            onClick={() => setSelected(q)}
                            className="w-8 h-8 flex items-center justify-center transition-all duration-150"
                            style={{ border: '1px solid rgba(26,26,29,0.15)', color: '#888888' }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FF9E35'; e.currentTarget.style.borderColor = '#FF9E35'; e.currentTarget.style.color = '#1A1A1D'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(26,26,29,0.15)'; e.currentTarget.style.color = '#888888'; }}
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            id={`delete-btn-${q._id}`}
                            onClick={() => setDeleteConf(q)}
                            className="w-8 h-8 flex items-center justify-center transition-all duration-150"
                            style={{ border: '1px solid rgba(26,26,29,0.15)', color: '#888888' }}
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E67722'; e.currentTarget.style.borderColor = '#E67722'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(26,26,29,0.15)'; e.currentTarget.style.color = '#888888'; }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ── Detail Modal ─────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: 'rgba(26,26,29,0.5)' }}
             onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-lg p-8 relative"
               style={{ border: '1px solid rgba(26,26,29,0.12)' }}
               onClick={(e) => e.stopPropagation()}>
            <button
              id="close-detail-modal"
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 transition-colors duration-150"
              style={{ color: '#AAAAAA' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1A1A1D'}
              onMouseLeave={e => e.currentTarget.style.color = '#AAAAAA'}
            >
              <X size={18} />
            </button>

            <p className="section-label mb-2">Quote Request</p>
            <h3 className="font-display text-2xl font-bold mb-6" style={{ color: '#1A1A1D' }}>
              {selected.fullName}
            </h3>

            <div className="space-y-0">
              {[
                { label: 'Company',       value: selected.companyName },
                { label: 'Email',         value: selected.email },
                { label: 'Phone',         value: selected.phone },
                { label: 'Gift Category', value: selected.selectedGift },
                { label: 'Quantity',      value: `${selected.quantity.toLocaleString()} units` },
                { label: 'Submitted On',  value: formatDate(selected.createdAt) },
                ...(selected.additionalRequirements
                  ? [{ label: 'Additional', value: selected.additionalRequirements }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-6 py-3"
                     style={{ borderBottom: '1px solid rgba(26,26,29,0.07)' }}>
                  <span className="text-xs font-semibold uppercase min-w-[120px] shrink-0 pt-0.5"
                        style={{ color: '#AAAAAA', letterSpacing: '0.1em' }}>
                    {label}
                  </span>
                  <span className="text-sm" style={{ color: '#1A1A1D', lineHeight: '1.6' }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setDeleteConf(selected)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-150"
                style={{ border: '1px solid rgba(26,26,29,0.15)', color: '#888888' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E67722'; e.currentTarget.style.borderColor = '#E67722'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(26,26,29,0.15)'; e.currentTarget.style.color = '#888888'; }}
              >
                <Trash2 size={13} /> Delete Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ───────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: 'rgba(26,26,29,0.5)' }}>
          <div className="bg-white w-full max-w-sm p-8 text-center"
               style={{ border: '1px solid rgba(26,26,29,0.12)' }}>
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center"
                 style={{ backgroundColor: '#FFF1F2', border: '1px solid rgba(230,119,34,0.2)' }}>
              <Trash2 size={22} style={{ color: '#E67722' }} />
            </div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#1A1A1D' }}>Delete Request?</h3>
            <p className="text-sm mb-7" style={{ color: '#888888', lineHeight: '1.7' }}>
              This will permanently delete the request from{' '}
              <strong style={{ color: '#1A1A1D' }}>{deleteConfirm.fullName}</strong>{' '}
              ({deleteConfirm.companyName}).
            </p>
            <div className="flex gap-3">
              <button
                id="cancel-delete-btn"
                onClick={() => setDeleteConf(null)}
                className="btn-outline flex-1 justify-center py-3 text-sm"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 py-3 text-sm font-semibold transition-all duration-150"
                style={{ backgroundColor: '#E67722', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C2410C'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E67722'}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
