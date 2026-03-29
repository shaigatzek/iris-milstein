'use client'

import Image from 'next/image'
import { useState, FormEvent, useEffect } from 'react'
import Logo from '@/components/Logo'

/* ─── TESTIMONIALS ───────────────────────────────────────── */
const testimonials = [
  {
    quote: 'איריס היא הסוכנת המקצועית, האמינה והישרה ביותר שעבדתי איתה. עם סבלנות ומקצועיות עזרה לנו למצוא את בית חלומותינו. כל התהליך היה מהנה עם איריס.',
    name: 'ד.כ.',
    location: 'רמת השרון',
    deal: 'רכישת נכס בהרצליה פיתוח',
  },
  {
    quote: 'ניגשנו לתהליך עם ציפיות גבוהות — איריס עלתה עליהן. הגישה שלה לנכסים שאינם בשוק הפתוח פתחה בפנינו אפשרויות שלא ידענו שקיימות. שקטים ובטוחים לאורך כל הדרך.',
    name: 'מ.ל.',
    location: 'תל אביב',
    deal: 'וילה פרטית, כפר שמריהו',
  },
  {
    quote: 'כסוכנת נדל"ן ועורכת דין גם יחד, איריס מעניקה שירות שלא מצאנו אצל אף אחד אחר. כל ההיבטים המשפטיים טופלו באלגנטיות ובמקצועיות מרשימה.',
    name: 'א.ש.',
    location: 'הרצליה',
    deal: 'ניהול עסקת נדל"ן יוקרה',
  },
]

/* ─── LEAD FORM ──────────────────────────────────────────── */
function LeadFormHe() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'he' }),
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
        <div className="text-rose text-3xl mb-3 font-hebrew">תודה</div>
        <p className="text-charcoal/70 text-sm leading-relaxed">
          פנייתך התקבלה בהצלחה.<br />
          איריס תיצור איתך קשר תוך 24 שעות.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        className="input-luxury text-right"
        placeholder="שם מלא"
        required
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="input-luxury text-right"
        placeholder="טלפון"
        required
        type="tel"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <input
        className="input-luxury text-right"
        placeholder="כתובת אימייל (אופציונלי)"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-rose mt-2 disabled:opacity-60 font-hebrew-sans"
      >
        {status === 'loading' ? 'שולח...' : 'קבע/י פגישת ייעוץ פרטית'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs text-center">אירעה שגיאה. אנא נסה/י שוב.</p>
      )}
      <p className="text-[10px] text-charcoal/40 leading-relaxed text-center mt-2">
        פרטייך יישמרו בסודיות מוחלטת ולא יועברו לגורמים שלישיים.
      </p>
    </form>
  )
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function NavBarHe() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        {/* Logo — on left in RTL = right side visually */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/he" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">בית</a>
          <a href="#locations" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">אזורים</a>
          <a href="#about" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">אודות</a>
          <a href="#testimonials" className="text-white/70 hover:text-white text-xs tracking-widest uppercase transition-colors">המלצות</a>
          <a href="/" className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors">EN</a>
        </div>

        {/* Logo — flex-shrink-0 keeps it in normal flow, right side in RTL */}
        <a href="/he" className="flex-shrink-0">
          <Image src="/images/logo-white.png" alt="Iris Milstein" width={160} height={48} className="h-10 w-auto" style={{ mixBlendMode: 'screen' }} />
        </a>

        {/* Right: phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+97252252577" className="text-white/80 text-xs hover:text-white transition-colors">
            052-2525277
          </a>
          <a href="#contact" className="bg-rose hover:bg-rose-dark text-white text-xs tracking-widest uppercase px-5 py-2.5 transition-colors font-hebrew-sans">
            צפייה פרטית
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark border-t border-white/10 px-5 py-4 space-y-4">
          <a href="/he" className="block text-white/70 text-sm font-hebrew-sans" onClick={() => setMenuOpen(false)}>ראשי</a>
          <a href="#locations" className="block text-white/70 text-sm font-hebrew-sans" onClick={() => setMenuOpen(false)}>אזורים</a>
          <a href="#about" className="block text-white/70 text-sm font-hebrew-sans" onClick={() => setMenuOpen(false)}>אודות</a>
          <a href="#testimonials" className="block text-white/70 text-sm font-hebrew-sans" onClick={() => setMenuOpen(false)}>המלצות</a>
          <a href="tel:+97252252577" className="block text-white/80 text-sm">052-2525277</a>
          <a href="#contact" className="block bg-rose text-white text-sm px-4 py-3 text-center font-hebrew-sans" onClick={() => setMenuOpen(false)}>צפייה פרטית</a>
        </div>
      )}
    </nav>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function HebrewPage() {
  return (
    <>
      <NavBarHe />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative flex items-end md:items-center pt-16 min-h-[100svh] md:min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/property-garden.jpeg"
            alt="נכס יוקרה"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dark/80 via-dark/50 to-dark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full pb-16 md:py-0 md:min-h-screen flex items-end md:items-center">
          <div className="flex flex-col md:flex-row-reverse md:items-center gap-10 md:gap-20 w-full">

            {/* Headline */}
            <div className="flex-1 max-w-xl">
              <div className="flex items-center gap-3 mb-6 flex-row-reverse md:flex-row">
                <div className="w-8 h-px bg-rose" />
                <span className="text-xs tracking-[0.2em] uppercase text-white/80 font-hebrew-sans">נכסים אקסקלוסיביים מחוץ לשוק</span>
              </div>
              <h1 className="font-hebrew text-white leading-tight mb-5">
                <span className="block text-4xl md:text-6xl font-light">הנכס שחיכית לו</span>
                <span className="block text-4xl md:text-6xl font-light text-rose">על קו הים</span>
              </h1>
              <p className="text-white/75 text-base md:text-lg leading-relaxed font-light mb-2 font-hebrew-sans">
                וילות ובתי יוקרה פרטיים בהרצליה פיתוח וכפר שמריהו.
              </p>
              <p className="text-white/55 text-sm font-light mb-6 font-hebrew-sans">
                נכסים שאינם מוצעים לציבור — אך ורק ללקוחות נבחרים.
              </p>
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 text-white/60 text-xs font-hebrew-sans">
                  <svg className="w-3.5 h-3.5 text-rose flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  גישה ללקוחות נבחרים בלבד
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs font-hebrew-sans">
                  <svg className="w-3.5 h-3.5 text-rose flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  סודיות מוחלטת
                </div>
              </div>
              {/* Mobile CTA */}
              <a
                href="#contact"
                className="md:hidden inline-block bg-rose hover:bg-rose-dark text-white text-xs tracking-widest uppercase px-8 py-4 transition-colors font-hebrew-sans"
              >
                לפגישת ייעוץ פרטית
              </a>
            </div>

            {/* Form — desktop only */}
            <div className="hidden md:block w-full md:w-[400px] bg-ivory/95 backdrop-blur-sm p-8 shadow-2xl">
              <h2 className="font-hebrew text-charcoal text-xl mb-1">השאירו פרטים לפגישת ייעוץ</h2>
              <p className="text-charcoal/50 text-xs mb-7 font-hebrew-sans">ניצור איתכם קשר בהקדם</p>
              <LeadFormHe />
            </div>

          </div>
        </div>
      </section>

      {/* ── MOBILE FORM (below hero, mobile only) ─────────── */}
      <section className="md:hidden bg-ivory">
        <div id="contact" className="scroll-mt-20 px-5 pt-10 pb-10">
          <h2 className="font-hebrew text-charcoal text-2xl mb-1">השאירו פרטים לפגישת ייעוץ</h2>
          <p className="text-charcoal/50 text-xs mb-7 font-hebrew-sans">ניצור איתכם קשר בהקדם</p>
          <LeadFormHe />
        </div>
      </section>

      {/* ── LOCATIONS ─────────────────────────────────────── */}
      <section id="locations" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="section-label-dark mb-3 font-hebrew-sans">האזורים המובחרים</div>
            <h2 className="font-hebrew text-3xl md:text-5xl text-charcoal font-light">
              הכתובות הנחשקות ביותר בישראל
            </h2>
            <div className="w-12 h-px bg-rose mx-auto mt-5" />
            <p className="text-text-light text-sm md:text-base max-w-xl mx-auto mt-5 leading-relaxed font-hebrew-sans font-light">
              שני אזורים אקסקלוסיביים, כל אחד עם אורח חיים ייחודי — פרטיות מוחלטת, אדריכלות מרהיבה ואיכות חיים ללא פשרות.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <div className="relative h-72 md:h-96 overflow-hidden mb-6">
                <Image src="/images/hero-bg.jpeg" alt="הרצליה פיתוח" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-4 right-4 bg-dark/80 text-white text-xs px-3 py-1.5 font-hebrew-sans">
                  שווי ממוצע $15M+
                </div>
              </div>
              <div className="section-label mb-2 font-hebrew-sans">היכן החדשנות פוגשת את הים</div>
              <h3 className="font-hebrew text-2xl md:text-3xl text-charcoal font-light mb-3">הרצליה פיתוח</h3>
              <p className="text-text-light text-sm leading-relaxed mb-5 font-hebrew-sans">
                הכתובת החופית היוקרתית ביותר בישראל, בה גרים מנהלי הייטק, בעלי הון ומשפחות מהעולם. צעדים מהים התיכון, צמוד לסיליקון ואדי ולמרינה הגדולה בישראל.
              </p>
              <ul className="space-y-3">
                {[
                  ['סיליקון ואדי', 'מיקרוסופט, גוגל וחברות הייטק מובילות — דקות ספורות'],
                  ['מרינה הרצליה', 'יעד השייט המוביל של ישראל, מסעדות כוכבים'],
                  ['חינוך בינלאומי', 'בתי ספר בינלאומיים ויוקרתיים באזור'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3 flex-row-reverse">
                    <div className="w-1 h-1 rounded-full bg-rose mt-2 flex-shrink-0" />
                    <div className="text-right">
                      <span className="text-charcoal text-xs font-medium font-hebrew-sans">{title}</span>
                      <span className="text-text-light text-xs font-hebrew-sans"> — {desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="relative h-72 md:h-96 overflow-hidden mb-6">
                <Image src="/images/property-pool.jpeg" alt="כפר שמריהו" fill className="object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute bottom-4 right-4 bg-dark/80 text-white text-xs px-3 py-1.5 font-hebrew-sans">
                  פרטיות מוחלטת
                </div>
              </div>
              <div className="section-label mb-2 font-hebrew-sans">היכן הפרטיות פוגשת את המורשת</div>
              <h3 className="font-hebrew text-2xl md:text-3xl text-charcoal font-light mb-3">כפר שמריהו</h3>
              <p className="text-text-light text-sm leading-relaxed mb-5 font-hebrew-sans">
                הכפר הסגור והיוקרתי ביותר בישראל — בית לדיפלומטים, שושלות עסקיות ומשפחות ותיקות. אחוזות מגודרות, גנים עתיקים ושקט מוחלט.
              </p>
              <ul className="space-y-3">
                {[
                  ['אחוזות דוריות', 'וילות היסטוריות שנדיר למצוא בשוק הפתוח'],
                  ['פרטיות מוחלטת', 'כפר סגור עם תשתיות אבטחה מתקדמות'],
                  ['קרבה לתל אביב', '15 דקות לעיר, עולם אחר בתוכה'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3 flex-row-reverse">
                    <div className="w-1 h-1 rounded-full bg-rose mt-2 flex-shrink-0" />
                    <div className="text-right">
                      <span className="text-charcoal text-xs font-medium font-hebrew-sans">{title}</span>
                      <span className="text-text-light text-xs font-hebrew-sans"> — {desc}</span>
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
            'interior-kitchen.jpeg',
            'property-exterior.jpeg',
            'property-pool.jpeg',
            'interior-dining.jpeg',
            'property-garden.jpeg',
            'hero-bg.jpeg',
          ].map((img) => (
            <div key={img} className="relative h-32 md:h-48 overflow-hidden group">
              <Image src={`/images/${img}`} alt="נכס" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative h-[480px] md:h-[600px] overflow-hidden">
                <Image src="/images/interior-dining.jpeg" alt="איריס מילשטיין" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 border border-rose/30 -z-10" />
            </div>
            <div className="order-1 md:order-2 text-right">
              <div className="section-label mb-4 font-hebrew-sans">אודות איריס</div>
              <h2 className="font-hebrew text-3xl md:text-4xl text-charcoal font-light leading-tight mb-6">
                המדריכה האמינה שלך<br />בשוק הנבחר ביותר בישראל
              </h2>
              <div className="w-10 h-px bg-rose mb-7 mr-0 ml-auto" />
              <p className="text-text-light text-sm leading-relaxed mb-5 font-hebrew-sans">
                איריס מילשטיין מביאה מומחיות כפולה ונדירה לשוק הנדל"ן היוקרתי — יועצת נדל"ן מנוסה ועורכת דין מורשית, עם שורשים עמוקים בהרצליה פיתוח ובכפר שמריהו.
              </p>
              <p className="text-text-light text-sm leading-relaxed mb-5 font-hebrew-sans">
                לקוחותיה — מנהלי ייטק, משפחות בינלאומיות ואנשי עסקים — סומכים עליה בשל שיקול הדעת המוחלט שלה, הידע המשפטי המעמיק וגישתה לנכסים שלא מגיעים לשוק הפתוח.
              </p>
              <p className="text-text-light text-sm leading-relaxed mb-8 font-hebrew-sans">
                בין אם אתם רוכשים נכס ראשון, נכס נוסף להשקעה, או מחפשים את הבית המושלם להתיישבות — איריס מספקת את הבהירות, הביטחון והליווי האישי שרכישה ברמה זו מחייבת.
              </p>
              <div className="flex flex-wrap gap-6 mb-8 justify-end">
                {[['15+', 'שנות ניסיון'], ['100%', 'נכסים מחוץ לשוק'], ['3', 'שפות']].map(([num, label]) => (
                  <div key={label} className="border-r-2 border-rose pr-4">
                    <div className="font-hebrew text-2xl text-charcoal">{num}</div>
                    <div className="text-text-light text-xs mt-0.5 font-hebrew-sans">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-end">
                <a href="tel:+97252252577" className="flex items-center gap-2 text-charcoal hover:text-rose transition-colors text-sm font-hebrew-sans flex-row-reverse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  052-2525277
                </a>
                <a
                  href={`https://wa.me/97252252577`}
                  className="flex items-center gap-2 text-charcoal hover:text-rose transition-colors text-sm font-hebrew-sans flex-row-reverse"
                  target="_blank" rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section id="testimonials" className="bg-taupe py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <div className="section-label-dark mb-3 font-hebrew-sans">לקוחות ממליצים</div>
            <h2 className="font-hebrew text-3xl md:text-5xl text-charcoal font-light">
              אמון של משפחות מובחרות
            </h2>
            <div className="w-12 h-px bg-rose mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-ivory p-8 shadow-sm text-right">
                <div className="flex gap-0.5 mb-5 flex-row-reverse">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-rose fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-charcoal/80 text-sm leading-relaxed mb-6 font-hebrew-sans">
                  "{t.quote}"
                </blockquote>
                <div>
                  <div className="text-charcoal font-medium text-sm font-hebrew-sans">{t.name}</div>
                  <div className="text-text-light text-xs mt-0.5 font-hebrew-sans">{t.location}</div>
                  <div className="text-rose text-xs mt-1 font-hebrew-sans">{t.deal}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-dark py-16 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4 font-hebrew-sans">צרו קשר</div>
          <h2 className="font-hebrew text-3xl md:text-4xl text-white font-light mb-4">
            מוכנים לגלות מה זמין?
          </h2>
          <p className="text-white/50 text-sm mb-8 font-hebrew-sans font-light">
            רוב הנכסים שלנו לא מוצעים לציבור. קבעו ייעוץ אישי וגלו מה זמין מחוץ לשוק.
          </p>
          <a href="#contact" className="inline-block bg-rose hover:bg-rose-dark text-white text-xs tracking-widest uppercase px-10 py-4 transition-colors font-hebrew-sans">
            לפגישת ייעוץ פרטית
          </a>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="bg-dark border-t border-white/5 py-10 px-5 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/images/logo-white.png" alt="Iris Milstein" width={140} height={42} className="h-9 w-auto opacity-80" style={{ mixBlendMode: 'screen' }} />
          <div className="flex flex-wrap justify-center gap-6 text-white/40 text-xs font-hebrew-sans">
            <a href="tel:+97252252577" className="hover:text-white transition-colors">052-2525277</a>
            <a href="mailto:iris@square34.com" className="hover:text-white transition-colors">iris@square34.com</a>
            <a href="/" className="hover:text-white transition-colors">English</a>
          </div>
          <p className="text-white/25 text-xs text-center font-hebrew-sans">
            © {new Date().getFullYear()} Iris Milstein Luxury Properties. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </>
  )
}
