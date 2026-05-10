import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useParallax } from '../hooks/useParallax'

const heroLines = [
  'Ha amores que o tempo nao leva.',
  'Eles pousam em cada lembranca,',
  'e fazem da vida um lugar mais bonito.',
]

function TypewriterLines() {
  const totalLength = heroLines.reduce((sum, line) => sum + line.length + 1, 0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (progress >= totalLength) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setProgress((current) => Math.min(current + 1, totalLength))
    }, progress === 0 ? 350 : 36)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [progress, totalLength])

  let remaining = progress
  const visibleLines = heroLines.map((line) => {
    if (remaining <= 0) {
      return ''
    }

    const charactersToShow = Math.min(line.length, remaining)
    remaining -= line.length + 1
    return line.slice(0, charactersToShow)
  })

  const activeLine =
    progress < totalLength
      ? heroLines.findIndex((line, index) => visibleLines[index].length < line.length)
      : -1

  return (
    <div className="space-y-2 text-balance font-display text-[clamp(2.15rem,6.3vw,5.1rem)] leading-[0.95] tracking-[0.06em] text-[var(--cream)]">
      {visibleLines.map((line, index) => (
        <p key={heroLines[index]} className="min-h-[1em]">
          {line}
          {index === activeLine ? (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY }}
              className="ml-1 inline-block h-[0.9em] w-[2px] bg-[var(--cream)] align-middle"
            />
          ) : null}
        </p>
      ))}
    </div>
  )
}

function PetalField() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        id: index,
        left: `${6 + index * 7}%`,
        delay: index * 0.7,
        duration: 10 + (index % 5),
        size: 10 + (index % 3) * 6,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          initial={{ y: -120, x: 0, rotate: -20, opacity: 0 }}
          animate={{
            y: ['-10%', '110%'],
            x: [0, 25, -20, 18],
            rotate: [-22, 18, -14, 24],
            opacity: [0, 0.85, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: 'linear',
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="absolute top-0 rounded-[70%_0_70%_0] bg-[radial-gradient(circle_at_30%_30%,rgba(250,243,224,0.95),rgba(232,146,124,0.9)_55%,rgba(193,105,79,0.95))] shadow-[0_0_18px_rgba(193,105,79,0.35)]"
          style={{ left: petal.left, width: petal.size, height: petal.size * 1.5 }}
        />
      ))}
    </div>
  )
}

const heroArtwork = `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1600'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#2B1B11'/>
        <stop offset='38%' stop-color='#8B7355'/>
        <stop offset='72%' stop-color='#C1694F'/>
        <stop offset='100%' stop-color='#E8927C'/>
      </linearGradient>
    </defs>
    <rect width='1200' height='1600' fill='url(#g)'/>
    <circle cx='880' cy='320' r='210' fill='rgba(250,243,224,0.2)'/>
    <circle cx='330' cy='1220' r='170' fill='rgba(184,134,11,0.16)'/>
    <path d='M100 1140 C320 820, 670 1520, 1100 980' fill='none' stroke='rgba(250,243,224,0.42)' stroke-width='28' stroke-linecap='round'/>
    <rect x='170' y='160' width='860' height='1200' rx='56' fill='rgba(250,243,224,0.1)' stroke='rgba(250,243,224,0.3)'/>
  </svg>
`)})")`

const perfilImage = 'url("/perfil.jpeg")'

export function Hero() {
  const parallaxOffset = useParallax(0.18)

  return (
    <div className="bloom-vignette relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-12 pt-24 sm:px-8 lg:px-12">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          y: -parallaxOffset,
          backgroundImage: `linear-gradient(180deg, rgba(43,27,17,0.28), rgba(26,18,8,0.8)), ${heroArtwork}`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(250,243,224,0.18),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(232,146,124,0.3),transparent_36%),radial-gradient(circle_at_25%_82%,rgba(184,134,11,0.18),transparent_34%),linear-gradient(180deg,rgba(43,27,17,0.08)_0%,rgba(26,18,8,0.72)_100%)]" />
      <PetalField />

      <div className="pointer-events-none absolute inset-x-5 top-24 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(250,243,224,0.35),transparent)] sm:inset-x-8 lg:inset-x-12" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-max rounded-full border border-[rgba(250,243,224,0.22)] bg-[rgba(26,18,8,0.28)] px-5 py-3 text-xs tracking-[0.42em] text-[rgba(250,243,224,0.92)] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur"
          >
            O Primeiro Olhar
          </motion.p>
          <TypewriterLines />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="max-w-xl border-l border-[rgba(250,243,224,0.22)] pl-4 font-body text-base leading-7 text-[rgba(250,243,224,0.84)] sm:pl-6 sm:text-lg sm:leading-8"
          >
            Cada gesto seu virou abrigo. Cada palavra, uma semente de coragem.
          </motion.p>
        </div>

        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0 round 2.5rem)', opacity: 0.4 }}
          animate={{ clipPath: 'inset(0 0 0% 0 round 2.5rem)', opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="relative ml-auto w-full max-w-[28rem] overflow-hidden rounded-[2.5rem] border border-[rgba(250,243,224,0.3)] bg-[rgba(250,243,224,0.08)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur"
        >
          <div
            className="aspect-[4/5] rounded-[2rem] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(26,18,8,0.1), rgba(26,18,8,0.2)), ${perfilImage}`,
            }}
          />
          <div className="absolute inset-x-10 bottom-10 rounded-[1.5rem] border border-[rgba(250,243,224,0.2)] bg-[rgba(26,18,8,0.35)] p-5 text-[var(--cream)] backdrop-blur-md">
            <p className="font-script text-3xl text-[var(--cream)]">para a mulher que fez do amor um lar</p>
            <p className="mt-2 font-body text-sm tracking-[0.25em] text-[rgba(250,243,224,0.65)] uppercase">
              delicadeza, forca e presenca
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.1, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-[rgba(250,243,224,0.86)]"
      >
        <span className="font-body text-xs tracking-[0.45em] uppercase">deslize</span>
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </div>
  )
}