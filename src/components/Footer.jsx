import { Link } from 'react-router-dom';
import { Gift, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg,#d4af37,#a8872a)' }}>
                <Gift size={17} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold">
                Gift<span className="text-gold">Craft</span>
              </span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed">
              Premium corporate gifting solutions that strengthen relationships and reflect your brand's values.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                   className="w-9 h-9 rounded-full border border-charcoal-600 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home',        path: '/' },
                { name: 'Collections', path: '/collections' },
                { name: 'About Us',    path: '/about' },
                { name: 'Request a Quote', path: '/contact' },
                { name: 'Admin Portal',    path: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path}
                        className="text-charcoal-400 hover:text-gold-400 text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Gift Categories</h4>
            <ul className="space-y-3">
              {[
                'Employee Onboarding Kits',
                'Festive & Seasonal Hampers',
                'Executive Gifts',
                'Premium Leather Collection',
                'Branded Merchandise',
                'Custom Gift Boxes',
              ].map((cat) => (
                <li key={cat}>
                  <Link to="/collections" className="text-charcoal-400 hover:text-gold-400 text-sm transition-colors duration-200">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Contact</h4>
            <ul className="space-y-4">
              {[
                { Icon: Mail,   val: 'hello@giftcraft.co' },
                { Icon: Phone,  val: '+91 98765 43210' },
                { Icon: MapPin, val: 'Mumbai, Maharashtra, India' },
              ].map(({ Icon, val }) => (
                <li key={val} className="flex items-start gap-3">
                  <Icon size={15} className="text-gold-400 mt-0.5 shrink-0" />
                  <span className="text-charcoal-400 text-sm">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-charcoal-600 text-xs">© {new Date().getFullYear()} GiftCraft Corporate. All rights reserved.</p>
          <p className="text-charcoal-600 text-xs">Crafted with ♥ for corporate excellence</p>
        </div>
      </div>
    </footer>
  );
}
