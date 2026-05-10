import { AnimatePresence, motion } from 'framer-motion'
import { Images } from 'lucide-react'
import { useMemo, useState } from 'react'
import { photoCategories, photos, type PhotoCategory } from '../data/photos'
import { GalleryItem } from './GalleryItem'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | 'todas'>('familia')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'todas') {
      return photos
    }

    return photos.filter((photo) => photo.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#faf3e0_0%,#f5e6d7_35%,#f9f2e8_100%)] px-5 py-24 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(193,105,79,0.12),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(184,134,11,0.12),transparent_34%)]" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-3 rounded-full border border-[rgba(193,105,79,0.22)] bg-white/65 px-5 py-3 text-xs tracking-[0.42em] text-[var(--terracota)] uppercase shadow-sm backdrop-blur">
              <Images className="h-4 w-4" />
              Memorias em Movimento
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.9] text-[var(--preto-elegante)]">
              Retratos de afeto: pequenos instantes que continuam florescendo no coração.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 rounded-full border border-[rgba(193,105,79,0.16)] bg-white/55 p-1.5 backdrop-blur">
            <button
              type="button"
              onClick={() => setActiveCategory('todas')}
              className={`relative rounded-full px-5 py-3 text-sm tracking-[0.18em] uppercase transition ${
                activeCategory === 'todas'
                  ? 'text-[var(--cream)] shadow-[0_18px_35px_rgba(193,105,79,0.28)]'
                  : 'text-[var(--preto-elegante)] hover:bg-[rgba(193,105,79,0.1)]'
              }`}
            >
              {activeCategory === 'todas' ? (
                <motion.span
                  layoutId="gallery-category-highlight"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--terracota)]"
                  transition={{ type: 'spring', stiffness: 250, damping: 24 }}
                />
              ) : null}
              Todas
            </button>
            {photoCategories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`relative rounded-full px-5 py-3 text-sm tracking-[0.18em] uppercase transition ${
                  activeCategory === category.value
                    ? 'text-[var(--cream)] shadow-[0_18px_35px_rgba(193,105,79,0.28)]'
                    : 'text-[var(--preto-elegante)] hover:bg-[rgba(193,105,79,0.1)]'
                }`}
              >
                {activeCategory === category.value ? (
                  <motion.span
                    layoutId="gallery-category-highlight"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--terracota)]"
                    transition={{ type: 'spring', stiffness: 250, damping: 24 }}
                  />
                ) : null}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <GalleryItem
                key={photo.id}
                photo={photo}
                onOpen={() => setSelectedIndex(filteredPhotos.findIndex((item) => item.id === photo.id))}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        key={selectedIndex ?? -1}
        photos={filteredPhotos}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  )
}