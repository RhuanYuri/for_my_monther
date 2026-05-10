import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState } from 'react'

export function HeartButton() {
  const [burst, setBurst] = useState(0)

  return (
    <div className="relative flex w-fit items-center justify-center">
      <button
        type="button"
        onClick={() => setBurst((value) => value + 1)}
        className="relative inline-flex items-center gap-3 rounded-full bg-[var(--terracota)] px-7 py-4 font-body text-sm tracking-[0.2em] text-[var(--cream)] uppercase shadow-[0_24px_50px_rgba(193,105,79,0.32)] transition hover:-translate-y-0.5"
      >
        <Heart className="h-5 w-5 fill-current" />
        Guardar no coração
      </button>

      <AnimatePresence>
        {burst > 0
          ? Array.from({ length: 22 }).map((_, index) => (
              <motion.span
                key={`${burst}-${index}`}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.25, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((index / 22) * Math.PI * 2) * (55 + index * 3),
                  y: Math.sin((index / 22) * Math.PI * 2) * (48 + index * 2),
                  scale: [0.2, 1.15, 0.6],
                  rotate: index * 35,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.15, ease: 'easeOut' }}
                className="pointer-events-none absolute top-1/2 left-1/2 flex h-5 w-5 items-center justify-center"
                style={{ color: ['#C1694F', '#E8927C', '#B8860B', '#8B7355'][index % 4] }}
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>
            ))
          : null}
      </AnimatePresence>
    </div>
  )
}