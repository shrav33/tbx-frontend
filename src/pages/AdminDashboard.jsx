import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Gift, LogOut, Trash2, Eye, X, Users, Package, Calendar, ChevronDown, Search } from 'lucide-react';

const categoryColors = {
  'Employee Onboarding Kits':    'bg-blue-50 text-blue-700 border-blue-200',
  'Festive & Seasonal Hampers':  'bg-amber-50 text-amber-700 border-amber-200',
  'Executive Gifts':             'bg-purple-50 text-purple-700 border-purple-200',
  'Premium Leather Collection':  'bg-orange-50 text-orange-700 border-orange-200',
  'Branded Merchandise':         'bg-green-50 text-green-700 border-green-200',
  'Custom Corporate Gift Boxes': 'bg-rose-50 text-rose-700 border-rose-200',
};

const giftCategories = [
  'Employee Onboarding Kits', 'Festive & Seasonal Hampers', 'Executive Gifts',
  'Premium Leather Collection', 'Branded Merchandise', 'Custom Corporate Gift Boxes',
];

export default function AdminDashboard() {
  const [quotes, setQuotes]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selected, setSelected]       = useState(null);
  const [deleteConfirm, setDeleteConf] = useState(null);
  const [search, setSearch]           = useState('');
  const [filterGift, setFilterGift]   = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchQuotes();
  }, []);

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
      await axios.delete(`/api/admin/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
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
    <div className="min-h-screen bg-cream-100">
      {/* Topbar */}
      <header className="bg-white border-b border-gold-100 shadow-[0_2px_8px_rgba(0,0,0,0.05)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
              <Gift size={17} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-charcoal-900 text-sm">GiftCraft Admin</p>
              <p className="text-charcoal-400 text-xs">Dashboard</p>
            </div>
          </div>
          <button id="admin-logout-btn" onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin'); }}
                  className="flex items-center gap-1.5 text-charcoal-400 hover:text-red-500 transition-colors text-sm font-medium">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          {[
            { icon: Users,   label: 'Total Requests', val: quotes.length,                                               color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-100' },
            { icon: Package, label: 'Total Quantity',  val: quotes.reduce((a, q) => a + q.quantity, 0).toLocaleString(), color: 'text-gold-600',   bg: 'bg-gold-100 border-gold-200' },
            { icon: Calendar,label: 'Latest Request',  val: quotes[0] ? formatDate(quotes[0].createdAt) : '—',           color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
          ].map(({ icon: Icon, label, val, color, bg }) => (
            <div key={label} className={`card flex items-center gap-4 p-5 border ${bg}`}>
              <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 border border-current/10`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-charcoal-400 text-xs">{label}</p>
                <p className="text-charcoal-900 font-bold text-xl">{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input id="admin-search" type="text" placeholder="Search by name, company, or email…"
                   value={search} onChange={(e) => setSearch(e.target.value)}
                   className="form-input pl-9 py-2.5 text-sm" />
          </div>
          <div className="relative">
            <select id="admin-filter-gift" value={filterGift} onChange={(e) => setFilterGift(e.target.value)}
                    className="form-input text-sm py-2.5 pr-8 appearance-none cursor-pointer min-w-[200px]">
              <option value="">All Categories</option>
              {giftCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-gold-100 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-charcoal-900">
              Quote Requests <span className="text-charcoal-400 font-normal text-sm">({filtered.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-gold-200 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-charcoal-400">
              <Package size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No quote requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold-100 bg-cream-50 text-charcoal-400 text-xs uppercase tracking-wider">
                    {['Customer','Company','Gift Category','Qty','Date','Actions'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-50">
                  {filtered.map((q) => (
                    <tr key={q._id} className="hover:bg-cream-50 transition-colors duration-100">
                      <td className="px-5 py-4">
                        <p className="text-charcoal-900 font-medium">{q.fullName}</p>
                        <p className="text-charcoal-400 text-xs">{q.email}</p>
                      </td>
                      <td className="px-5 py-4 text-charcoal-600">{q.companyName}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[q.selectedGift] || 'bg-charcoal-50 text-charcoal-600 border-charcoal-200'}`}>
                          {q.selectedGift}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-charcoal-600 font-mono">{q.quantity.toLocaleString()}</td>
                      <td className="px-5 py-4 text-charcoal-400 text-xs whitespace-nowrap">{formatDate(q.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button id={`view-btn-${q._id}`} onClick={() => setSelected(q)}
                                  className="w-8 h-8 rounded-lg border border-gold-200 hover:bg-gold-100 text-charcoal-400 hover:text-gold-600 flex items-center justify-center transition-all">
                            <Eye size={14} />
                          </button>
                          <button id={`delete-btn-${q._id}`} onClick={() => setDeleteConf(q)}
                                  className="w-8 h-8 rounded-lg border border-red-200 hover:bg-red-50 text-charcoal-400 hover:text-red-500 flex items-center justify-center transition-all">
                            <Trash2 size={14} />
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

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-8 relative border border-gold-200" onClick={(e) => e.stopPropagation()}>
            <button id="close-detail-modal" onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700 transition-colors">
              <X size={20} />
            </button>
            <h3 className="font-display text-xl font-bold text-charcoal-900 mb-6">Request Details</h3>
            <div className="space-y-0">
              {[
                { label: 'Full Name',    value: selected.fullName },
                { label: 'Company',      value: selected.companyName },
                { label: 'Email',        value: selected.email },
                { label: 'Phone',        value: selected.phone },
                { label: 'Gift Category',value: selected.selectedGift },
                { label: 'Quantity',     value: `${selected.quantity.toLocaleString()} units` },
                { label: 'Submitted On', value: formatDate(selected.createdAt) },
                ...(selected.additionalRequirements ? [{ label: 'Additional', value: selected.additionalRequirements }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 py-3 border-b border-gold-50 last:border-0">
                  <span className="text-charcoal-400 text-sm min-w-[130px] shrink-0">{label}</span>
                  <span className="text-charcoal-800 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => setDeleteConf(selected)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-colors">
                <Trash2 size={14} /> Delete Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-7 text-center border border-red-100">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-display text-lg font-bold text-charcoal-900 mb-2">Delete Request?</h3>
            <p className="text-charcoal-500 text-sm mb-6">
              This will permanently delete the request from <strong>{deleteConfirm.fullName}</strong> ({deleteConfirm.companyName}).
            </p>
            <div className="flex gap-3">
              <button id="cancel-delete-btn" onClick={() => setDeleteConf(null)} className="flex-1 btn-outline py-2.5 text-sm justify-center">Cancel</button>
              <button id="confirm-delete-btn" onClick={() => handleDelete(deleteConfirm._id)}
                      className="flex-1 px-4 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
