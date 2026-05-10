export type TimelineEvent = {
  id: string
  year: string
  title: string
  text: string
  photo: string
}

function createTimelineArt(title: string, start: string, end: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="560" height="360" rx="26" fill="url(#g)" />
      <circle cx="430" cy="120" r="86" fill="rgba(250,243,224,0.18)" />
      <path d="M40 250 C140 170, 260 320, 520 180" stroke="rgba(250,243,224,0.48)" stroke-width="10" fill="none" stroke-linecap="round" />
      <text x="40" y="84" font-family="Georgia, serif" font-size="40" fill="#FAF3E0">${title}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const timeline: TimelineEvent[] = [
  {
    id: 't2',
    year: '2011',
    title: 'Casa aberta',
    text: 'A mesa sempre tinha um lugar a mais para quem precisasse de calor.',
    photo: createTimelineArt('Casa aberta', '#E8927C', '#B8860B'),
  },
  {
    id: 't3',
    year: '2018',
    title: 'Coragem mansa',
    text: 'Voce ensinou a ser forte sem endurecer o coração.',
    photo: createTimelineArt('Coragem mansa', '#8B7355', '#1A1208'),
  },
  {
    id: 't4',
    year: '2026',
    title: 'O amor continua',
    text: 'Tudo o que ficou para sempre ainda floresce em quem voce tocou.',
    photo: createTimelineArt('O amor continua', '#C1694F', '#E8927C'),
  },
]