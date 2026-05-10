import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { PhotoItem } from '../data/photos'

export function Lightbox({
  photos,
  selectedIndex,
  onClose,
}: {
  photos: PhotoItem[]
  selectedIndex: number | null
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex)

  useEffect(() => {
    if (currentIndex === null) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowRight') {
        setCurrentIndex((value) => (value === null ? 0 : (value + 1) % photos.length))
      }

      if (event.key === 'ArrowLeft') {
        setCurrentIndex((value) =>
          value === null ? 0 : (value - 1 + photos.length) % photos.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [currentIndex, onClose, photos.length])

  const photo = currentIndex === null ? null : photos[currentIndex]

  return (
    <AnimatePresence>
      {photo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(26,18,8,0.72)] px-4 py-8 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative flex w-full max-w-5xl flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/20 bg-[rgba(26,18,8,0.25)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.4)] sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-[rgba(250,243,224,0.92)] p-3 text-[var(--preto-elegante)]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) {
                    setCurrentIndex((value) => (value === null ? 0 : (value + 1) % photos.length))
                  }

                  if (info.offset.x > 70) {
                    setCurrentIndex((value) =>
                      value === null ? 0 : (value - 1 + photos.length) % photos.length,
                    )
                  }
                }}
                className="overflow-hidden rounded-[1.6rem]"
              >
                <img src={photo.src} alt={photo.title} className="h-full w-full object-cover" />
              </motion.div>

              <div className="flex flex-col justify-between gap-6 rounded-[1.6rem] bg-[rgba(250,243,224,0.92)] p-6 text-[var(--preto-elegante)]">
                <div>
                  <p className="font-body text-xs tracking-[0.28em] text-[var(--sepia)] uppercase">
                    {photo.era} · {photo.date}
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-none">{photo.title}</h3>
                  <p className="mt-4 font-body text-base leading-7 text-[rgba(26,18,8,0.75)]">
                    {photo.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((value) =>
                        value === null ? 0 : (value - 1 + photos.length) % photos.length,
                      )
                    }
                    className="rounded-full border border-[rgba(26,18,8,0.18)] p-3"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="font-body text-sm tracking-[0.24em] uppercase">
                    {currentIndex + 1} / {photos.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((value) => (value === null ? 0 : (value + 1) % photos.length))
                    }
                    className="rounded-full border border-[rgba(26,18,8,0.18)] p-3"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}