import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const products = [
  {
    id: 'onboarding', num: '01', badge: 'Most Popular',
    title: 'Employee Onboarding Kits',
    tagline: 'Welcome every new hire the right way',
    desc: 'Make a lasting first impression with thoughtfully curated onboarding kits reflecting your company culture from Day 1.',
    includes: ['Branded welcome letter & card', 'Customised notebook & pen set', 'Company-branded tote bag', 'Tech accessories (USB, mouse pad)', 'Snack hamper & wellness items', 'Branded mug or water bottle'],
    moq: '50 units', turnaround: '7–10 working days', tag: 'onboarding',
  },
  {
    id: 'festive', num: '02', badge: 'Seasonal Special',
    title: 'Festive & Seasonal Hampers',
    tagline: 'Celebrate every occasion in style',
    desc: 'From Diwali to Christmas and New Year, premium hampers that strengthen bonds with employees, clients, and partners.',
    includes: ['Assorted dry fruits & sweets', 'Artisanal chocolates & cookies', 'Scented candles or diffusers', 'Premium gift box with ribbon', 'Personalised greeting card', 'Custom branding on packaging'],
    moq: '50 units', turnaround: '5–7 working days', tag: 'festive',
  },
  {
    id: 'executive', num: '03', badge: 'Premium Tier',
    title: 'Executive Gifts',
    tagline: 'Exclusive gifts for those who matter most',
    desc: 'Reserved for top performers and high-value clients. Each gift is a statement of appreciation crafted from the finest materials.',
    includes: ['Premium leather portfolio / organiser', 'Luxury pen set (Parker / Cross)', 'Crystal or brass desk accessory', 'Premium Scotch whisky or wine (optional)', 'Custom engraved nameplate', 'Handcrafted wooden gift box'],
    moq: '10 units', turnaround: '10–14 working days', tag: 'executive',
  },
  {
    id: 'leather', num: '04', badge: 'Handcrafted',
    title: 'Premium Leather Collection',
    tagline: 'Timeless gifts of enduring quality',
    desc: 'Handcrafted products by skilled artisans — a blend of tradition and modern corporate elegance, embossed with your logo.',
    includes: ['Full-grain leather diary / journal', 'Leather card holder & wallet', 'Laptop bag or portfolio sleeve', 'Passport holder & travel organiser', 'Key chain with logo embossing', 'Gift wrapped in kraft paper box'],
    moq: '25 units', turnaround: '10–12 working days', tag: 'leather',
  },
  {
    id: 'branded', num: '05', badge: 'High Volume',
    title: 'Branded Merchandise',
    tagline: 'Put your brand in every hand',
    desc: 'Amplify your brand presence with high-quality merchandise. Ideal for events, trade shows, and large-scale gifting.',
    includes: ['Custom printed T-shirts & caps', 'Branded pens, notebooks, sticky pads', 'Logo printed bags (tote, drawstring)', 'USB drives & tech accessories', 'Promotional mugs & bottles', 'Lanyard, ID holder & badge'],
    moq: '100 units', turnaround: '7–10 working days', tag: 'branded',
  },
  {
    id: 'custom', num: '06', badge: 'Bespoke',
    title: 'Custom Corporate Gift Boxes',
    tagline: 'Your brand, your story, your box',
    desc: 'Completely bespoke solutions — every element chosen by you, from box design to products, inserts, and messaging.',
    includes: ['Custom-designed rigid gift box', 'Your choice of products & inserts', 'Branded tissue paper & crinkle fill', 'Printed ribbon & wax seal', 'Personalised message card', 'Thank-you / brand story insert'],
    moq: '50 units', turnaround: '12–15 working days', tag: 'custom',
  },
];

const filters = ['All', 'onboarding', 'festive', 'executive', 'leather', 'branded', 'custom'];
const filterLabels = { All: 'All', onboarding: 'Onboarding', festive: 'Festive', executive: 'Executive', leather: 'Leather', branded: 'Branded', custom: 'Custom' };

export default function Collections() {
  const [active, setActive]     = useState('All');
  const [expanded, setExpanded] = useState(null);
  const visible = active === 'All' ? products : products.filter((p) => p.tag === active);

  return (
    <main className="min-h-screen pt-[68px]" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Page Header ──────────────────────────── */}
      <section
        className="py-20 md:py-28 border-b"
        style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-5">Premium Gift Collections</p>
          <h1 className="section-title mb-5 max-w-2xl">
            Curated Gifting for{' '}
            <em style={{ color: '#E67722', fontStyle: 'italic' }}>Every Occasion</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: '#666666', lineHeight: '1.8' }}>
            Six meticulously designed gifting categories — each crafted with the same commitment
            to quality, personalisation, and brand excellence.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs ───────────────────────────── */}
      <div
        className="sticky top-[68px] z-30 bg-white border-b"
        style={{ borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap overflow-x-auto -mb-px">
            {filters.map((f) => (
              <button
                key={f}
                id={`filter-${f.toLowerCase()}`}
                onClick={() => setActive(f)}
                className="px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2"
                style={{
                  color: active === f ? '#E67722' : '#666666',
                  borderBottomColor: active === f ? '#FF9E35' : 'transparent',
                  letterSpacing: '0.02em',
                }}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Catalogue Grid ────────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visible.map((p) => {
              const isOpen = expanded === p.id;
              return (
                <article key={p.id} className="card flex flex-col group">

                  <div className="w-full overflow-hidden">
                    <img
                      src={`/images/home/collection-${p.id}.png`}
                      alt={p.title}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card top bar */}
                  <div
                    className="flex items-center justify-between px-6 py-3.5 border-b"
                    style={{ borderColor: 'rgba(26,26,29,0.07)' }}
                  >
                    <span
                      className="text-xs font-semibold uppercase"
                      style={{ color: '#D4B06A', letterSpacing: '0.18em' }}
                    >
                      {p.num} — {p.badge}
                    </span>
                    <span className="text-xs font-medium" style={{ color: '#AAAAAA' }}>
                      MOQ {p.moq}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="p-6 border-b flex-1" style={{ borderColor: 'rgba(26,26,29,0.07)' }}>
                    <h2 className="font-display text-xl font-bold mb-1.5 leading-tight" style={{ color: '#1A1A1D' }}>
                      {p.title}
                    </h2>
                    <p className="text-sm font-medium mb-3" style={{ color: '#E67722' }}>
                      {p.tagline}
                    </p>
                    <p className="text-sm" style={{ color: '#666666', lineHeight: '1.75' }}>
                      {p.desc}
                    </p>
                  </div>

                  {/* What's included — expandable */}
                  <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(26,26,29,0.07)' }}>
                    <button
                      id={`expand-${p.id}`}
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      className="flex items-center justify-between w-full text-left transition-opacity hover:opacity-70"
                    >
                      <span className="text-xs font-semibold uppercase" style={{ color: '#1A1A1D', letterSpacing: '0.14em' }}>
                        What's Included
                      </span>
                      <span
                        className="transition-transform duration-300 text-lg leading-none"
                        style={{ color: '#FF9E35', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        ↓
                      </span>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? '300px' : '0', marginTop: isOpen ? '14px' : '0' }}
                    >
                      <ul className="space-y-2">
                        {p.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#555555' }}>
                            <Check size={12} className="mt-0.5 shrink-0" style={{ color: '#FF9E35' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-6 py-5">
                    <p className="text-xs mb-4" style={{ color: '#AAAAAA' }}>
                      Lead time — <strong style={{ color: '#1A1A1D' }}>{p.turnaround}</strong>
                    </p>
                    <Link
                      to={`/contact?category=${encodeURIComponent(p.title)}`}
                      id={`quote-${p.id}`}
                      className="btn-primary w-full justify-center text-sm"
                    >
                      Request a Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl font-bold mb-2" style={{ color: '#1A1A1D' }}>No results</p>
              <p className="text-sm" style={{ color: '#AAAAAA' }}>Try a different category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────── */}
      <section style={{ backgroundColor: '#1A1A1D' }} className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-xs font-semibold uppercase mb-4" style={{ color: '#FF9E35', letterSpacing: '0.22em' }}>
              Bespoke Solutions
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight max-w-lg">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.50)' }}>
              We specialise in fully custom solutions. Tell us your vision.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/contact" id="collections-cta-btn" className="btn-primary">
              Discuss a Custom Order <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
