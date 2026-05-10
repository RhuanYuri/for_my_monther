import { motion } from 'framer-motion'
import { Feather } from 'lucide-react'
import { HeartButton } from './HeartButton'

const paragraphs = [
  'Vanessa é seu primeiro nome, mãe...',
  'O segundo é braba, isso é verdade,',
  'se irrita rápido, perde a paciência com facilidade.',
  'Mas por trás da cara séria e do jeito explosivo,',
  'tem um coração enorme e um sorriso bonito.',
  'Ela reclama, resmunga e às vezes quer discutir,',
  'mas também sabe fazer qualquer momento sorrir.',
  'Porque até na raiva ela tem seu encanto,',
  'dessas pessoas difíceis… que a gente gosta tanto.',
  'Com carinho,',
  'Andressa Gracielly',
]

export function Legacy() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f9efe0_0%,#efe0cd_100%)] px-5 py-24 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_14%,rgba(193,105,79,0.12),transparent_28%),radial-gradient(circle_at_12%_80%,rgba(184,134,11,0.1),transparent_35%)]" />
      <div className="paper-noise mx-auto max-w-5xl rounded-[3rem] border border-[rgba(139,115,85,0.25)] px-6 py-10 shadow-[0_30px_100px_rgba(26,18,8,0.1)] sm:px-10 lg:px-12">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-3 rounded-full border border-[rgba(139,115,85,0.3)] bg-[rgba(250,243,224,0.84)] px-5 py-3 text-xs tracking-[0.4em] text-[var(--sepia)] uppercase">
            <Feather className="h-4 w-4" />
            O Que Ficou Para Sempre
          </span>
          <p className="font-script text-4xl text-[var(--terracota)]">um poema para ser lido devagar</p>
        </div>

        <div className="space-y-8">
          {paragraphs.map((text, index) => (
            <motion.p
              key={text}
              initial={{ opacity: 0, filter: 'blur(14px)', y: 22 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className={`max-w-4xl leading-10 text-[rgba(26,18,8,0.82)] ${
                index === 0
                  ? 'font-script text-[2.2rem] leading-[1.15] text-[var(--terracota)]'
                  : index >= paragraphs.length - 2
                    ? 'font-script text-4xl leading-[1.2] text-[var(--sepia)]'
                    : 'font-body text-xl'
              }`}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-2xl font-body text-base leading-8 text-[rgba(26,18,8,0.72)]">
            Que este gesto simples guarde para sempre aquilo que so o amor sabe nomear.
          </p>
          <HeartButton />
        </div>

      </div>
    </div>
  )
}