import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Send, CheckCircle } from 'lucide-react';

const giftCategories = [
  'Employee Onboarding Kits',
  'Festive & Seasonal Hampers',
  'Executive Gifts',
  'Premium Leather Collection',
  'Branded Merchandise',
  'Custom Corporate Gift Boxes',
];

const steps = [
  { num: '01', title: 'Submit Your Brief',     desc: 'Fill in the form with your requirements, quantity, and deadline.' },
  { num: '02', title: 'Expert Consultation',   desc: 'We review your brief and send a personalised proposal within 24 hours.' },
  { num: '03', title: 'Approve Samples',       desc: 'Confirm branding, review samples, and finalise the order.' },
  { num: '04', title: 'Delivered with Care',   desc: 'We manage production and ensure timely, quality delivery.' },
];

const initialForm = {
  fullName: '', companyName: '', email: '', phone: '',
  selectedGift: '', quantity: '', additionalRequirements: '',
};

export default function Contact() {
  const [form, setForm]           = useState(initialForm);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});
  const [searchParams]            = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && giftCategories.includes(cat)) {
      setForm((prev) => ({ ...prev, selectedGift: cat }));
    }
  }, [searchParams]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())    e.fullName    = 'Full name is required';
    if (!form.companyName.trim()) e.companyName = 'Company name is required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim())       e.phone       = 'Phone number is required';
    if (!form.selectedGift)       e.selectedGift = 'Please select a gift category';
    if (!form.quantity || Number(form.quantity) < 1) e.quantity = 'Minimum quantity is 1';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/quotes', { ...form, quantity: Number(form.quantity) });
      setSubmitted(true);
      toast.success('Quote request submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-[68px]" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Page Header ──────────────────────────── */}
      <section
        className="py-20 md:py-28 border-b"
        style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-5">Request a Quote</p>
          <h1 className="hero-title mb-5">
            Get Your<br />
            <em style={{ color: '#E67722', fontStyle: 'italic' }}>Custom Quote</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: '#666666', lineHeight: '1.8' }}>
            Fill in the form below and receive a personalised, itemised quotation from
            our gifting consultants within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-14 lg:gap-20">

            {/* ── Left sidebar ─────────────────────── */}
            <div>

              {/* Process steps */}
              <div className="mb-12">
                <p
                  className="text-xs font-semibold uppercase mb-8"
                  style={{ color: '#E67722', letterSpacing: '0.2em' }}
                >
                  Our Process
                </p>
                <div className="space-y-8">
                  {steps.map((s, i) => (
                    <div key={s.num} className="flex gap-4">
                      <div
                        className="w-9 h-9 flex items-center justify-center shrink-0 font-display font-bold text-sm"
                        style={{ backgroundColor: i === 0 ? '#FF9E35' : 'rgba(255,158,53,0.10)', color: i === 0 ? '#1A1A1D' : '#FF9E35' }}
                      >
                        {s.num}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1" style={{ color: '#1A1A1D' }}>{s.title}</h3>
                        <p className="text-xs" style={{ color: '#888888', lineHeight: '1.7' }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div>
                <p
                  className="text-xs font-semibold uppercase mb-6"
                  style={{ color: '#E67722', letterSpacing: '0.2em' }}
                >
                  Contact Information
                </p>
                <ul className="space-y-5">
                  {[
                    { label: 'Email',         val: 'hello@giftcraft.co' },
                    { label: 'Phone',         val: '+91 98765 43210' },
                    { label: 'Address',       val: 'Mumbai, Maharashtra, India' },
                    { label: 'Working Hours', val: 'Mon–Sat, 9 AM – 7 PM' },
                  ].map(({ label, val }) => (
                    <li key={label}>
                      <p
                        className="text-xs font-semibold uppercase mb-0.5"
                        style={{ color: '#D4B06A', letterSpacing: '0.12em' }}
                      >
                        {label}
                      </p>
                      <p className="text-sm" style={{ color: '#333333' }}>{val}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Form ─────────────────────────────── */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="py-16 flex flex-col items-start gap-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,158,53,0.12)' }}
                  >
                    <CheckCircle size={28} style={{ color: '#FF9E35' }} />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold mb-4" style={{ color: '#1A1A1D' }}>
                      Quote Request Submitted
                    </h2>
                    <p className="text-sm max-w-md" style={{ color: '#666666', lineHeight: '1.85' }}>
                      Thank you, <strong style={{ color: '#1A1A1D' }}>{form.fullName}</strong>. Your request for{' '}
                      <strong style={{ color: '#1A1A1D' }}>{form.selectedGift}</strong> has been received. We'll reach you at{' '}
                      <strong style={{ color: '#1A1A1D' }}>{form.email}</strong> within 24 hours.
                    </p>
                  </div>
                  <button
                    id="submit-another-btn"
                    onClick={() => { setForm(initialForm); setSubmitted(false); }}
                    className="btn-outline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form id="quote-form" onSubmit={handleSubmit} noValidate className="space-y-5">

                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold mb-1" style={{ color: '#1A1A1D' }}>
                      Quotation Request Form
                    </h2>
                    <p className="text-sm" style={{ color: '#AAAAAA' }}>
                      All fields marked * are required.
                    </p>
                  </div>

                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="form-label">Full Name *</label>
                      <input id="fullName" name="fullName" type="text" placeholder="Jane Smith"
                        value={form.fullName} onChange={handleChange}
                        className={`form-input ${errors.fullName ? 'error' : ''}`} />
                      {errors.fullName && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="companyName" className="form-label">Company Name *</label>
                      <input id="companyName" name="companyName" type="text" placeholder="Acme Corporation"
                        value={form.companyName} onChange={handleChange}
                        className={`form-input ${errors.companyName ? 'error' : ''}`} />
                      {errors.companyName && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.companyName}</p>}
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input id="email" name="email" type="email" placeholder="jane@acme.com"
                        value={form.email} onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`} />
                      {errors.email && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                        value={form.phone} onChange={handleChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`} />
                      {errors.phone && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Category + Quantity */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="selectedGift" className="form-label">Gift Category *</label>
                      <select id="selectedGift" name="selectedGift"
                        value={form.selectedGift} onChange={handleChange}
                        className={`form-input ${errors.selectedGift ? 'error' : ''}`}>
                        <option value="" disabled>Select a category</option>
                        {giftCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.selectedGift && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.selectedGift}</p>}
                    </div>
                    <div>
                      <label htmlFor="quantity" className="form-label">Quantity Required *</label>
                      <input id="quantity" name="quantity" type="number" min="1" placeholder="e.g. 100"
                        value={form.quantity} onChange={handleChange}
                        className={`form-input ${errors.quantity ? 'error' : ''}`} />
                      {errors.quantity && <p className="text-xs mt-1.5" style={{ color: '#E67722' }}>{errors.quantity}</p>}
                    </div>
                  </div>

                  {/* Additional */}
                  <div>
                    <label htmlFor="additionalRequirements" className="form-label">
                      Additional Requirements{' '}
                      <span style={{ color: '#BBBBBB', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                    </label>
                    <textarea id="additionalRequirements" name="additionalRequirements" rows={5}
                      placeholder="Custom branding, packaging specs, delivery location, deadline…"
                      value={form.additionalRequirements} onChange={handleChange}
                      className="form-input resize-none" />
                  </div>

                  {/* Submit */}
                  <button
                    id="quote-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/20 border-t-black/70 rounded-full animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <><Send size={16} /> Submit Quote Request</>
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: '#AAAAAA' }}>
                    We'll respond within 24 business hours. No commitment required.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
