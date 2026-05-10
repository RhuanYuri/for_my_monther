import { useEffect, useState } from 'react'

export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.scrollY * speed)
    }

    updateOffset()
    window.addEventListener('scroll', updateOffset, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateOffset)
    }
  }, [speed])

  return offset
}