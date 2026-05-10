import { motion } from 'framer-motion'

const flowerBursts = Array.from({ length: 16 }).map((_, index) => ({
  id: index,
  left: `${index * 6}%`,
  delay: index * 0.22,
}))

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#1a1208_0%,#311d13_100%)] px-5 py-24 text-[var(--cream)] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(232,146,124,0.2),transparent_36%),radial-gradient(circle_at_82%_84%,rgba(184,134,11,0.18),transparent_34%)]" />
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-body text-xs tracking-[0.48em] text-[rgba(250,243,224,0.62)] uppercase">
          Com Amor
        </p>
        <h2 className="mt-6 font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-[0.06em]">
          você e amor que permanece, mesmo quando o tempo passa.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-8 text-[rgba(250,243,224,0.72)]">
          Onde houver saudade, que haja também gratidão por tudo o que foi vivido com ternura.
        </p>

        <div className="mt-14 flex justify-center">
          <svg width="420" height="130" viewBox="0 0 420 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
            <motion.path
              d="M30 90C62 32 112 24 126 64C138 96 168 102 193 54C216 10 249 19 255 56C262 96 306 100 390 44"
              stroke="#E8927C"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <p className="mt-4 font-script text-4xl text-[rgba(232,146,124,0.95)]">Com amor Rhuã, Andressa e Sandy</p>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {flowerBursts.map((flower) => (
          <motion.span
            key={flower.id}
            initial={{ y: '120%', opacity: 0, rotate: 0 }}
            animate={{ y: '-20%', opacity: [0, 0.7, 0], rotate: [0, 18, -12] }}
            transition={{ duration: 9, delay: flower.delay, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            className="absolute bottom-0 h-6 w-6 rounded-[70%_0_70%_0] bg-[radial-gradient(circle_at_30%_30%,#FAF3E0,#E8927C_60%,#C1694F)]"
            style={{ left: flower.left }}
          />
        ))}
      </div>
    </footer>
  )
}