import { motion } from 'framer-motion'
import { Music2, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function AudioPlayer() {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (enabled) {
      audioRef.current.pause()
      setEnabled(false)
    } else {
      void audioRef.current.play()
      setEnabled(true)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => setEnabled(false)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="fixed right-3 bottom-20 z-50 sm:right-5 sm:bottom-6 md:right-5 md:bottom-6">
      <audio ref={audioRef} src="/musica.mp3" />
      <button
        type="button"
        onClick={toggleAudio}
        className="group relative flex items-center gap-2 rounded-full border border-white/60 bg-[rgba(250,243,224,0.88)] px-3 py-2.5 text-[var(--preto-elegante)] shadow-[0_20px_50px_rgba(26,18,8,0.16)] backdrop-blur sm:gap-3 sm:px-4 sm:py-3"
      >
        <motion.span
          animate={enabled ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: enabled ? Number.POSITIVE_INFINITY : 0 }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--terracota)] text-[var(--cream)] sm:h-10 sm:w-10"
        >
          <Music2 className="h-4 w-4 sm:h-5 sm:w-5" />
          {enabled ? (
            <>
              <motion.span
                animate={{ scale: [1, 1.8], opacity: [0.65, 0] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-full border border-[var(--coral-soft)]"
              />
              <motion.span
                animate={{ scale: [1, 2.1], opacity: [0.45, 0] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, delay: 0.35 }}
                className="absolute inset-0 rounded-full border border-[var(--coral-soft)]"
              />
            </>
          ) : null}
        </motion.span>
        <span className="hidden font-body text-xs tracking-[0.22em] uppercase sm:inline">
          {enabled ? 'Silenciar' : 'Ativar trilha'}
        </span>
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </div>
  )
}