import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const team = [
  { name: 'Arjun Mehta',   role: 'Founder & CEO',        initial: 'A' },
  { name: 'Sneha Iyer',    role: 'Head of Design',        initial: 'S' },
  { name: 'Vikram Nair',   role: 'Operations Director',   initial: 'V' },
  { name: 'Priya Kapoor',  role: 'Client Relations Lead', initial: 'P' },
];

const values = [
  { title: 'Craft',      desc: 'We treat every gift as a creative act — selecting, curating, and assembling with the eye of a designer, not just a vendor.' },
  { title: 'Trust',      desc: 'Our client relationships are built on transparency, honest pricing, and the consistency of delivering exactly what we promise.' },
  { title: 'Excellence', desc: 'We do not settle for "good enough." Every product is quality-checked, every package inspected before it leaves our hands.' },
  { title: 'Care',       desc: 'We genuinely care about the experience of every gift recipient — because that experience reflects directly on your brand.' },
];

const trust = [
  { val: '500+',    label: 'Corporate Clients',   sub: 'Across India and beyond' },
  { val: '10,000+', label: 'Gifts Delivered',     sub: 'With care and precision' },
  { val: '4.9/5',   label: 'Client Satisfaction', sub: 'Based on post-delivery surveys' },
  { val: '8 Years', label: 'Of Excellence',        sub: 'Founded 2016, trusted since' },
];

export default function About() {
  return (
    <main className="min-h-screen pt-[68px]" style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Hero / Brand Story ────────────────────── */}
      <section
        className="py-24 md:py-36 border-b"
        style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Story heading */}
          <div className="lg:col-span-5">
            <p className="section-label mb-6">Our Story</p>
            <h1 className="hero-title">
              About<br />
              <em style={{ color: '#E67722', fontStyle: 'italic' }}>GiftCraft</em>
            </h1>
          </div>

          {/* Right: Story body */}
          <div className="lg:col-span-7 lg:pt-4">
            <div className="w-12 h-px mb-8" style={{ backgroundColor: '#FF9E35' }} />
            <p
              className="text-base md:text-lg mb-6"
              style={{ color: '#333333', lineHeight: '1.9' }}
            >
              GiftCraft was founded in 2016 with a simple conviction: that corporate gifting
              should be an art, not a transaction. What began as a boutique gifting studio in
              Mumbai has grown into one of India's most trusted corporate gifting partners —
              serving Fortune 500 companies, ambitious startups, and everyone in between.
            </p>
            <p
              className="text-base"
              style={{ color: '#666666', lineHeight: '1.85' }}
            >
              Over eight years, we have delivered more than 10,000 orders across India,
              built relationships with the finest artisan suppliers, and refined every aspect
              of our process — so that every gift we send carries the same care and intention
              as if it were a personal gift from you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────── */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0">

            {/* Mission */}
            <div className="pr-0 md:pr-16 pb-14 md:pb-0 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(26,26,29,0.09)' }}>
              <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#FF9E35' }} />
              <p className="section-label mb-4">Our Mission</p>
              <h2 className="font-display text-3xl font-bold mb-6" style={{ color: '#1A1A1D' }}>
                Make Every Gift Feel Personal
              </h2>
              <p className="text-sm" style={{ color: '#666666', lineHeight: '1.9' }}>
                To simplify the corporate gifting journey by offering a seamless, digital-first
                platform where companies can discover, customise, and request premium gifting
                solutions that truly reflect their brand values and appreciation for the people
                who matter most.
              </p>
            </div>

            {/* Vision */}
            <div className="pl-0 md:pl-16 pt-14 md:pt-0">
              <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#D4B06A' }} />
              <p className="section-label mb-4">Our Vision</p>
              <h2 className="font-display text-3xl font-bold mb-6" style={{ color: '#1A1A1D' }}>
                India's Most Trusted Gifting Brand
              </h2>
              <p className="text-sm" style={{ color: '#666666', lineHeight: '1.9' }}>
                To become India's most trusted corporate gifting brand — known for unmatched
                quality, creative personalisation, and the ability to make every recipient feel
                genuinely valued. We envision gifting as a powerful business strategy, not a
                seasonal obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Values ────────────────────────── */}
      <section
        className="py-20 md:py-28 border-t"
        style={{ backgroundColor: '#FAF7F2', borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="section-label mb-3">What We Believe</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`py-10 ${i < 3 ? 'lg:pr-10 lg:border-r' : ''} ${i > 0 ? 'lg:pl-10' : ''} ${i > 0 ? 'border-t sm:border-t-0' : ''}`}
                style={{ borderColor: 'rgba(26,26,29,0.08)' }}
              >
                <div className="w-8 h-px mb-6" style={{ backgroundColor: '#FF9E35' }} />
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: '#1A1A1D' }}>
                  {v.title}
                </h3>
                <p className="text-sm" style={{ color: '#666666', lineHeight: '1.8' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Businesses Trust Us ──────────────── */}
      <section style={{ backgroundColor: '#1A1A1D' }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{ color: '#FF9E35', letterSpacing: '0.22em' }}
            >
              Proof Points
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              Why Businesses<br />
              <em style={{ color: '#FF9E35', fontStyle: 'italic' }}>Trust GiftCraft</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {trust.map(({ val, label, sub }, i) => (
              <div
                key={label}
                className={`py-8 ${i < 3 ? 'border-r' : ''} ${i > 0 ? 'pl-8' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <p
                  className="font-display text-4xl md:text-5xl font-bold mb-2 leading-none"
                  style={{ color: '#FF9E35' }}
                >
                  {val}
                </p>
                <p className="text-sm font-semibold text-white mb-1">{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────── */}
      <section
        className="py-20 md:py-28 border-t"
        style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(26,26,29,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="section-label mb-3">The Team</p>
            <h2 className="section-title">The Minds Behind<br />GiftCraft</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name}>
                <div
                  className="w-full aspect-square flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ backgroundColor: '#FAF7F2', border: '1px solid rgba(26,26,29,0.07)' }}
                >
                  <span
                    className="font-display font-bold select-none"
                    style={{ fontSize: '4rem', color: '#FF9E35', opacity: 0.6 }}
                  >
                    {t.initial}
                  </span>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#1A1A1D' }}>{t.name}</h3>
                <p className="text-xs mt-1" style={{ color: '#AAAAAA' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ backgroundColor: '#FF9E35' }} className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p
              className="text-xs font-semibold uppercase mb-4"
              style={{ color: '#1A1A1D', opacity: 0.5, letterSpacing: '0.22em' }}
            >
              Let's Work Together
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#1A1A1D' }}>
              Let's Create Something<br />Truly Special.
            </h2>
          </div>
          <Link
            to="/contact"
            id="about-cta-btn"
            className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold border-2 transition-all duration-200"
            style={{ borderColor: '#1A1A1D', color: '#1A1A1D', letterSpacing: '0.03em' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1A1A1D'; e.currentTarget.style.color = '#FF9E35'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1D'; }}
          >
            Request a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
