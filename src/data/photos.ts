export type PhotoCategory = 'família' | 'amizades' | 'viagens' | 'momentos'

export type PhotoItem = {
  id: string
  title: string
  date: string
  era: string
  category: PhotoCategory
  caption: string
  src: string
  size: 'small' | 'medium' | 'large' | 'wide'
}

export const photoCategories: { label: string; value: PhotoCategory | 'todas' }[] = [
  { label: 'Família', value: 'família' },
  { label: 'Amizades', value: 'amizades' },
  { label: 'Viagens', value: 'viagens' },
  { label: 'Momentos', value: 'momentos' },
]

export const photos: PhotoItem[] = [
  {
    id: 'p1',
    title: 'Famíliaunida',
    date: '2025',
    era: 'Agora',
    category: 'família',
    caption: 'Momentos que definem quem somos.',
    src: '/familia.jpeg',
    size: 'large',
  },
  {
    id: 'p2',
    title: 'Filhas queridas',
    date: '2025',
    era: 'Agora',
    category: 'família',
    caption: 'Vidas que brotam do nosso amor.',
    src: '/filhas.jpeg',
    size: 'medium',
  },
  {
    id: 'p3',
    title: 'Filhos amados',
    date: '2025',
    era: 'Agora',
    category: 'família',
    caption: 'O futuro em suas mãos e sorrisos.',
    src: '/filhos.jpeg',
    size: 'medium',
  },
  {
    id: 'p4',
    title: 'Casal apaixonado',
    date: '2025',
    era: 'Agora',
    category: 'família',
    caption: 'Duas vidas que elegeram ficar juntas.',
    src: '/casal.jpeg',
    size: 'large',
  },
  {
    id: 'p5',
    title: 'Família ao lado',
    date: '2025',
    era: 'Agora',
    category: 'família',
    caption: 'Encontros que aquecem a alma.',
    src: '/familia.png',
    size: 'wide',
  },
  {
    id: 'p6',
    title: 'Trio especial',
    date: '2025',
    era: 'Amizade',
    category: 'amizades',
    caption: 'Lacos que resistem ao tempo.',
    src: '/trio.png',
    size: 'medium',
  },
  {
    id: 'p7',
    title: 'Trio em movimento',
    date: '2025',
    era: 'Amizade',
    category: 'amizades',
    caption: 'Vidas que se entrelaçam com alegria.',
    src: '/trio2.jpeg',
    size: 'medium',
  },
  {
    id: 'p8',
    title: 'Dupla dinamica',
    date: '2025',
    era: 'Amizade',
    category: 'amizades',
    caption: 'Duas almas em perfeita harmonia.',
    src: '/dupla.png',
    size: 'small',
  },
  {
    id: 'p9',
    title: 'Dupla feliz',
    date: '2025',
    era: 'Amizade',
    category: 'amizades',
    caption: 'Momentos que transbordam de carinho.',
    src: '/dupla2.jpeg',
    size: 'small',
  },
  {
    id: 'p10',
    title: 'Praia e horizonte',
    date: '2025',
    era: 'Viagem',
    category: 'viagens',
    caption: 'O mundo se abre quando estamos juntos.',
    src: '/praia.png',
    size: 'wide',
  },
  {
    id: 'p11',
    title: 'Retrato do coracão',
    date: '2025',
    era: 'Momentos',
    category: 'momentos',
    caption: 'Olhos que contam historias de amor.',
    src: '/perfil.jpeg',
    size: 'small',
  },
  {
    id: 'p12',
    title: 'Outro perfil, mesmo amor',
    date: '2025',
    era: 'Momentos',
    category: 'momentos',
    caption: 'Cada angulo revela uma nova faceta.',
    src: '/perfil2.jpeg',
    size: 'small',
  },
  {
    id: 'p13',
    title: 'Conexao a distancia',
    date: '2025',
    era: 'Momentos',
    category: 'momentos',
    caption: 'A tecnologia une corações separados.',
    src: '/videochamada.png',
    size: 'medium',
  },
]