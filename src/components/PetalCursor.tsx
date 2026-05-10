import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type TrailPoint = {
  x: number
  y: number
}

export function PetalCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState<TrailPoint>({ x: 0, y: 0 })
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const frameRef = useRef<number | null>(null)
  const pointRef = useRef<TrailPoint>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(pointer:fine)')
    const updateEnabled = () => {
      setEnabled(mediaQuery.matches)
    }

    updateEnabled()
    mediaQuery.addEventListener('change', updateEnabled)

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pointRef.current = { x: event.clientX, y: event.clientY }

      if (frameRef.current !== null) {
        return
      }

      frameRef.current = window.requestAnimationFrame(() => {
        const nextPoint = pointRef.current
        setPosition(nextPoint)
        setTrail((current) => [nextPoint, ...current].slice(0, 6))
        frameRef.current = null
      })
    }

    if (enabled) {
      window.addEventListener('mousemove', onMove, { passive: true })
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      window.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {trail.map((point, index) => (
        <motion.span
          key={index}
          animate={{
            x: point.x - 10,
            y: point.y - 10,
            opacity: 1 - index * 0.14,
            scale: 1 - index * 0.08,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.35 }}
          className="absolute h-5 w-5 rounded-[60%_0_60%_0] bg-[radial-gradient(circle_at_30%_30%,#FAF3E0,#E8927C_58%,#C1694F)] shadow-[0_0_20px_rgba(193,105,79,0.25)]"
        />
      ))}
      <motion.span
        animate={{ x: position.x - 12, y: position.y - 12 }}
        transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.18 }}
        className="absolute flex h-6 w-6 items-center justify-center"
      >
        <span className="absolute h-5 w-5 rounded-full border border-[rgba(250,243,224,0.85)] bg-[rgba(193,105,79,0.2)]" />
        <span className="h-3 w-3 rounded-[60%_0_60%_0] bg-[var(--coral-soft)]" />
      </motion.span>
    </div>
  )
}