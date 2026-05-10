import { motion } from 'framer-motion'
import { useState } from 'react'
import { timeline } from '../data/timeline'

export function Timeline() {
  const [activeId, setActiveId] = useState(timeline[0].id)
  const activeEvent = timeline.find((item) => item.id === activeId) ?? timeline[0]

  return (
    <div className="space-y-6 2xl:space-y-8">
      <div className="overflow-hidden rounded-[2rem] border border-[rgba(139,115,85,0.25)] bg-[rgba(255,250,245,0.74)] p-6 shadow-[0_18px_50px_rgba(26,18,8,0.08)] 2xl:p-8">
        <motion.div drag="x" dragConstraints={{ left: -220, right: 0 }} className="flex gap-4 2xl:gap-5">
          {timeline.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`group min-w-[12rem] rounded-2xl border px-4 py-4 text-left transition 2xl:min-w-[14rem] 2xl:px-5 2xl:py-5 2xl:rounded-3xl ${
                item.id === activeId
                  ? 'border-[rgba(193,105,79,0.35)] bg-[rgba(193,105,79,0.08)]'
                  : 'border-transparent hover:border-[rgba(139,115,85,0.25)] hover:bg-[rgba(255,255,255,0.45)]'
              }`}
            >
              <div className="mb-3 flex items-center gap-3 2xl:mb-4">
                <span
                  className={`h-3 w-3 rounded-full transition 2xl:h-3.5 2xl:w-3.5 ${
                    item.id === activeId ? 'bg-[var(--terracota)]' : 'bg-[rgba(139,115,85,0.35)]'
                  }`}
                />
                <span className="font-body text-sm tracking-[0.25em] text-[var(--sepia)] uppercase 2xl:text-base 2xl:tracking-[0.28em]">
                  {item.year}
                </span>
              </div>
              <p className="font-display text-2xl text-[var(--preto-elegante)] transition group-hover:text-[var(--terracota)] 2xl:text-3xl">
                {item.title}
              </p>
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        key={activeEvent.id}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45 }}
        className="grid gap-6 rounded-[2rem] border border-[rgba(193,105,79,0.18)] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(250,243,224,0.68))] p-5 shadow-[0_18px_50px_rgba(26,18,8,0.08)] md:grid-cols-[20rem_minmax(0,1fr)] 2xl:gap-8 2xl:p-8 2xl:md:grid-cols-[26rem_minmax(0,1fr)] 2xl:rounded-[2.5rem]"
      >
        <img src={activeEvent.photo} alt={activeEvent.title} className="h-full w-full rounded-[1.6rem] object-cover 2xl:rounded-[2rem]" />
        <div className="self-center">
          <p className="font-body text-xs tracking-[0.28em] text-[var(--terracota)] uppercase 2xl:text-sm">
            {activeEvent.year}
          </p>
          <h3 className="mt-3 font-display text-4xl leading-none text-[var(--preto-elegante)] 2xl:mt-4 2xl:text-5xl">
            {activeEvent.title}
          </h3>
          <p className="mt-4 max-w-3xl font-body text-lg leading-8 text-[rgba(26,18,8,0.74)] 2xl:mt-5 2xl:max-w-4xl 2xl:text-xl 2xl:leading-9">
            {activeEvent.text}
          </p>
        </div>
      </motion.div>
    </div>
  )
}