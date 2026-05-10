import { motion } from 'framer-motion'
import type { PhotoItem } from '../data/photos'
import { useSectionInView } from '../hooks/useIntersectionObserver'

const sizeClasses: Record<PhotoItem['size'], string> = {
  small: 'aspect-[4/5]',
  medium: 'aspect-[4/5]',
  large: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
}

export function GalleryItem({
  photo,
  onOpen,
}: {
  photo: PhotoItem
  onOpen: () => void
}) {
  const { ref, inView } = useSectionInView({ triggerOnce: true, threshold: 0.2 })
  const featuredRowClass = photo.id === 'p5' || photo.id === 'p10' ? 'lg:col-span-2' : ''

  return (
    <motion.button
      ref={ref}
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, rotate: -2, y: 24 }}
      animate={inView ? { opacity: 1, rotate: 0, y: 0 } : {}}
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 140, damping: 17 }}
      className={`group relative overflow-hidden rounded-[1.8rem] text-left shadow-[0_25px_70px_rgba(26,18,8,0.18)] ${sizeClasses[photo.size]} ${featuredRowClass}`}
    >
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,transparent,rgba(26,18,8,0.7))] opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src={photo.src}
        alt={photo.title}
        className="h-full w-full object-cover sepia-[0.68] saturate-[0.55] transition duration-700 group-hover:sepia-0 group-hover:saturate-100"
      />
      <div className="absolute inset-0 bg-[rgba(193,105,79,0.14)] transition duration-500 group-hover:opacity-0" />
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 2xl:p-7">
        <div className="translate-y-6 transition duration-500 group-hover:translate-y-0">
          <p className="font-body text-xs tracking-[0.28em] text-[rgba(250,243,224,0.75)] uppercase 2xl:text-sm">
            {photo.era} · {photo.date}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-none text-[var(--cream)] 2xl:text-4xl">
            {photo.title}
          </h3>
          <p className="mt-2 max-w-sm font-body text-sm leading-6 text-[rgba(250,243,224,0.85)] 2xl:text-base">
            {photo.caption}
          </p>
        </div>
      </div>
    </motion.button>
  )
}