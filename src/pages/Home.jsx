import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Package, Award, Gift } from 'lucide-react';

const categories = [
  { id: 'onboarding', emoji: '🎒', title: 'Employee Onboarding Kits',    desc: 'Make every new hire feel welcomed with thoughtfully curated starter packs.' },
  { id: 'festive',    emoji: '🎁', title: 'Festive & Seasonal Hampers',  desc: 'Celebrate every occasion with premium hampers that leave lasting impressions.' },
  { id: 'executive',  emoji: '💼', title: 'Executive Gifts',             desc: 'Exclusive, sophisticated gifts for your top performers and VIP clients.' },
  { id: 'leather',    emoji: '👜', title: 'Premium Leather Collection',  desc: 'Handcrafted leather diaries, wallets, and portfolios of the finest quality.' },
  { id: 'branded',    emoji: '🏷️', title: 'Branded Merchandise',        desc: 'Customised merchandise that puts your brand in every hand.' },
  { id: 'custom',     emoji: '📦', title: 'Custom Corporate Gift Boxes', desc: 'Bespoke gift box solutions designed around your brand identity.' },
];

const stats = [
  { icon: Users,   value: '500+',    label: 'Happy Clients' },
  { icon: Package, value: '10,000+', label: 'Gifts Delivered' },
  { icon: Star,    value: '4.9/5',   label: 'Client Rating' },
  { icon: Award,   value: '8+',      label: 'Years of Excellence' },
];

const testimonials = [
  { name: 'Priya Sharma',  role: 'HR Director, TechCorp India',  text: 'GiftCraft transformed our onboarding experience. Every new hire was genuinely thrilled with their kit.' },
  { name: 'Rajesh Kumar',  role: 'CEO, InnovateMart',            text: 'We ordered 300 executive gift hampers for Diwali. The quality and packaging was world-class.' },
  { name: 'Anita Patel',   role: 'Events Manager, GlobalEdge',   text: 'Fantastic service! From quotation to delivery, everything was smooth and professional.' },
];

export default function Home() {
  return (
    <main className="min-h-screen pt-16 bg-white">

      {/* ── Hero ─────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fffef9 0%, #fdf8ec 60%, #faf3d8 100%)' }}>
        {/* Subtle decorative ring */}
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border border-gold-200 opacity-60 pointer-events-none" />
        <div className="absolute top-20 right-10 w-[240px] h-[240px] rounded-full border border-gold-100 opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center py-24 md:py-32">
          {/* Text */}
          <div className="text-center lg:text-left reveal-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Gift size={13} /> Premium Corporate Gifting
            </span>
            <h1 className="section-title mb-5">
              Gifts That Speak<br />
              <span className="text-gold">Louder Than Words</span>
            </h1>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              From employee onboarding kits to festive hampers and executive collections —
              we craft gifting experiences that strengthen relationships and embody your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact" id="hero-get-quote-btn" className="btn-primary">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link to="/collections" id="hero-collections-btn" className="btn-outline">
                View Collections
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['P','R','A','S'].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                       style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-charcoal-400 text-xs">Trusted by 500+ companies</p>
              </div>
            </div>
          </div>

          {/* Visual card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm animate-float">
              <div className="card p-7 shadow-gold">
                <div className="text-5xl text-center mb-5">🎁</div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900 text-center mb-5">
                  Our Gift Categories
                </h3>
                <ul className="space-y-2.5 mb-6">
                  {categories.slice(0, 4).map((c) => (
                    <li key={c.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-cream-100 border border-gold-100">
                      <span className="text-lg">{c.emoji}</span>
                      <span className="text-charcoal-700 text-sm font-medium">{c.title}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/collections" className="btn-primary w-full justify-center text-sm">
                  See All Collections <ArrowRight size={14} />
                </Link>
              </div>
              {/* Badges */}
              <div className="absolute -top-4 -left-4 card px-3 py-2 shadow-gold-sm text-xs">
                <p className="text-charcoal-400">Min Order</p>
                <p className="text-gold-600 font-bold">50 units</p>
              </div>
              <div className="absolute -bottom-4 -right-4 card px-3 py-2 shadow-gold-sm text-xs">
                <p className="text-charcoal-400">Delivery</p>
                <p className="text-gold-600 font-bold">Pan India 🇮🇳</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────── */}
      <section className="py-14 bg-white border-y border-gold-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl border border-gold-200 bg-cream-100 flex items-center justify-center group-hover:shadow-gold-sm transition-all duration-300">
                  <Icon size={20} className="text-gold-600" />
                </div>
                <p className="font-display text-3xl font-bold text-charcoal-900">{value}</p>
                <p className="text-charcoal-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured categories ───────────────── */}
      <section className="page-section bg-cream-100">
        <div className="section-inner">
          <div className="section-center">
            <p className="section-label">Our Collection</p>
            <h2 className="section-title mt-2">Explore Gift Categories</h2>
            <div className="gold-divider" />
            <p className="text-charcoal-500 mt-4 text-base">
              Curated gifting solutions designed for every corporate occasion and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="card p-6 group hover:-translate-y-1 cursor-pointer">
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {cat.emoji}
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">{cat.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed mb-4">{cat.desc}</p>
                <Link to="/collections" className="inline-flex items-center gap-1.5 text-gold-600 text-sm font-semibold hover:gap-3 transition-all duration-200">
                  View Details <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/collections" id="categories-view-all-btn" className="btn-primary">
              View All Collections <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────── */}
      <section className="page-section bg-white">
        <div className="section-inner">
          <div className="section-center">
            <p className="section-label">Why GiftCraft</p>
            <h2 className="section-title mt-2">Crafted for Corporate Excellence</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { emoji: '🎨', title: 'Full Customisation', desc: 'Every gift is tailored — logos, colours, packaging, and personal message cards.' },
              { emoji: '🚀', title: 'On-Time Delivery',   desc: 'We guarantee timely delivery across India so you never miss an occasion.' },
              { emoji: '💎', title: 'Premium Quality',    desc: 'Sourced from the finest vendors with strict quality checks on every product.' },
              { emoji: '📞', title: 'Dedicated Support',  desc: 'A gifting consultant assigned to your account from inquiry to delivery.' },
              { emoji: '💰', title: 'Competitive Pricing',desc: 'Bulk order discounts and flexible pricing tiers for any budget.' },
              { emoji: '🌿', title: 'Eco-Friendly Options',desc: 'Sustainable, recyclable, and ethically sourced gifting alternatives available.' },
            ].map((item) => (
              <div key={item.title} className="card p-6 group hover:-translate-y-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{item.emoji}</div>
                <h3 className="font-display text-base font-semibold text-charcoal-900 mb-2">{item.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────── */}
      <section className="page-section bg-cream-100">
        <div className="section-inner">
          <div className="section-center">
            <p className="section-label">Testimonials</p>
            <h2 className="section-title mt-2">What Our Clients Say</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-7 group hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                       style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-charcoal-900 font-semibold text-sm">{t.name}</p>
                    <p className="text-charcoal-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────── */}
      <section className="py-20 border-t border-gold-100 text-center" style={{ background: 'linear-gradient(135deg,#fdf8ec,#faf3d8)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title mb-4">Ready to Elevate Your Corporate Gifting?</h2>
          <p className="text-charcoal-500 text-lg mb-8">
            Submit your inquiry and receive a personalised quote within 24 hours.
          </p>
          <Link to="/contact" id="cta-banner-btn" className="btn-primary text-base px-10 py-4">
            Get Your Free Quote Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
