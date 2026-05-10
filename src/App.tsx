import { AnimatePresence, motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AudioPlayer } from './components/AudioPlayer'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Legacy } from './components/Legacy'
import { PetalCursor } from './components/PetalCursor'
import { ScrollProgress } from './components/ScrollProgress'

type SectionRoute = {
  path: string
  label: string
  sectionId: string
}

const sectionRoutes: SectionRoute[] = [
  { path: '/', label: 'Primeiro Olhar', sectionId: 'hero' },
  { path: '/memorias', label: 'Memórias Vivas', sectionId: 'gallery' },
  { path: '/legado', label: 'Legado de Amor', sectionId: 'legacy' },
  { path: '/com-amor', label: 'Com Amor', sectionId: 'footer' },
]

function ShareButton() {
  const [burst, setBurst] = useState(0)

  const copyLink = async () => {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      setBurst((value) => value + 1)
    } catch {
      window.prompt('Copie o link abaixo:', url)
    }
  }

  return (
    <div className="fixed top-20 right-3 z-[60] sm:top-20 sm:right-5 lg:top-5">
      <button
        type="button"
        onClick={() => void copyLink()}
        className="relative inline-flex items-center gap-2 rounded-full border border-white/60 bg-[rgba(250,243,224,0.85)] px-3 py-2.5 text-[0.68rem] tracking-[0.16em] text-[var(--terracota)] uppercase shadow-[0_18px_35px_rgba(26,18,8,0.15)] backdrop-blur transition hover:-translate-y-0.5 sm:px-4 sm:py-3 sm:text-sm sm:tracking-[0.2em]"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">Compartilhar</span>
      </button>

      <AnimatePresence>
        {burst > 0
          ? Array.from({ length: 14 }).map((_, index) => (
              <motion.span
                key={`${burst}-${index}`}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.2 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((index / 14) * Math.PI * 2) * (52 + index * 3),
                  y: Math.sin((index / 14) * Math.PI * 2) * (40 + index * 2),
                  scale: 1,
                  rotate: index * 24,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: ['#C1694F', '#E8927C', '#B8860B', '#8B7355'][index % 4],
                }}
              />
            ))
          : null}
      </AnimatePresence>
    </div>
  )
}

function ScrollSections() {
  const location = useLocation()
  const navigate = useNavigate()
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const route = sectionRoutes.find((item) => item.path === location.pathname) ?? sectionRoutes[0]
    const target = refs.current[route.sectionId]

    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.pathname])

  useEffect(() => {
    const observers = sectionRoutes
      .map(({ path, sectionId }) => {
        const element = refs.current[sectionId]

        if (!element) {
          return null
        }

        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries.find((entry) => entry.isIntersecting)

            if (visible && location.pathname !== path) {
              navigate(path, { replace: true })
            }
          },
          { threshold: 0.55 },
        )

        observer.observe(element)
        return observer
      })
      .filter(Boolean)

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [location.pathname, navigate])

  return (
    <>
      <section ref={(node) => void (refs.current.hero = node)} id="hero" className="section-shell">
        <Hero />
      </section>
      <section ref={(node) => void (refs.current.gallery = node)} id="gallery" className="section-shell">
        <Gallery />
      </section>
      <section ref={(node) => void (refs.current.legacy = node)} id="legacy" className="section-shell">
        <Legacy />
      </section>
      <section ref={(node) => void (refs.current.footer = node)} id="footer" className="section-shell">
        <Footer />
      </section>
    </>
  )
}

function HomeExperience() {
  const location = useLocation()

  return (
    <div className="relative overflow-x-clip bg-[var(--cream)] text-[var(--preto-elegante)]">
      <PetalCursor />
      <ScrollProgress sections={sectionRoutes} />
      <AudioPlayer />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/30 bg-[rgba(26,18,8,0.45)] px-4 py-3 text-[var(--cream)] shadow-[0_20px_60px_rgba(26,18,8,0.2)] backdrop-blur-lg sm:px-6">
          <div className="pointer-events-auto">
            <p className="font-display text-[0.8rem] tracking-[0.16em] uppercase sm:text-base sm:tracking-[0.24em] lg:text-xl lg:tracking-[0.28em]">
              Para Você Mãe
            </p>
          </div>
          <nav className="pointer-events-auto hidden gap-2 md:flex">
            {sectionRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs tracking-[0.22em] uppercase transition ${
                    isActive
                      ? 'bg-[rgba(250,243,224,0.95)]'
                      : 'text-[rgba(250,243,224,0.82)] hover:bg-[rgba(250,243,224,0.12)]'
                  }`
                }
                style={({ isActive }) => isActive ? { color: '#1a1208' } : {}}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-3 bottom-4 z-50 md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-1 rounded-full border border-white/35 bg-[rgba(26,18,8,0.62)] p-1.5 shadow-[0_20px_60px_rgba(26,18,8,0.25)] backdrop-blur-xl">
          {sectionRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `min-w-0 flex-1 truncate rounded-full px-2 py-2.5 text-center text-[0.58rem] tracking-[0.12em] uppercase transition ${
                  isActive
                    ? 'bg-[rgba(250,243,224,0.95)]'
                    : 'text-[rgba(250,243,224,0.88)]'
                }`
              }
              style={({ isActive }) => isActive ? { color: '#1a1208' } : {}}
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="space-y-0"
        >
          <ScrollSections />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {sectionRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<HomeExperience />} />
      ))}
    </Routes>
  )
}

export default App
