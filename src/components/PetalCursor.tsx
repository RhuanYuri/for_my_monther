import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type TrailPoint = {
  x: number
  y: number
}

// Formatos distintos de pétalas — cada índice tem sua própria forma orgânica
const PETAL_SHAPES = [
  '65% 35% 50% 50% / 60% 44% 56% 40%',
  '50% 50% 35% 65% / 40% 56% 44% 60%',
  '73% 27% 57% 43% / 53% 47% 63% 37%',
  '38% 62% 70% 30% / 62% 38% 42% 58%',
  '55% 45% 40% 60% / 45% 65% 35% 55%',
  '42% 58% 62% 38% / 58% 42% 52% 48%',
  '70% 30% 45% 55% / 35% 65% 60% 40%',
  '30% 70% 55% 45% / 65% 35% 40% 60%',
]

const PETAL_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315]

// Pétalas caindo — espalhadas pela tela, assíncronas
const FALLING_PETALS = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${(i * 5.7 + 3) % 100}%`,
  delay: (i * 1.3) % 9,
  duration: 12 + ((i * 7) % 8),
  size: 14 + ((i * 3) % 14),      // 14px – 27px
  rotation: PETAL_ROTATIONS[i % 8],
  borderRadius: PETAL_SHAPES[i % 8],
  opacity: 0.55 + ((i % 4) * 0.1), // 0.55 – 0.85
  drift: 30 + ((i * 11) % 50),     // deriva horizontal: 30–80px
}))

export function PetalCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState<TrailPoint>({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const frameRef = useRef<number | null>(null)
  const pointRef = useRef<TrailPoint>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(pointer:fine)')
    const update = () => setEnabled(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointRef.current = { x: e.clientX, y: e.clientY }
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(() => {
        const p = pointRef.current
        setPosition(p)
        // Trail mais longo (10 pontos) e com offset progressivo para parecerem espalhadas
        setTrail((cur) => [p, ...cur].slice(0, 10))
        frameRef.current = null
      })
    }
    if (enabled) window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  return (
    <>
      {/* ── Pétalas caindo na tela (independentes do cursor) ── */}
      <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {FALLING_PETALS.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: '-8%', x: 0, rotate: p.rotation, opacity: 0 }}
            animate={{
              y: ['−8%', '108%'],
              x: [0, p.drift, -p.drift * 0.6, p.drift * 0.4, 0],
              rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
              opacity: [0, p.opacity, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'linear',
              repeat: Infinity,
              times: [0, 0.1, 0.85, 1],
            }}
            style={{
              left: p.left,
              width: p.size,
              height: p.size * 1.55,
              borderRadius: p.borderRadius,
              background:
                'radial-gradient(ellipse at 32% 28%, #FAF3E0 0%, #E8927C 52%, #C1694F 100%)',
              boxShadow: '0 2px 12px rgba(193,105,79,0.28)',
              position: 'absolute',
              top: 0,
            }}
          />
        ))}
      </div>

      {/* ── Trail do cursor ── */}
      {enabled && (
        <div className="pointer-events-none fixed inset-0 z-[80]">
          {trail.map((point, i) => {
            const shape = PETAL_SHAPES[i % PETAL_SHAPES.length]
            const rot = PETAL_ROTATIONS[i % PETAL_ROTATIONS.length]
            // Cada pétala do trail tem tamanho e offset únicos → parecem espalhadas
            const size = 22 - i * 1.5
            const offsetX = (i % 3 === 0 ? 1 : -1) * i * 3
            const offsetY = i * 2

            return (
              <motion.span
                key={i}
                animate={{
                  x: point.x - size / 2 + offsetX,
                  y: point.y - size / 2 + offsetY,
                  opacity: Math.max(0, 0.82 - i * 0.08),
                  rotate: rot + i * 22,
                  scale: Math.max(0.2, 1 - i * 0.07),
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180 - i * 12,  // as últimas são mais "pesadas"
                  damping: 22 + i * 2,
                  mass: 0.3 + i * 0.06,
                }}
                style={{
                  position: 'absolute',
                  width: size,
                  height: size * 1.5,
                  borderRadius: shape,
                  background:
                    'radial-gradient(ellipse at 30% 30%, #FAF3E0 0%, #E8927C 55%, #C1694F 100%)',
                  boxShadow: '0 0 14px rgba(193,105,79,0.22)',
                }}
              />
            )
          })}

          {/* Cursor principal — florzinha */}
          <motion.span
            animate={{ x: position.x - 14, y: position.y - 14 }}
            transition={{ type: 'spring', stiffness: 480, damping: 30, mass: 0.15 }}
            className="absolute"
          >
            {/* 4 pétalas ao redor + centro */}
            {[0, 90, 180, 270].map((angle) => (
              <span
                key={angle}
                style={{
                  position: 'absolute',
                  width: 9,
                  height: 13,
                  borderRadius: '60% 40% 60% 40% / 70% 30% 70% 30%',
                  background: 'radial-gradient(ellipse at 40% 30%, #FAF3E0, #E8927C 70%)',
                  transform: `rotate(${angle}deg) translateY(-7px)`,
                  top: '50%',
                  left: '50%',
                  marginTop: -6,
                  marginLeft: -4,
                  opacity: 0.9,
                }}
              />
            ))}
            <span
              style={{
                position: 'absolute',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#C1694F',
                top: '50%',
                left: '50%',
                marginTop: -3,
                marginLeft: -3,
                boxShadow: '0 0 8px rgba(193,105,79,0.6)',
              }}
            />
          </motion.span>
        </div>
      )}
    </>
  )
}