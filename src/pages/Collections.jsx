import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Gift } from 'lucide-react';

const products = [
  {
    id: 'onboarding',
    emoji: '🎒',
    badge: 'Most Popular',
    title: 'Employee Onboarding Kits',
    tagline: 'Welcome every new hire the right way',
    desc: 'Make a lasting first impression with thoughtfully curated onboarding kits. Each kit is tailored to reflect your company culture and makes new employees feel valued from Day 1.',
    includes: [
      'Branded welcome letter & card',
      'Customised notebook & pen set',
      'Company-branded tote bag',
      'Tech accessories (USB, mouse pad)',
      'Snack hamper & wellness items',
      'Branded mug or water bottle',
    ],
    moq: '50 units',
    turnaround: '7–10 working days',
    tag: 'onboarding',
  },
  {
    id: 'festive',
    emoji: '🎁',
    badge: 'Seasonal Special',
    title: 'Festive & Seasonal Hampers',
    tagline: 'Celebrate every occasion in style',
    desc: 'From Diwali to Christmas and New Year, our festive hampers bring joy and strengthen bonds with employees, clients, and partners. Premium packaging included.',
    includes: [
      'Assorted dry fruits & sweets',
      'Artisanal chocolates & cookies',
      'Scented candles or diffusers',
      'Premium gift box with ribbon',
      'Personalised greeting card',
      'Custom branding on packaging',
    ],
    moq: '50 units',
    turnaround: '5–7 working days',
    tag: 'festive',
  },
  {
    id: 'executive',
    emoji: '💼',
    badge: 'Premium Tier',
    title: 'Executive Gifts',
    tagline: 'Exclusive gifts for those who matter most',
    desc: 'Reserved for your top performers, senior leaders, and high-value clients. Each executive gift is a statement of appreciation, crafted with the finest materials and attention to detail.',
    includes: [
      'Premium leather portfolio / organiser',
      'Luxury pen set (Parker / Cross)',
      'Crystal or brass desk accessory',
      'Premium Scotch whisky or wine (optional)',
      'Custom engraved nameplate',
      'Handcrafted wooden gift box',
    ],
    moq: '10 units',
    turnaround: '10–14 working days',
    tag: 'executive',
  },
  {
    id: 'leather',
    emoji: '👜',
    badge: 'Handcrafted',
    title: 'Premium Leather Collection',
    tagline: 'Timeless gifts of lasting quality',
    desc: 'Our leather collection features handcrafted products from skilled artisans. Every piece is a blend of tradition and modern corporate elegance, embossed with your logo.',
    includes: [
      'Full-grain leather diary / journal',
      'Leather card holder & wallet',
      'Laptop bag or portfolio sleeve',
      'Passport holder & travel organiser',
      'Key chain with logo embossing',
      'Gift wrapped in kraft paper box',
    ],
    moq: '25 units',
    turnaround: '10–12 working days',
    tag: 'leather',
  },
  {
    id: 'branded',
    emoji: '🏷️',
    badge: 'High Volume',
    title: 'Branded Merchandise',
    tagline: 'Put your brand in every hand',
    desc: 'Amplify your brand presence with high-quality merchandise that people actually use. Ideal for events, trade shows, conferences, and large-scale employee gifting.',
    includes: [
      'Custom printed T-shirts & caps',
      'Branded pens, notebooks, sticky pads',
      'Logo printed bags (tote, drawstring)',
      'USB drives & tech accessories',
      'Promotional mugs & bottles',
      'Lanyard, ID holder & badge',
    ],
    moq: '100 units',
    turnaround: '7–10 working days',
    tag: 'branded',
  },
  {
    id: 'custom',
    emoji: '📦',
    badge: 'Bespoke',
    title: 'Custom Corporate Gift Boxes',
    tagline: 'Your brand, your story, your box',
    desc: 'Completely bespoke gifting solutions where you choose every element — box design, colour, products, inserts, and messaging. Perfect for milestone celebrations and brand launches.',
    includes: [
      'Custom-designed rigid gift box',
      'Your choice of products & inserts',
      'Branded tissue paper & crinkle fill',
      'Printed ribbon & wax seal',
      'Personalised message card',
      'Thank-you / brand story insert',
    ],
    moq: '50 units',
    turnaround: '12–15 working days',
    tag: 'custom',
  },
];

const filters = ['All', 'onboarding', 'festive', 'executive', 'leather', 'branded', 'custom'];
const filterLabels = {
  All: 'All',
  onboarding: 'Onboarding',
  festive: 'Festive',
  executive: 'Executive',
  leather: 'Leather',
  branded: 'Branded',
  custom: 'Custom',
};

export default function Collections() {
  const [active, setActive] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const visible = active === 'All' ? products : products.filter((p) => p.tag === active);

  return (
    <main className="min-h-screen bg-white pt-16">

      {/* ── Page header ──────────────────────── */}
      <section className="py-20 text-center border-b border-gold-100"
               style={{ background: 'linear-gradient(160deg,#fffef9 0%,#fdf8ec 60%,#faf3d8 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 reveal-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <Gift size={13} /> Our Gift Collections
          </span>
          <h1 className="section-title mb-4">
            Premium <span className="text-gold">Gift Collections</span>
          </h1>
          <div className="gold-divider" />
          <p className="text-charcoal-500 text-lg mt-5 leading-relaxed">
            Browse our complete range of corporate gifting solutions — each category designed
            for a specific purpose, all crafted with the same commitment to quality.
          </p>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────── */}
      <section className="sticky top-16 z-30 bg-white border-b border-gold-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f
                  ? 'text-white border-transparent shadow-gold-sm'
                  : 'border-gold-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-600 bg-white'
              }`}
              style={active === f ? { background: 'linear-gradient(135deg,#c9a84c,#a8872a)' } : {}}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </section>

      {/* ── Product grid ─────────────────────── */}
      <section className="page-section bg-cream-100">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {visible.map((p) => {
              const isOpen = expanded === p.id;
              return (
                <div key={p.id} className="card flex flex-col group hover:-translate-y-1">
                  {/* Card header */}
                  <div className="p-6 border-b border-gold-100">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block">
                        {p.emoji}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-100 text-gold-700">
                        {p.badge}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-charcoal-900 mb-1">{p.title}</h2>
                    <p className="text-gold-600 text-sm font-medium mb-3">{p.tagline}</p>
                    <p className="text-charcoal-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>

                  {/* What's included (expandable) */}
                  <div className="px-6 py-4">
                    <button
                      id={`expand-${p.id}`}
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      className="flex items-center justify-between w-full text-sm font-semibold text-charcoal-800 hover:text-gold-600 transition-colors duration-200"
                    >
                      <span>What's Included</span>
                      <span className={`text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>›</span>
                    </button>

                    <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-72 mt-3' : 'max-h-0'}`}>
                      <ul className="space-y-2">
                        {p.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-600">
                            <Check size={14} className="text-gold-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex gap-4 py-3 border-t border-gold-100 mb-4 text-xs text-charcoal-500">
                      <span>📦 MOQ: <strong className="text-charcoal-800">{p.moq}</strong></span>
                      <span>⏱ Lead time: <strong className="text-charcoal-800">{p.turnaround}</strong></span>
                    </div>
                    <Link
                      to={`/contact?category=${encodeURIComponent(p.title)}`}
                      id={`quote-${p.id}`}
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Request a Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="text-center py-20 text-charcoal-400">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-lg font-medium">No products found.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────── */}
      <section className="py-20 text-center border-t border-gold-100"
               style={{ background: 'linear-gradient(135deg,#fdf8ec,#faf3d8)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-charcoal-500 text-base mb-8">
            We specialise in fully custom gifting solutions. Tell us your vision and we'll bring it to life.
          </p>
          <Link to="/contact" id="collections-custom-cta" className="btn-primary text-base px-10 py-4">
            Discuss a Custom Order <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
