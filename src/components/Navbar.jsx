import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gift } from 'lucide-react';

const navLinks = [
  { name: 'Home',        path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'About',       path: '/about' },
  { name: 'Contact',     path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const active = location.pathname;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gold-100'
          : 'bg-white border-b border-gold-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-gold-sm transition-transform duration-300 group-hover:scale-105"
               style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
            <Gift size={17} className="text-white" />
          </div>
          <span className="font-display text-xl font-bold text-charcoal-900">
            Gift<span className="text-gold">Craft</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all duration-200 relative group ${
                active === link.path
                  ? 'text-gold-600'
                  : 'text-charcoal-600 hover:text-gold-600'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                active === link.path ? 'w-full bg-gold-400' : 'w-0 group-hover:w-full bg-gold-300'
              }`} />
            </Link>
          ))}
          <Link to="/contact" id="navbar-cta" className="btn-primary text-sm px-5 py-2.5">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          id="navbar-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-charcoal-600 hover:text-gold-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
      } bg-white border-t border-gold-100`}>
        <nav className="px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium py-1.5 border-b border-gold-100 last:border-0 ${
                active === link.path ? 'text-gold-600' : 'text-charcoal-700 hover:text-gold-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary text-sm mt-1 justify-center">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
