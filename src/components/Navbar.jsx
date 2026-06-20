import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',        path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'About',       path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const active = location.pathname;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300"
      style={{
        borderBottom: '1px solid rgba(26,26,29,0.08)',
        boxShadow: scrolled ? '0 2px 20px rgba(26,26,29,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[68px]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="GiftCraft logo"
            className="w-9 h-9 object-contain transition-opacity duration-200 group-hover:opacity-85"
          />
          <span
            className="font-display text-xl font-bold tracking-tight transition-opacity duration-200 group-hover:opacity-80"
            style={{ color: '#1A1A1D' }}
          >
            Gift<span style={{ color: '#FF9E35' }}>Craft</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium transition-colors duration-200 pb-0.5"
              style={{
                color: active === link.path ? '#E67722' : '#222222',
                borderBottom: active === link.path ? '1.5px solid #E67722' : '1.5px solid transparent',
                letterSpacing: '0.02em',
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" id="navbar-cta" className="btn-primary text-sm">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          id="navbar-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 transition-opacity hover:opacity-70"
          style={{ color: '#1A1A1D' }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderTop: isOpen ? '1px solid rgba(26,26,29,0.08)' : 'none' }}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium pb-4 border-b last:border-0"
              style={{ color: active === link.path ? '#E67722' : '#222222', borderColor: 'rgba(26,26,29,0.08)' }}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary text-sm justify-center">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
