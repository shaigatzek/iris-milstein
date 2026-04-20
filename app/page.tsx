'use client'

import Image from 'next/image'
import { useState, FormEvent, useEffect } from 'react'
import Logo from '@/components/Logo'

/* ─── TESTIMONIALS DATA ──────────────────────────────────── */
const testimonials = [
  {
    quote:
      'Iris brings something completely different to real estate! For Iris, a property is not just walls and a few million, it\'s a home. She truly understands what her clients are looking for.',
    name: 'Tsofnat',
    location: 'Herzliya Pituach',
    deal: 'Property Purchase',
  },
  {
    quote:
      'I\'ve turned to Iris more than once, because she succeeded in finding me a property that matched my expectations. She did so with professionalism, integrity, and close personal guidance throughout the entire process, above and beyond what was expected. Highly recommended!',
    name: 'Shlomit',
    location: 'Herzliya Pituach',
    deal: 'Property Search',
  },
  {
    quote:
      'Iris, thank you for the good, reliable and professional service. The personal attention, the close guidance throughout the entire process, and the attention to detail made everything so much simpler and easier.',
    name: 'Adi',
    location: 'Herzliya Pituach',
    deal: 'Property Transaction',
  },
  {
    quote:
      'I thank Iris for her professionalism and warm personal attention. I chose to give Iris exclusivity and it proved to be an excellent decision. The property was rented professionally and quickly.',
    name: 'Galya E.',
    location: 'Herzliya Pituach',
    deal: 'Rental',
  },
  {
    quote:
      'I highly recommend Iris Milstein. She takes her work with the utmost seriousness and gives it her all. This recommendation is only valid for those who are looking for results and peace of mind.',
    name: 'Ohad',
    location: 'Herzliya Pituach',
    deal: 'Rental',
  },
  {
    quote:
      'Great service. Professional work with a lot of patience. Iris did a great job and after a few weeks we signed the rental agreement with a family from Germany. Iris has a deep understanding of the legal aspects. Very useful. I would certainly hire Iris Milstein in the future.',
    name: 'Roni',
    location: 'Herzliya Pituach',
    deal: 'Rental Agreement',
  },
  {
    quote:
      'Iris is wonderful, efficient, polite and calm. You can ask for things and she responds promptly with quick answers. In short, a pleasure, highly recommended to everyone.',
    name: 'Naama',
    location: 'Herzliya Pituach',
    deal: 'Property Transaction',
  },
  {
    quote:
      'Iris is an uncommon real estate agent. She is honest, polite, creative and attentive. I worked with her on several deals and was very satisfied!',
    name: 'Liat',
    location: 'Herzliya Pituach',
    deal: 'Multiple Deals',
  },
  {
    quote:
      'Iris is diligent, creative, loyal and incredibly trustworthy. She has helped us greatly with property matters and years later continues to assist and give good advice across various areas of real estate, with warmth, reliability and great wisdom.',
    name: 'Efrat',
    location: 'Herzliya Pituach',
    deal: 'Long-term Advisory',
  },
]

/* ─── LEAD FORM ──────────────────────────────────────────── */
function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({})

  const validate = () => {
    const e: { phone?: string; email?: string } = {}
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 9) e.phone = 'Please enter a valid phone number (min. 9 digits)'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'en' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-rose text-3xl mb-3 font-serif">Thank You</div>
        <p className="text-charcoal/70 text-sm leading-relaxed">
          Your request has been received.<br />
          Iris will be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        className="input-luxury"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <div>
        <input
          className="input-luxury"
          placeholder="International Contact Number"
          required
          type="tel"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <input
          className="input-luxury"
          placeholder="Email Address (optional)"
          type="text"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <select
        className="input-luxury appearance-none"
        value={form.interest}
        onChange={e => setForm({ ...form, interest: e.target.value })}
      >
        <option value="" disabled>Primary Interest</option>
        <option value="buy">Purchase — Primary Residence</option>
        <option value="second">Purchase — Second Home</option>
        <option value="investment">Investment Property</option>
        <option value="relocation">Relocation to Israel</option>
        <option value="other">Other Enquiry</option>
      </select>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-rose mt-2 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Secure My Private Viewing'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
      )}
      <p className="text-[10px] text-charcoal/40 leading-relaxed text-center mt-2">
        Your data is treated with the highest level of confidentiality, adhering to global
        standards for UHNWI clientele. Access is reserved for pre-qualified buyers with
        verified Proof of Funds (POF).
      </p>
    </form>
  )
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Fix: ensure page always starts at top
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <Image src="/images/logo-cmyk-blush.png" alt="Iris Milstein Real Estate" width={260} height={72} className="h-[72px] w-auto" priority />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">Home</a>
          <a href="#locations" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">Locations</a>
          <a href="#about" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">About</a>
          <a href="#testimonials" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">Testimonials</a>
          <a href="/he" className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">עברית</a>
        </div>

        {/* Right: phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+97252252577" className="text-white/80 text-xs hover:text-white transition-colors">
            +972-52-2525277
          </a>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/972502525277" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.facebook.com/iris.milstein" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/iris_milstein/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark border-t border-white/10 px-5 py-4 space-y-4">
          <a href="/" className="block text-white/70 text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#locations" className="block text-white/70 text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Locations</a>
          <a href="#about" className="block text-white/70 text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#testimonials" className="block text-white/70 text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <a href="/he" className="block text-white/50 text-xs tracking-widest uppercase" onClick={() => setMenuOpen(false)}>עברית</a>
          <a href="tel:+97252252577" className="block text-white/80 text-xs">+972-52-2525277</a>
          <a href="#contact" className="block bg-rose text-white text-xs tracking-widest uppercase px-4 py-3 text-center" onClick={() => setMenuOpen(false)}>Private Viewing</a>
        </div>
      )}
    </nav>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function EnglishPage() {
  return (
    <>
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────── */}
      {/* Mobile: full-screen image with text only. Desktop: text + form side by side */}
      <section className="relative flex items-end md:items-center pt-16 min-h-[100svh] md:min-h-screen">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/property-livingroom.png"
            alt="Luxury estate"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pb-16 md:py-0 md:min-h-screen flex items-end md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20 w-full">

            {/* Headline */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-rose" />
                <span className="section-label text-white/80">Off-Market Exclusives</span>
              </div>
              <h1 className="font-serif text-white leading-tight mb-5">
                <span className="block text-4xl md:text-6xl font-light">Secure Your Legacy</span>
                <span className="block text-4xl md:text-6xl font-light text-rose">Off-Market</span>
                <span className="block text-4xl md:text-6xl font-light">Luxury Estates</span>
              </h1>
              <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-md font-sans font-light mb-2">
                A Permanent Family Anchor in Israel's Tech & Coastal Elite Enclaves.
              </p>
              <p className="text-white/60 text-sm font-sans font-light mb-8">
                Herzliya Pituach & Kfar Shmaryahu.<br />
                <em className="not-italic font-light">Discreetly Presented. Globally Secured.</em>
              </p>
              <div className="flex flex-wrap gap-6 mb-8 md:mb-0">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <svg className="w-3.5 h-3.5 text-rose" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pre-Qualified Access
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <svg className="w-3.5 h-3.5 text-rose" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Absolute Discretion
                </div>
              </div>
              {/* Mobile CTA — scrolls to form below */}
              <a
                href="#contact"
                className="md:hidden inline-block mt-4 bg-rose hover:bg-rose-dark text-white text-xs tracking-widest uppercase px-8 py-4 transition-colors"
              >
                Request Private Access
              </a>
            </div>

            {/* Form — hidden on mobile (shown below hero), visible on desktop */}
            <div className="hidden md:block w-full md:w-[420px] bg-ivory/95 backdrop-blur-sm p-8 shadow-2xl">
              <h2 className="font-serif text-charcoal text-xl mb-1">Request Exclusive Portfolio Access</h2>
              <p className="text-charcoal/50 text-xs tracking-wider uppercase mb-7">Pre-Qualification Required</p>
              <LeadForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── MOBILE FORM (below hero, mobile only) ─────────── */}
      <section className="md:hidden bg-ivory shadow-inner">
        {/* scroll-mt ensures navbar doesn't cover the heading */}
        <div id="contact" className="scroll-mt-20 px-5 pt-10 pb-10">
          <h2 className="font-serif text-charcoal text-2xl mb-1">Request Exclusive Portfolio Access</h2>
          <p className="text-charcoal/50 text-xs tracking-wider uppercase mb-7">Pre-Qualification Required</p>
          <LeadForm />
        </div>
      </section>

      {/* ── LOCATIONS ─────────────────────────────────────── */}
      <section id="locations" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="section-label-dark mb-3">Premier Locations</div>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light">
              Israel's Most Coveted Addresses
            </h2>
            <div className="w-12 h-px bg-rose mx-auto mt-5" />
            <p className="text-text-light text-sm md:text-base max-w-xl mx-auto mt-5 leading-relaxed font-light">
              Two distinct enclaves, each offering an unparalleled lifestyle — chef-grade kitchens,
              private pools, and the soothing sound of waves from your private vantage point.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Herzliya */}
            <div>
              <div className="relative h-72 md:h-96 overflow-hidden mb-6">
                <Image src="/images/property-swimming-pool.jpeg" alt="Herzliya Pituach luxury swimming pool villa" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-4 left-4 bg-dark/80 text-white text-xs px-3 py-1.5 font-sans">
                  $15M+ Average Estate Value
                </div>
              </div>
              <div className="section-label mb-2">Where Innovation Meets the Sea</div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-light mb-3">Herzliya Pituach</h3>
              <p className="text-text-light text-sm leading-relaxed mb-5">
                Israel's most prestigious coastal address, where tech titans and global executives find their sanctuary.
                Steps from the Mediterranean, adjacent to the world-renowned Silicon Wadi, and home to Israel's largest Marina.
              </p>
              <ul className="space-y-3">
                {[
                  ['Silicon Wadi', 'Headquarters of Microsoft, Google, and leading global tech firms'],
                  ['Herzliya Marina', "Israel's premier yachting destination with world-class dining"],
                  ['Elite Education', "Access to Israel's finest international schools and institutions"],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <div className="w-1 h-1 rounded-full bg-rose mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-charcoal text-xs font-medium">{title}</span>
                      <span className="text-text-light text-xs"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kfar Shmaryahu */}
            <div>
              <div className="relative h-72 md:h-96 overflow-hidden mb-6">
                <Image src="/images/property-garden.jpeg" alt="Kfar Shmaryahu" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-4 left-4 bg-dark/80 text-white text-xs px-3 py-1.5 font-sans">
                  Ultra-Private Enclave
                </div>
              </div>
              <div className="section-label mb-2">Where Privacy Meets Legacy</div>
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-light mb-3">Kfar Shmaryahu</h3>
              <p className="text-text-light text-sm leading-relaxed mb-5">
                Israel's most secretive residential village — home to diplomats, business dynasties, and old-money families
                for generations. Walled estates, ancient gardens, and absolute discretion.
              </p>
              <ul className="space-y-3">
                {[
                  ['Generational Estates', 'Historic villas rarely available on the open market'],
                  ['Ultimate Privacy', 'Gated, secluded, with private security infrastructure'],
                  ['Proximity to Tel Aviv', '15 minutes to the city, a world away from it'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3">
                    <div className="w-1 h-1 rounded-full bg-rose mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-charcoal text-xs font-medium">{title}</span>
                      <span className="text-text-light text-xs"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────── */}
      <section className="bg-taupe py-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {[
            'home-exterior.jpeg',
            'pool-yard.jpeg',
            'property-exterior.jpeg',
            'living-room.jpeg',
            'living-room-area.jpeg',
            'white-bedroom.jpeg',
          ].map((img) => (
            <div key={img} className="relative h-32 md:h-48 overflow-hidden group">
              <Image
                src={`/images/${img}`}
                alt="Property"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <div className="section-label mb-4">About Iris</div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal font-light leading-tight mb-1">
                Iris Milstein
              </h2>
              <p className="text-text-light text-xs tracking-widest uppercase mb-6">Real Estate | Herzliya Pituach &amp; Kfar Shmaryahu</p>
              <div className="w-10 h-px bg-rose mb-7" />
              <p className="text-text-light text-sm leading-relaxed mb-5">
                With over 25 years spanning real estate, law, and marketing, Iris Milstein brings a rare combination of legal precision, market instinct, and creative vision to every transaction. Her career began at one of Israel's premier law firms, where she developed the analytical rigor and contractual expertise that still define her approach today. Combined with a deep background in advertising and marketing, Iris offers clients something few agents can, a complete, 360-degree view of every deal.
              </p>
              <p className="text-text-light text-sm leading-relaxed mb-5">
                <span className="text-charcoal font-medium">She Knows This Neighborhood.</span> As a Herzliya Pituach resident for over 25 years, Iris doesn't just sell this neighborhood, she lives it. She knows the value of every street, every view, and every property condition. That intimate knowledge is something no algorithm can replicate.
              </p>
              <p className="text-text-light text-sm leading-relaxed mb-5">
                <span className="text-charcoal font-medium">A Practice Built on Trust.</span> Iris's success is built almost exclusively on referrals, a testament to the relationships she builds and the results she delivers. She earns her clients' trust by working tirelessly on their behalf, offering candid advice.
              </p>
              <p className="text-charcoal text-sm font-medium mb-8">
                Integrity. Energy. Discretion. That's the Iris Milstein standard.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="border-l-2 border-rose pl-4">
                  <div className="font-serif text-2xl text-charcoal">25+</div>
                  <div className="text-text-light text-xs mt-0.5">Years of Expertise</div>
                </div>
                <div className="border-l-2 border-rose pl-4">
                  <div className="font-serif text-2xl text-charcoal">100%</div>
                  <div className="text-text-light text-xs mt-0.5">Referral Based</div>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href="tel:+97252252577"
                  className="flex items-center gap-2 text-charcoal hover:text-rose transition-colors text-sm"
                >
                  <svg className="w-4 h-4" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +972-52-2525277
                </a>
                <a
                  href="mailto:iris@irismilstein.com"
                  className="flex items-center gap-2 text-charcoal hover:text-rose transition-colors text-sm"
                >
                  <svg className="w-4 h-4" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  iris@irismilstein.com
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-[180px] md:w-[270px] overflow-hidden" style={{aspectRatio: '3/4'}}>
                <Image src="/images/iris-profile.jpeg" alt="Iris Milstein luxury real estate expert Herzliya Pituach" fill className="object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section id="testimonials" className="bg-taupe py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="section-label-dark mb-3">Client Success Stories</div>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light">
              Trusted by Discerning Families Worldwide
            </h2>
            <div className="w-12 h-px bg-rose mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-ivory p-8 shadow-sm">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-rose fill-current" width="14" height="14" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-charcoal/80 text-sm leading-relaxed mb-6 italic font-serif">
                  "{t.quote}"
                </blockquote>
                <div>
                  <div className="text-charcoal font-medium text-sm">{t.name}</div>
                  <div className="text-rose text-xs mt-1">{t.deal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BAND ────────────────────────────────── */}
      <section className="bg-dark py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="section-label text-white/50 mb-4">Begin Your Search</div>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-4">
            Ready to Explore What's Available?
          </h2>
          <p className="text-white/50 text-sm mb-8 font-light">
            Most of our portfolio is never listed publicly. Schedule a private consultation to discover what's available off-market.
          </p>
          <a
            href="#contact"
            className="inline-block bg-rose hover:bg-rose-dark text-white text-xs tracking-widest uppercase px-10 py-4 transition-colors"
          >
            Request Private Portfolio Access
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-dark border-t border-white/5 py-10 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Image src="/images/logo-cmyk-blush.png" alt="Iris Milstein Real Estate" width={260} height={72} className="h-[72px] w-auto opacity-80" />
          </div>
          <div className="flex items-center gap-5">
            <a href="https://wa.me/972502525277" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.facebook.com/iris.milstein" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/iris_milstein/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4B4AC"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <p className="text-white/25 text-xs text-center">
            © {new Date().getFullYear()} Iris Milstein Real Estate. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
