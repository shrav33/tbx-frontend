import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { Send, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

const giftCategories = [
  'Employee Onboarding Kits',
  'Festive & Seasonal Hampers',
  'Executive Gifts',
  'Premium Leather Collection',
  'Branded Merchandise',
  'Custom Corporate Gift Boxes',
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

  // Pre-fill category from Collections page link
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && giftCategories.includes(cat)) {
      setForm((prev) => ({ ...prev, selectedGift: cat }));
    }
  }, [searchParams]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())   e.fullName    = 'Full name is required';
    if (!form.companyName.trim()) e.companyName = 'Company name is required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim())      e.phone       = 'Phone number is required';
    if (!form.selectedGift)      e.selectedGift = 'Please select a gift category';
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
    if (Object.keys(v).length > 0) { setErrors(v); toast.error('Please fix the highlighted fields.'); return; }
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
    <main className="min-h-screen bg-white pt-16">

      {/* Header */}
      <section className="py-20 text-center border-b border-gold-100"
               style={{ background: 'linear-gradient(160deg,#fffef9 0%,#fdf8ec 60%,#faf3d8 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 reveal-up">
          <p className="section-label mb-3">Request a Quote</p>
          <h1 className="section-title mb-4">
            Get Your <span className="text-gold">Custom Quote</span>
          </h1>
          <div className="gold-divider" />
          <p className="text-charcoal-500 text-lg mt-5">
            Fill in the form below and receive a personalised quotation within 24 hours.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="page-section bg-cream-100">
        <div className="section-inner grid lg:grid-cols-3 gap-12">

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display text-base font-semibold text-charcoal-900 mb-5">Contact Information</h3>
              <ul className="space-y-5">
                {[
                  { Icon: Phone, label: 'Phone',         val: '+91 98765 43210' },
                  { Icon: Mail,  label: 'Email',         val: 'hello@giftcraft.co' },
                  { Icon: MapPin,label: 'Address',       val: 'Mumbai, Maharashtra, India' },
                  { Icon: Clock, label: 'Working Hours', val: 'Mon–Sat, 9 AM – 7 PM' },
                ].map(({ Icon, label, val }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl border border-gold-200 bg-cream-100 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-gold-600" />
                    </div>
                    <div>
                      <p className="text-charcoal-400 text-xs">{label}</p>
                      <p className="text-charcoal-800 text-sm font-medium">{val}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-base font-semibold text-charcoal-900 mb-4">Quick Facts</h3>
              <ul className="space-y-2.5">
                {[
                  '✅ Minimum order: 50 units',
                  '✅ Custom branding available',
                  '✅ Pan India delivery',
                  '✅ Response within 24 hours',
                  '✅ Bulk discounts on 200+ units',
                ].map((fact, i) => (
                  <li key={i} className="text-charcoal-600 text-sm">{fact}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card p-12 text-center flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-full border-2 border-gold-200 bg-gold-100 flex items-center justify-center">
                  <CheckCircle size={38} className="text-gold-600" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">
                    Quote Request Submitted! 🎉
                  </h2>
                  <p className="text-charcoal-500 leading-relaxed max-w-md text-sm">
                    Thank you, <strong className="text-charcoal-900">{form.fullName}</strong>! Your request for{' '}
                    <strong className="text-gold-600">{form.selectedGift}</strong> has been received.
                    We'll reach you at <strong className="text-charcoal-900">{form.email}</strong> within 24 hours.
                  </p>
                </div>
                <button id="submit-another-btn" onClick={() => { setForm(initialForm); setSubmitted(false); }} className="btn-outline">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-1">Quotation Request Form</h2>
                <p className="text-charcoal-400 text-sm mb-7">All fields marked * are required.</p>

                <form id="quote-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="form-label">Full Name *</label>
                      <input id="fullName" name="fullName" type="text" placeholder="John Doe"
                             value={form.fullName} onChange={handleChange}
                             className={`form-input ${errors.fullName ? 'border-red-400' : ''}`} />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="companyName" className="form-label">Company Name *</label>
                      <input id="companyName" name="companyName" type="text" placeholder="Acme Corp"
                             value={form.companyName} onChange={handleChange}
                             className={`form-input ${errors.companyName ? 'border-red-400' : ''}`} />
                      {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input id="email" name="email" type="email" placeholder="john@acme.com"
                             value={form.email} onChange={handleChange}
                             className={`form-input ${errors.email ? 'border-red-400' : ''}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                             value={form.phone} onChange={handleChange}
                             className={`form-input ${errors.phone ? 'border-red-400' : ''}`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="selectedGift" className="form-label">Gift Category *</label>
                      <select id="selectedGift" name="selectedGift" value={form.selectedGift} onChange={handleChange}
                              className={`form-input ${errors.selectedGift ? 'border-red-400' : ''}`}>
                        <option value="" disabled>Select a category</option>
                        {giftCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.selectedGift && <p className="text-red-500 text-xs mt-1">{errors.selectedGift}</p>}
                    </div>
                    <div>
                      <label htmlFor="quantity" className="form-label">Quantity Required *</label>
                      <input id="quantity" name="quantity" type="number" min="1" placeholder="e.g. 100"
                             value={form.quantity} onChange={handleChange}
                             className={`form-input ${errors.quantity ? 'border-red-400' : ''}`} />
                      {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="additionalRequirements" className="form-label">
                      Additional Requirements <span className="text-charcoal-300">(optional)</span>
                    </label>
                    <textarea id="additionalRequirements" name="additionalRequirements" rows={4}
                              placeholder="Custom branding, packaging, delivery location, deadline…"
                              value={form.additionalRequirements} onChange={handleChange}
                              className="form-input resize-none" />
                  </div>

                  <button id="quote-submit-btn" type="submit" disabled={loading}
                          className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading
                      ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
                      : <><Send size={17} />Submit Quote Request</>
                    }
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
