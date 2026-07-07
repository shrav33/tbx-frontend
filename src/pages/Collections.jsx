import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Package } from 'lucide-react';

const products = [
  {
    id: 'onboarding', badge: 'Most Popular',
    title: 'Employee Onboarding Kits',
    tagline: 'Welcome every new hire the right way',
    desc: 'Make a lasting first impression with thoughtfully curated onboarding kits reflecting your company culture from Day 1.',
    includes: ['Branded welcome letter & card', 'Customised notebook & pen set', 'Company-branded tote bag', 'Tech accessories (USB, mouse pad)', 'Snack hamper & wellness items', 'Branded mug or water bottle'],
    moq: '50 units', turnaround: '7–10 working days', tag: 'onboarding',
  },
  {
    id: 'festive', badge: 'Seasonal Special',
    title: 'Festive & Seasonal Hampers',
    tagline: 'Celebrate every occasion in style',
    desc: 'From Diwali to Christmas and New Year, premium hampers that strengthen bonds with employees, clients, and partners.',
    includes: ['Assorted dry fruits & sweets', 'Artisanal chocolates & cookies', 'Scented candles or diffusers', 'Premium gift box with ribbon', 'Personalised greeting card', 'Custom branding on packaging'],
    moq: '50 units', turnaround: '5–7 working days', tag: 'festive',
  },
  {
    id: 'executive', badge: 'Premium Tier',
    title: 'Executive Gifts',
    tagline: 'Exclusive gifts for those who matter most',
    desc: 'Reserved for top performers and high-value clients. Each gift is a statement of appreciation crafted from the finest materials.',
    includes: ['Premium leather portfolio / organiser', 'Luxury pen set (Parker / Cross)', 'Crystal or brass desk accessory', 'Premium Scotch whisky or wine (optional)', 'Custom engraved nameplate', 'Handcrafted wooden gift box'],
    moq: '10 units', turnaround: '10–14 working days', tag: 'executive',
  },
  {
    id: 'leather', badge: 'Handcrafted',
    title: 'Premium Leather Collection',
    tagline: 'Timeless gifts of enduring quality',
    desc: 'Handcrafted products by skilled artisans — a blend of tradition and modern corporate elegance, embossed with your logo.',
    includes: ['Full-grain leather diary / journal', 'Leather card holder & wallet', 'Laptop bag or portfolio sleeve', 'Passport holder & travel organiser', 'Key chain with logo embossing', 'Gift wrapped in kraft paper box'],
    moq: '25 units', turnaround: '10–12 working days', tag: 'leather',
  },
  {
    id: 'branded', badge: 'High Volume',
    title: 'Branded Merchandise',
    tagline: 'Put your brand in every hand',
    desc: 'Amplify your brand presence with high-quality merchandise. Ideal for events, trade shows, and large-scale gifting.',
    includes: ['Custom printed T-shirts & caps', 'Branded pens, notebooks, sticky pads', 'Logo printed bags (tote, drawstring)', 'USB drives & tech accessories', 'Promotional mugs & bottles', 'Lanyard, ID holder & badge'],
    moq: '100 units', turnaround: '7–10 working days', tag: 'branded',
  },
  {
    id: 'custom', badge: 'Bespoke',
    title: 'Custom Corporate Gift Boxes',
    tagline: 'Your brand, your story, your box',
    desc: 'Completely bespoke solutions — every element chosen by you, from box design to products, inserts, and messaging.',
    includes: ['Custom-designed rigid gift box', 'Your choice of products & inserts', 'Branded tissue paper & crinkle fill', 'Printed ribbon & wax seal', 'Personalised message card', 'Thank-you / brand story insert'],
    moq: '50 units', turnaround: '12–15 working days', tag: 'custom',
  },
];

// Small "gift-tag" style meta strip used on every card footer — MOQ / lead time
// presented like a shipping label, tying the visual language back to gifting.
function TagStrip({ moq, turnaround }) {
  return (
    <div
      className="flex items-center gap-5 px-6 py-3 border-t"
      style={{ borderColor: 'rgba(26,26,29,0.08)', borderStyle: 'dashed' }}
    >
      <div className="flex items-center gap-1.5">
        <Package size={13} style={{ color: '#D4B06A' }} />
        <span className="text-xs" style={{ color: '#999999' }}>
          MOQ <strong style={{ color: '#1A1A1D' }}>{moq}</strong>
        </span>
      </div>
      <span style={{ color: 'rgba(26,26,29,0.15)' }}>•</span>
      <span className="text-xs" style={{ color: '#999999' }}>
        Ships in <strong style={{ color: '#1A1A1D' }}>{turnaround}</strong>
      </span>
    </div>
  );
}

function IncludedList({ id, includes, isOpen, onToggle }) {
  return (
    <div className="px-6 py-4 border-t" style={{ borderColor: 'rgba(26,26,29,0.08)' }}>
      <button
        id={`expand-${id}`}
        onClick={onToggle}
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
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#555555' }}>
              <Check size={12} className="mt-0.5 shrink-0" style={{ color: '#FF9E35' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Collections() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((cur) => (cur === id ? null : id));

  const [featured, ...rest] = products;

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Page Header ──────────────────────────── */}
      <section className="pt-[calc(68px+5rem)] pb-16 md:pt-[calc(68px+7rem)] md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-5">Premium Gift Collections</p>
          <h1 className="section-title mb-5 max-w-2xl">
            Six Collections, Curated for{' '}
            <em style={{ color: '#E67722', fontStyle: 'italic' }}>Every Occasion</em>
          </h1>
          <p className="text-base max-w-lg" style={{ color: '#666666', lineHeight: '1.8' }}>
            Each category is built around the same commitment to quality, personalisation, and
            brand excellence — from onboarding day to your top client's desk.
          </p>
        </div>
      </section>

      {/* ── Featured Collection ──────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <article
            className="card grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="overflow-hidden order-1 md:order-2 flex items-center" style={{ backgroundColor: '#FAF7F2' }}>
              <img
                src={`/images/home/collection-${featured.id}.png`}
                alt={featured.title}
                className="w-full h-auto block"
              />
            </div>

            <div className="flex flex-col order-2 md:order-1">
              <div className="px-8 pt-8 md:px-10 md:pt-10 flex-1">
                <span
                  className="inline-block text-xs font-semibold uppercase px-3 py-1 rounded-full mb-5"
                  style={{ backgroundColor: 'rgba(230,119,34,0.1)', color: '#E67722', letterSpacing: '0.12em' }}
                >
                  {featured.badge}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 leading-tight" style={{ color: '#1A1A1D' }}>
                  {featured.title}
                </h2>
                <p className="text-sm font-medium mb-4" style={{ color: '#E67722' }}>
                  {featured.tagline}
                </p>
                <p className="text-sm mb-6" style={{ color: '#666666', lineHeight: '1.75' }}>
                  {featured.desc}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-2">
                  {featured.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#555555' }}>
                      <Check size={12} className="mt-0.5 shrink-0" style={{ color: '#FF9E35' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <TagStrip moq={featured.moq} turnaround={featured.turnaround} />

              <div className="px-8 py-6 md:px-10">
                <Link
                  to={`/contact?category=${encodeURIComponent(featured.title)}`}
                  id={`quote-${featured.id}`}
                  className="btn-primary w-full sm:w-auto justify-center text-sm"
                >
                  Request a Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Remaining Collections ─────────────────── */}
      <section className="pb-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rest.map((p) => {
              const isOpen = expanded === p.id;
              return (
                <article key={p.id} className="card flex flex-col group" style={{ backgroundColor: '#FFFFFF' }}>

                  <div className="w-full overflow-hidden">
                    <img
                      src={`/images/home/collection-${p.id}.png`}
                      alt={p.title}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="px-6 pt-6 pb-1">
                    <span
                      className="inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full mb-3"
                      style={{ backgroundColor: 'rgba(212,176,106,0.14)', color: '#B8934F', letterSpacing: '0.1em' }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <div className="px-6 pb-5 flex-1">
                    <h2 className="font-display text-lg font-bold mb-1.5 leading-tight" style={{ color: '#1A1A1D' }}>
                      {p.title}
                    </h2>
                    <p className="text-sm font-medium mb-3" style={{ color: '#E67722' }}>
                      {p.tagline}
                    </p>
                    <p className="text-sm" style={{ color: '#666666', lineHeight: '1.75' }}>
                      {p.desc}
                    </p>
                  </div>

                  <IncludedList id={p.id} includes={p.includes} isOpen={isOpen} onToggle={() => toggle(p.id)} />

                  <TagStrip moq={p.moq} turnaround={p.turnaround} />

                  <div className="px-6 py-5">
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