import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SLIDESHOW DATA
   Image files go in:  public/images/home/
   File names expected (replace the empty div with <img> later):
     collection-onboarding.png
     collection-festive.png
     collection-executive.png
     collection-leather.png
     collection-branded.png
     collection-custom.png
───────────────────────────────────────────────────────────── */
const slides = [
  {
    id: 'onboarding', num: '01', badge: 'Most Popular',
    title: 'Employee Onboarding Kits',
    desc: 'Make every new hire feel valued from Day 1 with thoughtfully curated welcome kits that reflect your company culture.',
    category: 'Employee Onboarding Kits',
    img: '/images/home/collection-onboarding.png',
  },
  {
    id: 'festive', num: '02', badge: 'Seasonal Special',
    title: 'Festive & Seasonal Hampers',
    desc: 'Celebrate Diwali, Christmas, and New Year with premium hampers that leave a lasting impression on clients and employees.',
    category: 'Festive & Seasonal Hampers',
    img: '/images/home/collection-festive.png',
  },
  {
    id: 'executive', num: '03', badge: 'Premium Tier',
    title: 'Executive Gifts',
    desc: 'Reserved for top performers and high-value clients. Crafted from the finest materials, these gifts speak for themselves.',
    category: 'Executive Gifts',
    img: '/images/home/collection-executive.png',
  },
  {
    id: 'leather', num: '04', badge: 'Handcrafted',
    title: 'Premium Leather Collection',
    desc: 'Handcrafted products by skilled artisans — a perfect blend of tradition and modern corporate elegance, embossed with your logo.',
    category: 'Premium Leather Collection',
    img: '/images/home/collection-leather.png',
  },
  {
    id: 'branded', num: '05', badge: 'High Volume',
    title: 'Branded Merchandise',
    desc: 'Amplify your brand presence with high-quality merchandise that people actually use — ideal for events and large-scale gifting.',
    category: 'Branded Merchandise',
    img: '/images/home/collection-branded.png',
  },
  {
    id: 'custom', num: '06', badge: 'Bespoke',
    title: 'Custom Corporate Gift Boxes',
    desc: 'Completely bespoke gifting solutions — every element chosen by you, from box design to products, inserts, and messaging.',
    category: 'Custom Corporate Gift Boxes',
    img: '/images/home/collection-custom.png',
  },
];

const whyUs = [
  { title: 'Full Customisation',   desc: 'Every gift is tailored — logos, colours, packaging, and personal message cards designed around your brand.' },
  { title: 'On-Time Delivery',     desc: 'We guarantee timely delivery across India so you never miss an occasion, no matter the order size.' },
  { title: 'Premium Quality',      desc: 'Sourced from the finest vendors with strict quality checks before every order leaves our facility.' },
  { title: 'Dedicated Support',    desc: 'A personal gifting consultant is assigned to your account from the first inquiry through delivery.' },
  { title: 'Competitive Pricing',  desc: 'Bulk order discounts and flexible tiers designed to accommodate any corporate budget.' },
  { title: 'Eco-Friendly Options', desc: 'Sustainable, recyclable, and ethically sourced gifting alternatives available on every category.' },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (idx) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 280);
  };

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  /* Auto-advance every 5 s; resets whenever active changes */
  useEffect(() => {
    const id = setTimeout(next, 5000);
    return () => clearTimeout(id);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const slide = slides[active];

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden pt-[68px]"
        style={{ minHeight: '100vh', backgroundColor: '#FAF7F2' }}
      >
        {/* Decorative background letter */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '38vw',
            fontWeight: 700,
            color: '#D4B06A',
            opacity: 0.045,
            lineHeight: 1,
            right: '-6vw',
          }}
        >
          G
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full py-24 md:py-32">
          <div className="max-w-3xl reveal-up">
            <p className="section-label mb-8">Premium Corporate Gifting — India</p>
            <h1 className="hero-title mb-9">
              Gifts That Make<br />
              Every Occasion{' '}
              <em style={{ color: '#E67722', fontStyle: 'italic' }}>Unforgettable.</em>
            </h1>
            <p className="text-base md:text-lg mb-10 max-w-lg" style={{ color: '#555555', lineHeight: '1.85' }}>
              From employee onboarding kits to executive hampers and festive collections —
              we craft premium gifting experiences that strengthen relationships and make your
              brand unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" id="hero-quote-btn" className="btn-primary">
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link to="/collections" id="hero-collections-btn" className="btn-outline">
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS SLIDESHOW ────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="section-label mb-3">Our Collections</p>
              <h2 className="section-title">Gifting for Every<br />Corporate Occasion</h2>
            </div>
            <Link
              to="/collections"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: '#1A1A1D', letterSpacing: '0.03em' }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Slide panel */}
          <div className="border" style={{ borderColor: 'rgba(26,26,29,0.09)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ minHeight: '460px' }}>

              {/* ── IMAGE AREA (left, 7/12) ─────────────
                  To add images later:
                  Replace the inner <div> with:
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  Image files → public/images/home/collection-{id}.png
              ──────────────────────────────────────── */}
              <div
                className="lg:col-span-7 relative overflow-hidden"
                style={{ minHeight: '260px', backgroundColor: '#EDE8E0' }}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.28s ease',
                  }}
                />
              </div>

              {/* ── CONTENT AREA (right, 5/12) ─────────── */}
              <div
                className="lg:col-span-5 flex flex-col justify-center px-8 md:px-12 py-12 bg-white"
                style={{
                  opacity: fading ? 0 : 1,
                  transition: 'opacity 0.28s ease',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase mb-5"
                  style={{ color: '#D4B06A', letterSpacing: '0.2em' }}
                >
                  {slide.num} — {slide.badge}
                </p>
                <h3
                  className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight"
                  style={{ color: '#1A1A1D' }}
                >
                  {slide.title}
                </h3>
                <p className="text-sm mb-8" style={{ color: '#666666', lineHeight: '1.8' }}>
                  {slide.desc}
                </p>
                <Link
                  to={`/contact?category=${encodeURIComponent(slide.category)}`}
                  id={`slide-enquire-${slide.id}`}
                  className="btn-primary self-start"
                >
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-5">

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  id={`slide-dot-${i}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === active ? '24px' : '8px',
                    height: '8px',
                    borderRadius: 0,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: i === active ? '#FF9E35' : 'rgba(26,26,29,0.18)',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex gap-2">
              <button
                id="slide-prev"
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-200"
                style={{ borderColor: 'rgba(26,26,29,0.20)', color: '#1A1A1D' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A1A1D'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1D'; }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                id="slide-next"
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border transition-all duration-200"
                style={{ borderColor: 'rgba(26,26,29,0.20)', color: '#1A1A1D' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A1A1D'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1D'; }}
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mobile: View All button */}
          <div className="mt-7 lg:hidden">
            <Link to="/collections" id="mobile-view-all-btn" className="btn-outline w-full justify-center">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────── */}
      <section style={{ backgroundColor: '#FAF7F2' }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left statement */}
            <div className="lg:col-span-4">
              <p className="section-label mb-4">Why Choose Us</p>
              <h2 className="section-title mb-6">Gifting Excellence</h2>
              <p className="text-sm mb-8" style={{ color: '#666666', lineHeight: '1.85' }}>
                We've spent years perfecting the art of corporate gifting —
                building systems, supplier relationships, and a service culture that consistently
                delivers above expectations.
              </p>
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right: Numbered reasons */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-0">
                {whyUs.map((item, i) => (
                  <div
                    key={item.title}
                    className="border-b py-7 px-0 sm:px-6"
                    style={{ borderColor: 'rgba(26,26,29,0.09)' }}
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display text-xs font-bold" style={{ color: '#D4B06A', letterSpacing: '0.1em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-base font-bold" style={{ color: '#1A1A1D' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm pl-7" style={{ color: '#666666', lineHeight: '1.75' }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#FF9E35' }} className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{ color: '#1A1A1D', opacity: 0.55, letterSpacing: '0.22em' }}
            >
              Ready to Begin?
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight" style={{ color: '#1A1A1D' }}>
              Elevate Your<br />Corporate Gifting.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-5">
            <p
              className="text-base md:text-right"
              style={{ color: '#1A1A1D', opacity: 0.70, lineHeight: '1.7', maxWidth: '340px' }}
            >
              Submit your brief and receive a personalised, itemised quotation from our
              gifting consultants within 24 hours.
            </p>
            <Link
              to="/contact"
              id="cta-quote-btn"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold border-2 transition-all duration-200"
              style={{ borderColor: '#1A1A1D', color: '#1A1A1D', letterSpacing: '0.03em' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A1A1D'; e.currentTarget.style.color = '#FF9E35'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1D'; }}
            >
              Request a Free Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
