import { Flower2 } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress({
  sections,
}: {
  sections: { path: string; label: string; sectionId: string }[]
}) {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })

  return (
    <div className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 xl:flex xl:flex-col xl:items-center xl:gap-4 2xl:right-6 2xl:gap-5">
      <div className="relative h-56 w-2 overflow-hidden rounded-full bg-[rgba(193,105,79,0.14)] 2xl:h-72 2xl:w-2.5">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,var(--coral-soft),var(--terracota),var(--dourado))]"
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.path}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
            className="rounded-full bg-[rgba(250,243,224,0.75)] p-2 text-[var(--terracota)] shadow-sm 2xl:p-2.5"
            title={section.label}
          >
            <Flower2 className="h-4 w-4 2xl:h-5 2xl:w-5" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}