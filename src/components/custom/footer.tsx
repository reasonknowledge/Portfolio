import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 relative">
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className={`
            absolute -top-5 left-1/2 -translate-x-1/2
            w-9 h-9 rounded-full
            bg-white border hover:bg-black
            text-black font-bold
            flex items-center justify-center
            shadow-lg shadow-black-500/20
            transition-all duration-300
            ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible pointer-events-none'}
          `}
        >
          <ChevronUp className="text-lg hover:text-white hover:" />
        </button>

        <div className="flex justify-center gap-8 md:gap-10 mb-10">
          <a
            href="https://github.com/reasonknowledge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-cyan-400 transition-colors duration-300 text-2xl hover:-translate-y-1"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-cyan-400 transition-colors duration-300 text-2xl hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/tonpseudo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-cyan-400 transition-colors duration-300 text-2xl hover:-translate-y-1"
            aria-label="X / Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="mailto:franckngoubounkou@gamil.com"
            className="text-neutral-400 hover:text-cyan-400 transition-colors duration-300 text-2xl hover:-translate-y-1"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
        <div className="text-center space-y-3">
          <p className="text-neutral-400 text-sm md:text-base">© {currentYear} Franck — Tous droits réservés</p>
          <p className="text-neutral-500 text-sm italic">Crafted with passion, coffee & a bit of chaos</p>
        </div>
      </div>
    </footer>
  )
}
