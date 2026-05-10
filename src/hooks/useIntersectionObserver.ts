import { useInView } from 'react-intersection-observer'

export function useSectionInView(options?: Parameters<typeof useInView>[0]) {
  return useInView({
    triggerOnce: true,
    threshold: 0.2,
    ...options,
  })
}