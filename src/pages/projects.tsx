import PremiumCarousel from '@/components/custom/carousel-slider'
import type { Slide } from '@/components/custom/carousel-slider'

import shotImg from '@/assets/shot.png'
import moImg from '@/assets/mo.png'
import mImg from '@/assets/m.png'
import img1 from '@/assets/1.png'
import img2 from '@/assets/2.png'
import img3 from '@/assets/3.png'
import { Button } from '@/components/ui/button'

const slides: Slide[] = [
  {
    id: 1,
    img: shotImg,
    title: 'Application E-commerce',
    subtitle: 'React • Node.js • MongoDB',
    year: '2024',
    accent: '#60a5fa',
    bg: 'linear-gradient(135deg, #1e3a5f, #0f172a)',
  },
  {
    id: 2,
    img: moImg,
    title: 'Dashboard Analytics',
    subtitle: 'TypeScript • Tailwind • Recharts',
    year: '2024',
    accent: '#34d399',
    bg: 'linear-gradient(135deg, #064e3b, #022c22)',
  },
  {
    id: 3,
    img: mImg,
    title: 'Application Mobile',
    subtitle: 'React Native • Expo • Firebase',
    year: '2023',
    accent: '#f472b6',
    bg: 'linear-gradient(135deg, #831843, #500724)',
  },
  {
    id: 4,
    img: img1,
    title: 'Portfolio Interactif',
    subtitle: 'Three.js • GSAP • WebGL',
    year: '2023',
    accent: '#a78bfa',
    bg: 'linear-gradient(135deg, #4c1d95, #2e1065)',
  },
  {
    id: 5,
    img: img2,
    title: 'SaaS B2B Platform',
    subtitle: 'Next.js • Prisma • PostgreSQL',
    year: '2024',
    accent: '#fbbf24',
    bg: 'linear-gradient(135deg, #92400e, #451a03)',
  },
  {
    id: 6,
    img: img3,
    title: 'API RESTful',
    subtitle: 'Express • Docker • Redis',
    year: '2023',
    accent: '#22d3ee',
    bg: 'linear-gradient(135deg, #155e75, #0c4a6e)',
  },
]

interface ProjectsPageProps {
  onBack?: () => void
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {onBack && (
        <Button
          onClick={onBack}
          className="absolute top-4 left-4 z-50 text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
        >
          Retour
        </Button>
      )}
      <PremiumCarousel slides={slides} autoplay={true} autoplayDelay={5000} loop={true} />
    </div>
  )
}
