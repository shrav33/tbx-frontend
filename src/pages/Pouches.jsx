import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

const collections = [
  {
    id: 'makeup',
    num: '01',
    badge: 'Best Seller',
    title: 'Makeup Pouches & Tote Bags',
    tagline: 'Practical beauty, branded elegantly',
    desc: 'Perfect for corporate gifting to female employees and clients. Stylish makeup pouches and tote bags combine everyday practicality with premium branding — a gift they will actually use and love.',
    highlights: ['Soft-touch fabric with custom logo embossing','Multiple compartments for organisation','Available in neutral & vibrant colour palettes','Inner lining with waterproof coating','Zipper closure with branded puller','Matching tote bag option available'],
    moq: '50 units', turnaround: '7–10 working days', color: '#C9A84C', bg: '#FBF6EC', images: ['', '', ''],
  },
  {
    id: 'luxury',
    num: '02',
    badge: 'Premium Tier',
    title: 'Luxury Pouches',
    tagline: 'Sophistication in every stitch',
    desc: 'Crafted for high-value clients and top-tier gifting occasions. Our luxury pouches feature premium materials and bespoke finishing that speak volumes about your brand standards.',
    highlights: ['Full-grain leather or velvet exterior','Gold or silver hardware accents','Satin inner lining with card slots','Custom debossed or foil-stamped logo','Rigid base for structure and longevity','Presented in a premium gift box'],
    moq: '25 units', turnaround: '10–14 working days', color: '#8B6914', bg: '#F7F1E4', images: ['', '', ''],
  },
  {
    id: 'premium',
    num: '03',
    badge: 'Corporate Favourite',
    title: 'Premium Pouches',
    tagline: 'Quality that represents your brand',
    desc: 'The ideal mid-tier gifting solution — a perfect balance between quality and volume. Premium pouches that reflect corporate professionalism without compromising on aesthetics.',
    highlights: ['Canvas or faux-leather construction','Customisable in brand colours','Multiple size options available','Secure zip with branded tab','Suitable for documents, gadgets & essentials','Eco-friendly material options on request'],
    moq: '50 units', turnaround: '7–10 working days', color: '#3D6B35', bg: '#EFF5EE', images: ['', '', ''],
  },
  {
    id: 'party',
    num: '04',
    badge: 'Event Special',
    title: 'Party Pouches',
    tagline: 'Make every event unforgettable',
    desc: 'Vibrant, fun, and perfectly branded for corporate events, product launches, and team celebrations. Party pouches double as gift packaging and keepsakes your guests will treasure.',
    highlights: ['Bold colours with glitter or metallic finish','Custom printed patterns or event branding','Drawstring or zip closure options','Fill with goodies for a complete gift','Available in sets with tissue paper & ribbon','Bulk order discounts available'],
    moq: '100 units', turnaround: '5–7 working days', color: '#B5451B', bg: '#FBF0EC', images: ['', '', ''],
  },
  {
    id: 'wedding',
    num: '05',
    badge: 'Bespoke',
    title: 'Wedding Collection Pouches',
    tagline: 'Celebrate love with every detail',
    desc: 'Exquisite pouches for corporate wedding gifting, client appreciation, or employee wedding hampers. Each piece is a keepsake as beautiful as the occasion itself.',
    highlights: ['Silk, satin, or embroidered fabric options','Custom monogram or logo embroidery','Blush, ivory, gold & custom colour matching','Filled with curated gifting items on request','Matching envelope and gift card included','Perfect for wedding hampers & return gifts'],
    moq: '25 units', turnaround: '10–14 working days', color: '#7B4FA6', bg: '#F5EFF9', images: ['', '', ''],
  },
];

function Slideshow({ images, color, title }) {
  const [active, setActive] = useState(0);
  return (
    <div className="relative w-full h-full flex flex-col" style={{ minHeight: 340 }}>
      <div className="relative flex-1 overflow-hidden" style={{ backgroundColor: '#F0EAD6' }}>
        {images[active] ? (
          <img src={images[active]} alt={`${title} ${active + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '18' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
                <path d="M4 16l4-4 4 4 4-6 4 6" /><rect x="2" y="3" width="20" height="18" rx="2" /><circle cx="8" cy="9" r="1.5" />
              </svg>
            </div>
            <p className="text-xs font-medium" style={{ color }}>Image {active + 1} — Add your photo here</p>
          </div>
        )}
        <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1" style={{ backgroundColor: color, color: '#fff', borderRadius: 2 }}>
          {active + 1} / {images.length}
        </div>
        <button onClick={() => setActive(a => (a - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
          <ChevronLeft size={17} style={{ color: '#1A1A1D' }} />
        </button>
        <button onClick={() => setActive(a => (a + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
          <ChevronRight size={17} style={{ color: '#1A1A1D' }} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 py-3" style={{ backgroundColor: '#FAF7F2' }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="transition-all duration-200" style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === active ? color : '#D8CEBC' }} />
        ))}
      </div>
    </div>
  );
}

export default function Pouches() {
  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>

      <section className="relative overflow-hidden pt-48 pb-20 px-6 text-center" style={{ backgroundColor: '#1A1A1D' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201,168,76,0.04) 80px, rgba(201,168,76,0.04) 81px)' }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div style={{ width: 32, height: 1, backgroundColor: '#C9A84C' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#C9A84C', letterSpacing: '0.18em' }}>Pouch Collections</span>
            <div style={{ width: 32, height: 1, backgroundColor: '#C9A84C' }} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gifts That <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Travel</em><br />With Them
          </h1>
          <p className="text-lg text-[#aaa] max-w-xl mx-auto leading-relaxed mb-10">
            Five distinct pouch collections — from everyday elegance to bespoke luxury — each designed to carry your brand wherever your recipients go.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {collections.map(c => (
              <a key={c.id} href={`#${c.id}`} className="text-xs font-semibold px-4 py-2 border transition-all duration-200 hover:bg-white hover:text-[#1A1A1D]" style={{ borderColor: '#C9A84C40', color: '#C9A84C', borderRadius: 2 }}>
                {c.num} {c.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 4, background: 'linear-gradient(90deg, #C9A84C, #E8D5A3, #C9A84C)' }} />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {collections.map((col, i) => (
            <div key={col.id} id={col.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: '#fff', borderRadius: 2 }}>
              <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="lg:w-[42%]">
                  <Slideshow images={col.images} color={col.color} title={col.title} />
                </div>
                <div className="lg:w-[58%] flex flex-col justify-between p-8 md:p-12">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-bold" style={{ color: col.color + '25', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{col.num}</span>
                      <span className="text-xs font-bold px-3 py-1 tracking-wider uppercase" style={{ backgroundColor: col.bg, color: col.color, borderRadius: 2 }}>{col.badge}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1D] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{col.title}</h2>
                    <p className="text-sm font-semibold mb-4" style={{ color: col.color }}>— {col.tagline}</p>
                    <p className="text-[#555] text-sm leading-relaxed mb-6 max-w-lg">{col.desc}</p>
                    <div className="p-5 mb-6" style={{ backgroundColor: col.bg, borderRadius: 2 }}>
                      <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: col.color, letterSpacing: '0.12em' }}>What's Included</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                        {col.highlights.map((item, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <div className="mt-1.5 flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: col.color }} />
                            <span className="text-sm text-[#444]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F0EBE0]">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs text-[#999] mb-0.5 uppercase tracking-wider">Min. Order</p>
                        <p className="text-sm font-bold text-[#1A1A1D]">{col.moq}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#999] mb-0.5 uppercase tracking-wider">Turnaround</p>
                        <p className="text-sm font-bold text-[#1A1A1D]">{col.turnaround}</p>
                      </div>
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ backgroundColor: col.color, color: '#fff', borderRadius: 2 }}>
                      Get a Quote <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto relative overflow-hidden text-center py-20 px-6" style={{ backgroundColor: '#1A1A1D', borderRadius: 2 }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15), transparent 60%)' }} />
          <div className="relative">
            <Sparkles size={28} style={{ color: '#C9A84C', margin: '0 auto 16px' }} />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Need Something Truly Custom?</h2>
            <p className="text-[#aaa] mb-8 max-w-xl mx-auto">We design fully bespoke pouch solutions tailored to your brand identity, occasion, and budget. No brief is too unique.</p>
            <Link to="/contact" className="inline-flex items-center gap-2.5 text-sm font-bold px-8 py-4 transition-all duration-200 hover:-translate-y-1" style={{ backgroundColor: '#C9A84C', color: '#1A1A1D', borderRadius: 2 }}>
              Start a Custom Order <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}