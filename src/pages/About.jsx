import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Zap } from 'lucide-react';

const milestones = [
  { year: '2016', event: 'Founded in Mumbai with a vision to redefine corporate gifting.' },
  { year: '2018', event: 'Expanded to serve 100+ corporate clients across India.' },
  { year: '2020', event: 'Launched premium leather and eco-friendly gift lines.' },
  { year: '2022', event: 'Crossed 5,000 bulk orders and entered pan-India delivery.' },
  { year: '2024', event: 'Partnered with Fortune 500 companies for exclusive gifting programs.' },
];

const team = [
  { name: 'Arjun Mehta',   role: 'Founder & CEO',         emoji: '👨‍💼' },
  { name: 'Sneha Iyer',    role: 'Head of Design',         emoji: '👩‍🎨' },
  { name: 'Vikram Nair',   role: 'Operations Director',    emoji: '👨‍💻' },
  { name: 'Priya Kapoor',  role: 'Client Relations Lead',  emoji: '👩‍💼' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white pt-16">

      {/* Hero */}
      <section className="py-24 text-center border-b border-gold-100"
               style={{ background: 'linear-gradient(160deg,#fffef9 0%,#fdf8ec 60%,#faf3d8 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 reveal-up">
          <p className="section-label mb-3">Our Story</p>
          <h1 className="section-title mb-4">About <span className="text-gold">GiftCraft</span></h1>
          <div className="gold-divider" />
          <p className="text-charcoal-500 text-lg leading-relaxed mt-5">
            We are a premium corporate gifting company dedicated to helping businesses build
            meaningful connections through thoughtfully curated gifts and personalised experiences.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="page-section bg-white">
        <div className="section-inner">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card p-8 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl border border-gold-200 bg-cream-100 flex items-center justify-center mb-5 group-hover:shadow-gold-sm transition-all duration-300">
                <Target size={22} className="text-gold-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">Our Mission</h2>
              <p className="text-charcoal-500 leading-relaxed text-sm">
                To simplify the corporate gifting journey by offering a seamless, digital-first
                platform where companies can discover, customise, and request premium gifting
                solutions that truly reflect their brand values and appreciation for people who matter most.
              </p>
            </div>
            <div className="card p-8 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl border border-gold-200 bg-cream-100 flex items-center justify-center mb-5 group-hover:shadow-gold-sm transition-all duration-300">
                <Eye size={22} className="text-gold-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal-900 mb-3">Our Vision</h2>
              <p className="text-charcoal-500 leading-relaxed text-sm">
                To become India's most trusted corporate gifting brand — known for unmatched quality,
                creative personalisation, and the ability to make every recipient feel genuinely valued.
                We envision gifting as a powerful business strategy, not just a formality.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <p className="section-label mb-2">Core Values</p>
            <h2 className="section-title">What We Stand For</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Passion',    desc: 'Every gift is curated with genuine care and attention to detail.' },
              { icon: Zap,   title: 'Excellence', desc: 'We settle for nothing less than the highest quality in products and service.' },
              { icon: Target,title: 'Integrity',  desc: 'Transparent pricing, honest timelines, and reliable delivery — always.' },
              { icon: Eye,   title: 'Innovation', desc: 'Continuously evolving our offerings to stay ahead of gifting trends.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center group hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl border border-gold-200 bg-cream-100 flex items-center justify-center group-hover:shadow-gold-sm transition-all duration-300">
                  <Icon size={20} className="text-gold-600" />
                </div>
                <h3 className="font-display text-base font-semibold text-charcoal-900 mb-2">{title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="page-section bg-cream-100 border-t border-gold-100">
        <div className="section-inner">
          <div className="section-center">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title mt-2">Our Services</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { emoji: '🎯', title: 'Bulk Order Management', desc: 'Efficiently handle orders from 50 to 50,000 units with streamlined logistics and quality control.' },
              { emoji: '🖨️', title: 'Brand Customisation',   desc: 'Full logo printing, custom packaging, branded ribbon, and personalised message cards.' },
              { emoji: '🚚', title: 'Pan India Delivery',     desc: 'Reliable last-mile delivery across all major cities and tier-2/3 towns in India.' },
              { emoji: '📊', title: 'Catalogue Consultation', desc: 'Our experts help you select the right products matching your budget and occasion.' },
              { emoji: '🌱', title: 'Eco-Conscious Gifting',  desc: 'Sustainable, recyclable, and ethically sourced gifting options available on request.' },
              { emoji: '📋', title: 'Quick Quotation',        desc: 'Receive a detailed, itemised quote within 24 hours of submitting your inquiry.' },
            ].map((s) => (
              <div key={s.title} className="card p-6 group hover:-translate-y-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{s.emoji}</div>
                <h3 className="font-display text-base font-semibold text-charcoal-900 mb-2">{s.title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-section bg-white border-t border-gold-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-2">Since 2016</p>
            <h2 className="section-title">Our Journey</h2>
            <div className="gold-divider" />
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-gold-400 bg-white mt-1.5 z-10" />
                  <div className={`ml-10 md:ml-0 md:w-5/12 card p-5 hover:-translate-y-0.5 ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <span className="font-display text-gold-600 font-bold text-lg">{m.year}</span>
                    <p className="text-charcoal-500 text-sm mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="page-section bg-cream-100 border-t border-gold-100">
        <div className="section-inner">
          <div className="section-center">
            <p className="section-label">The Team</p>
            <h2 className="section-title mt-2">Meet the Gifting Experts</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="card p-6 text-center group hover:-translate-y-1">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{t.emoji}</div>
                <h3 className="font-semibold text-charcoal-900 text-sm">{t.name}</h3>
                <p className="text-charcoal-400 text-xs mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center border-t border-gold-100"
               style={{ background: 'linear-gradient(135deg,#fdf8ec,#faf3d8)' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="section-title mb-4">Let's Create Something Special</h2>
          <p className="text-charcoal-500 mb-8">Request a quote today and let our team craft the perfect gifting solution for your brand.</p>
          <Link to="/contact" id="about-cta-btn" className="btn-primary">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
