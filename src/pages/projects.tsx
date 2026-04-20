import PremiumCarousel from '@/components/custom/carousel-slider'
import type { Slide } from '@/components/custom/carousel-slider'

import bloodImg from '@/assets/projets/blood.png'
import lepreuveImg from '@/assets/projets/lepreuve2K.png'
import medicsImg from '@/assets/projets/medics.png'
import montordevImg from '@/assets/projets/montordev.png'
import servicesImg from '@/assets/projets/services.png'
import { Button } from '@/components/ui/button'

const slides: Slide[] = [
  {
    id: 1,
    img: bloodImg,
    title: 'Blood Donation',
    subtitle: 'Application de don de sang',
    year: '2024',
    accent: '#ef4444',
    bg: 'linear-gradient(135deg, #7f1d1d, #450a0a)',
  },
  {
    id: 2,
    img: lepreuveImg,
    title: "L'Épreuve 2K",
    subtitle: 'Plateforme e-sport',
    year: '2024',
    accent: '#fbbf24',
    bg: 'linear-gradient(135deg, #78350f, #451a03)',
  },
  {
    id: 3,
    img: medicsImg,
    title: 'Medics',
    subtitle: 'Application médicale',
    year: '2023',
    accent: '#22d3ee',
    bg: 'linear-gradient(135deg, #155e75, #0c4a6e)',
  },
  {
    id: 4,
    img: montordevImg,
    title: 'Montordev',
    subtitle: 'Portfolio développeur',
    year: '2023',
    accent: '#a78bfa',
    bg: 'linear-gradient(135deg, #4c1d95, #2e1065)',
  },
  {
    id: 5,
    img: servicesImg,
    title: 'Services Pro',
    subtitle: 'Plateforme de services',
    year: '2024',
    accent: '#60a5fa',
    bg: 'linear-gradient(135deg, #1e3a5f, #0f172a)',
  },
  {
    id: 6,
    img: bloodImg,
    title: 'Blood Donation 2',
    subtitle: 'Application de don de sang',
    year: '2024',
    accent: '#ef4444',
    bg: 'linear-gradient(135deg, #7f1d1d, #450a0a)',
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
