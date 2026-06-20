import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A1A1D' }} className="pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top: Logo + tagline */}
        <div
          className="pb-12 mb-12 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <img
              src="/logo.png"
              alt="GiftCraft logo"
              className="w-8 h-8 object-contain transition-opacity group-hover:opacity-80"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg)' }}
            />
            <span className="font-display text-xl font-bold text-white tracking-tight group-hover:opacity-80 transition-opacity">
              Gift<span style={{ color: '#FF9E35' }}>Craft</span>
            </span>
          </Link>
          <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.50)' }}>
            India's premium corporate gifting partner. Trusted by 500+ organisations since 2016.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-6"
              style={{ color: '#FF9E35', letterSpacing: '0.2em' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'Home',            path: '/' },
                { name: 'Collections',     path: '/collections' },
                { name: 'About Us',        path: '/about' },
                { name: 'Request a Quote', path: '/contact' },
                { name: 'Admin Portal',    path: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4B06A')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-6"
              style={{ color: '#FF9E35', letterSpacing: '0.2em' }}
            >
              Collections
            </h4>
            <ul className="space-y-3.5">
              {[
                'Employee Onboarding Kits',
                'Festive & Seasonal Hampers',
                'Executive Gifts',
                'Premium Leather Collection',
                'Branded Merchandise',
                'Custom Gift Boxes',
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/collections"
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#D4B06A')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-6"
              style={{ color: '#FF9E35', letterSpacing: '0.2em' }}
            >
              Contact
            </h4>
            <ul className="space-y-5">
              {[
                { label: 'Email',   val: 'hello@giftcraft.co' },
                { label: 'Phone',   val: '+91 98765 43210' },
                { label: 'Address', val: 'Mumbai, Maharashtra, India' },
                { label: 'Hours',   val: 'Mon–Sat, 9 AM – 7 PM' },
              ].map(({ label, val }) => (
                <li key={label}>
                  <p
                    className="text-xs font-semibold uppercase mb-0.5"
                    style={{ color: '#D4B06A', letterSpacing: '0.12em' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>{val}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Why GiftCraft */}
          <div>
            <h4
              className="text-xs font-semibold uppercase mb-6"
              style={{ color: '#FF9E35', letterSpacing: '0.2em' }}
            >
              Why GiftCraft
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {[
                'Minimum 50 unit orders',
                'Full logo & brand customisation',
                'Quote within 24 hours',
                'Pan India delivery',
                'Dedicated account manager',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span style={{ color: '#FF9E35', marginTop: '2px' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} GiftCraft Corporate. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Crafted with excellence for corporate India
          </p>
        </div>
      </div>
    </footer>
  );
}
