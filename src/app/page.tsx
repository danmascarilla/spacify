'use client'

import Link from 'next/link'
import { useState } from 'react'
import SpacifyLogo from '@/components/SpacifyLogo'

// ─── Static data ──────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🧱',
    title: 'Configurador 3D en tiempo real',
    desc: 'Tu cliente mueve sliders y ve la pérgola cambiar al instante. Ancho, fondo, altura, lamas, color. Sin esperas, sin renders manuales.',
  },
  {
    icon: '💶',
    title: 'Precio automático',
    desc: 'El presupuesto se calcula solo según las opciones elegidas. Tú defines los precios base y suplementos; el sistema hace el resto.',
  },
  {
    icon: '📸',
    title: '"Verlo en mi terraza"',
    desc: 'El cliente sube una foto de su espacio y superpone la pérgola encima para visualizar el resultado antes de comprar.',
  },
  {
    icon: '📱',
    title: 'Funciona en cualquier dispositivo',
    desc: 'Tablet en el showroom, móvil en casa del cliente, ordenador en la oficina. Mismo configurador, sin instalar nada.',
  },
  {
    icon: '⚡',
    title: 'Listo en días, no meses',
    desc: 'Tu catálogo configurado en menos de una semana. Nosotros nos encargamos de la parte técnica; tú solo nos das medidas y precios.',
  },
  {
    icon: '🔗',
    title: 'Se integra en tu web actual',
    desc: 'Un simple enlace o iframe en tu web. No hace falta cambiar nada más. O te montamos una landing completa si la necesitas.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Nos mandas tu catálogo',
    desc: 'Modelos, dimensiones, acabados y precios. Con un Excel o una llamada de 30 minutos es suficiente.',
  },
  {
    n: '02',
    title: 'Configuramos el 3D',
    desc: 'En menos de una semana tienes el configurador con tu marca, tus colores y tus productos.',
  },
  {
    n: '03',
    title: 'Lo publicas y vendes',
    desc: 'Un enlace en tu web o en el WhatsApp al cliente. Los presupuestos llegan solos a tu correo.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'Antes tardaba 3 horas en hacer un presupuesto. Ahora el cliente lo hace solo y me llega todo por email. Ha sido un cambio enorme.',
    name: 'Carlos M.',
    company: 'Pergotex, Valencia',
  },
  {
    quote: 'Mis clientes quedan impresionados cuando ven el 3D en el móvil. Ya no tengo que explicarles cómo va a quedar porque lo ven ellos mismos.',
    name: 'Ana R.',
    company: 'Pérgolas del Sur, Sevilla',
  },
  {
    quote: 'Lo pusimos en la web un martes y el viernes ya tenía 4 presupuestos nuevos. El retorno ha sido inmediato.',
    name: 'Miguel T.',
    company: 'AluPergo, Barcelona',
  },
]

const PLANS = [
  {
    name: 'Starter',
    monthly: 79,
    desc: 'Para empezar a probar',
    features: [
      '1 modelo de pérgola',
      'Configurador 3D básico',
      'Presupuestos por email',
      'Soporte por email',
    ],
    cta: 'Empezar gratis 14 días',
    highlight: false,
  },
  {
    name: 'Pro',
    monthly: 179,
    desc: 'El más vendido',
    features: [
      'Hasta 5 modelos',
      'Configurador 3D completo',
      '"Verlo en tu terraza"',
      'Integración en tu web',
      'Estadísticas de uso',
      'Soporte prioritario',
    ],
    cta: 'Empezar gratis 14 días',
    highlight: true,
  },
  {
    name: 'Business',
    monthly: 349,
    desc: 'Para equipos y distribuidores',
    features: [
      'Modelos ilimitados',
      'Marca blanca completa',
      'Acceso multi-usuario',
      'API para tu ERP/CRM',
      'Onboarding personalizado',
      'SLA garantizado',
    ],
    cta: 'Hablar con ventas',
    highlight: false,
  },
]

const FAQS = [
  {
    q: '¿Necesito saber de programación?',
    a: 'No. Nosotros nos encargamos de todo. Tú solo nos das información de tu catálogo y en unos días tienes el configurador funcionando.',
  },
  {
    q: '¿Cuánto tarda en estar listo?',
    a: 'Entre 3 y 7 días desde que nos mandas el catálogo, dependiendo de la complejidad y el plan elegido.',
  },
  {
    q: '¿Puedo cambiar precios o añadir modelos?',
    a: 'Sí, tienes un panel de control donde puedes actualizar precios, acabados y opciones sin tocar código.',
  },
  {
    q: '¿Y si ya tengo mi propia web?',
    a: 'El configurador se integra con un enlace o un iframe. En 5 minutos está en tu web sin tocar el diseño existente.',
  },
  {
    q: '¿Tiene periodo de prueba?',
    a: '14 días gratis, sin tarjeta de crédito. Si no estás convencido, cancelas y no se te cobra nada.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <SpacifyLogo size="md" variant="dark" />

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#como-funciona" className="hover:text-slate-900 transition-colors">Cómo funciona</a>
          <a href="#precios"       className="hover:text-slate-900 transition-colors">Precios</a>
          <a href="#faq"           className="hover:text-slate-900 transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="text-sm text-slate-700 hover:text-slate-900 transition-colors hidden sm:block"
          >
            Ver demo →
          </Link>
          <a
            href="#contacto"
            className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Hablar con nosotros
          </a>
        </div>
      </div>
    </nav>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="py-5 border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-medium text-slate-900 group-hover:text-slate-600 transition-colors">
          {q}
        </span>
        <span
          className={`text-slate-400 text-xl transition-transform flex-shrink-0 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="mt-3 text-slate-500 text-sm leading-relaxed pr-8">{a}</p>
      )}
    </div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-5">✅</div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">¡Recibido!</h3>
        <p className="text-slate-500">
          Te contactamos en menos de 24h para preparar tu demo personalizada.
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 transition'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
          <input
            required
            type="text"
            placeholder="Tu nombre"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
          <input
            required
            type="text"
            placeholder="Nombre de tu negocio"
            value={form.business}
            onChange={e => setForm(f => ({ ...f, business: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            required
            type="email"
            placeholder="tu@empresa.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Teléfono <span className="text-slate-400 font-normal">(opcional)</span>
          </label>
          <input
            type="tel"
            placeholder="+34 600 000 000"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 active:scale-95 transition-all mt-2"
      >
        Quiero ver la demo →
      </button>
      <p className="text-center text-xs text-slate-400">Sin compromiso. Te contactamos en menos de 24h.</p>
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [annual, setAnnual] = useState(false)

  const dotPatternStyle: React.CSSProperties = {
    backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  }

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-20"
        style={{
          background: 'linear-gradient(to bottom, #F8FAFC, #ffffff)',
          ...dotPatternStyle,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            ✦ Configurador 3D · Presupuesto automático · Sin código
          </span>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            <span className="text-slate-900">Tu cliente configura.</span>
            <br />
            <span className="text-slate-400">Tú solo fabricas.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un configurador 3D interactivo que pones en tu web en días. Tus clientes diseñan,
            el precio aparece solo, el presupuesto te llega por email.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="bg-slate-900 text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-slate-700 active:scale-95 transition-all shadow-lg w-full sm:w-auto"
            >
              Probar el configurador →
            </Link>
            <a
              href="#contacto"
              className="border border-slate-200 text-slate-700 font-medium px-8 py-4 rounded-xl text-base hover:border-slate-400 transition-colors w-full sm:w-auto bg-white/70"
            >
              Hablar con nosotros
            </a>
          </div>

          {/* Trust line */}
          <p className="text-sm text-slate-400 mt-6 flex items-center justify-center gap-1 flex-wrap">
            <span className="text-amber-400 tracking-tighter">★★★★★</span>
            <span className="mx-1">Confiado por más de 40 empresas · 14 días gratis · Sin permanencia</span>
          </p>
        </div>

        {/* Browser chrome mock */}
        <div className="mt-16 w-full max-w-5xl mx-auto relative">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 ring-1 ring-black/10">
            {/* Traffic lights + URL bar */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400 text-left">
                miempresa.com/configurador
              </div>
            </div>
            {/* Iframe */}
            <div style={{ height: '480px' }}>
              <iframe
                src="/demo"
                className="w-full h-full border-0"
                title="Demo del configurador de pérgolas"
              />
            </div>
          </div>

          {/* Floating stat badge — right */}
          <div className="absolute -right-4 top-20 bg-white border border-slate-100 shadow-xl rounded-2xl px-4 py-3 text-left hidden md:block">
            <p className="text-xs text-slate-400 mb-0.5">Precio estimado</p>
            <p className="text-2xl font-bold text-slate-900">10.200 €</p>
            <p className="text-xs text-slate-400">IVA incluido</p>
          </div>

          {/* Floating stat badge — left */}
          <div className="absolute -left-4 bottom-20 bg-white border border-slate-100 shadow-xl rounded-2xl px-4 py-3 text-left hidden md:block">
            <p className="text-xs text-slate-400 mb-1">Configuración</p>
            <p className="text-sm font-semibold text-slate-900">4m × 3m · Antracita</p>
            <p className="text-sm text-slate-500">12 lamas · Alt. 2,5m</p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '40+',   label: 'empresas activas'               },
            { value: '2.400+', label: 'presupuestos generados'        },
            { value: '5 días', label: 'tiempo de puesta en marcha'    },
            { value: '3,2×',  label: 'más conversiones que PDF'       },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM SECTION ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ¿Cuántas horas pierdes haciendo presupuestos a mano?
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              El cliente llama, describe lo que quiere (más o menos), tú calculas, dibujas algo,
              mandas el PDF… y a la semana te dice que lo quiere 50 cm más ancho. Y vuelta a empezar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { before: '⏱ 2–4h por presupuesto',            after: '⚡ El cliente lo hace en 5 min'      },
              { before: '📞 Llamadas para aclarar medidas',   after: '🎮 Todo en el configurador'          },
              { before: '📄 PDFs que nadie entiende',         after: '👁 Ve el 3D, sin confusión'          },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-amber-400 bg-amber-50 rounded-r-2xl p-6">
                <p className="text-slate-400 text-sm line-through mb-3">{item.before}</p>
                <p className="text-slate-900 font-semibold">{item.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Todo lo que necesita tu negocio
            </h2>
            <p className="text-slate-500 text-lg">Sin complicaciones técnicas, sin curva de aprendizaje.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white" id="como-funciona">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Tres pasos y ya está</h2>
            <p className="text-slate-500 text-lg">Sin reuniones interminables ni proyectos de meses.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-slate-200" />

            {STEPS.map((step, i) => (
              <div key={i} className="flex-1 text-center relative">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                  {step.n}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">* Testimonios de beta testers</p>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-950" id="precios">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Precios sin sorpresas</h2>
            <p className="text-slate-400 text-lg mb-8">14 días de prueba gratuita en cualquier plan.</p>

            {/* Annual / monthly toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  !annual ? 'bg-white text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  annual ? 'bg-white text-slate-900 shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Anual
                {annual && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    −20%
                  </span>
                )}
                {!annual && (
                  <span className="bg-slate-700 text-slate-300 text-xs font-medium px-2 py-0.5 rounded-full">
                    −20%
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => {
              const displayPrice = annual
                ? Math.round(plan.monthly * 10)
                : plan.monthly

              return (
                <div
                  key={i}
                  className={`rounded-2xl p-8 flex flex-col transition-transform ${
                    plan.highlight
                      ? 'bg-white text-slate-900 scale-105 shadow-2xl ring-2 ring-white/30'
                      : 'bg-slate-900 text-white border border-slate-800'
                  }`}
                >
                  {plan.highlight && (
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
                      Más popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-slate-900' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-4xl font-bold ${plan.highlight ? 'text-slate-900' : 'text-white'}`}>
                      {displayPrice}€
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {annual ? '/año' : '/mes'}
                    </span>
                  </div>
                  {annual && (
                    <p className={`text-xs mb-6 ${plan.highlight ? 'text-amber-600' : 'text-amber-400'}`}>
                      2 meses gratis
                    </p>
                  )}
                  {!annual && <div className="mb-6" />}

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2 text-sm ${
                          plan.highlight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        <span className={`mt-0.5 font-bold ${plan.highlight ? 'text-slate-900' : 'text-amber-400'}`}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contacto"
                    className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-all ${
                      plan.highlight
                        ? 'bg-slate-900 text-white hover:bg-slate-700'
                        : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Preguntas frecuentes</h2>
          </div>
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-slate-50" id="contacto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">¿Hablamos?</h2>
            <p className="text-slate-500 text-lg">
              Cuéntanos tu negocio y te preparamos una demo con tu catálogo.
              Sin compromiso, sin rollos.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-4 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <SpacifyLogo size="sm" variant="dark" />
          <div className="flex items-center gap-6">
            <Link href="/demo"   className="hover:text-slate-600 transition-colors">Ver demo</Link>
            <a href="#precios"   className="hover:text-slate-600 transition-colors">Precios</a>
            <a href="#contacto"  className="hover:text-slate-600 transition-colors">Contacto</a>
          </div>
          <p>© 2025 Spacify · Hecho con ♥ en España</p>
        </div>
      </footer>
    </div>
  )
}
