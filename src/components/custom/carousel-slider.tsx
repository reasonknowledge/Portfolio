import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useState, useEffect, useRef, useCallback, type FC, type CSSProperties } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Slide {
  id: string | number
  img: string
  title: string
  subtitle?: string
  year?: string
  accent?: string
  bg?: string
}

export interface PremiumCarouselProps {
  slides: Slide[]
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  onSlideChange?: (index: number) => void
}

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_ACCENT = '#a78bfa'
const DEFAULT_BG = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
const TRANSITION_MS = 650
const DRAG_THRESHOLD = 60

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function getCoverflowStyle(offset: number): CSSProperties | null {
  const abs = Math.abs(offset)
  if (abs > 2) return null

  return {
    transform: [`translateX(${offset * 54}%)`, `translateZ(${-abs * 180}px)`, `rotateY(${offset * -38}deg)`, `scale(${1 - abs * 0.18})`].join(' '),
    opacity: 1 - abs * 0.35,
    zIndex: 10 - abs,
    filter: `brightness(${1 - abs * 0.3})`,
    cursor: offset === 0 ? 'default' : 'pointer',
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Montserrat:wght@300;400;600&display=swap');
  .pc-carousel, .pc-carousel * { box-sizing: border-box; }

  .pc-slide {
    transition:
      transform ${TRANSITION_MS}ms cubic-bezier(0.23,1,0.32,1),
      opacity   ${TRANSITION_MS}ms cubic-bezier(0.23,1,0.32,1),
      filter    ${TRANSITION_MS}ms ease;
  }

  .pc-btn {
    transition: transform 0.3s ease, background 0.3s ease, opacity 0.3s ease;
  }
  .pc-btn:not(:disabled):hover  { transform: scale(1.1); background: rgba(255,255,255,0.15) !important; }
  .pc-btn:not(:disabled):active { transform: scale(0.95); }

  .pc-dot { transition: width 0.35s ease, background 0.5s ease; cursor: pointer; }
  .pc-dot:hover { opacity: 0.85; }

  .pc-progress { animation: pc-prog var(--delay) linear forwards; }
  @keyframes pc-prog { from { width: 0% } to { width: 100% } }

  .pc-in { animation: pc-up 0.55s cubic-bezier(0.23,1,0.32,1) both; }
  @keyframes pc-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .pc-shine {
    position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
  }
  .pc-stage {
    cursor: grab;
  }
  .pc-stage.is-dragging {
    cursor: grabbing;
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// Composant
// ─────────────────────────────────────────────────────────────────────────────

const PremiumCarousel: FC<PremiumCarouselProps> = ({ slides = [], autoplay = true, autoplayDelay = 4000, loop = true, onSlideChange }) => {
  const TOTAL = slides.length

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [dragging, setDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<number>(0)
  const [dragDelta, setDragDelta] = useState<number>(0)

  // ✅ FIX 1 : ref pour avoir activeIndex à jour dans les callbacks sans les
  //            remettre dans les deps (évite la boucle infinie de l'autoplay)
  const activeIndexRef = useRef<number>(activeIndex)
  const isTransitioningRef = useRef<boolean>(isTransitioning)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    isTransitioningRef.current = isTransitioning
  }, [isTransitioning])

  // ── Navigation ──────────────────────────────────────────────────────────────

  // ✅ FIX 1 (suite) : goTo lit activeIndex via la ref, pas via une closure
  const goTo = useCallback(
    (index: number): void => {
      if (isTransitioningRef.current || TOTAL === 0) return
      const next = loop ? mod(index, TOTAL) : clamp(index, 0, TOTAL - 1)
      setIsTransitioning(true)
      setActiveIndex(next)
      onSlideChange?.(next)
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS)
    },
    [TOTAL, loop, onSlideChange]
  )

  // ✅ FIX 1 (suite) : next/prev utilisent la ref, donc goTo n'est plus dans
  //                    leurs deps — la référence de next est stable
  const next = useCallback(() => {
    goTo(activeIndexRef.current + 1)
  }, [goTo])

  const prev = useCallback(() => {
    goTo(activeIndexRef.current - 1)
  }, [goTo])

  // ── Autoplay ────────────────────────────────────────────────────────────────

  const resetAutoplay = useCallback((): void => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (autoplay) autoplayRef.current = setInterval(next, autoplayDelay)
  }, [autoplay, autoplayDelay, next])

  // ✅ FIX 1 (suite) : next est stable → l'effet ne se relance plus en boucle
  useEffect(() => {
    if (autoplay) autoplayRef.current = setInterval(next, autoplayDelay)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [next, autoplay, autoplayDelay])

  // ── Handlers boutons ────────────────────────────────────────────────────────

  const handleNext = useCallback((): void => {
    next()
    resetAutoplay()
  }, [next, resetAutoplay])

  const handlePrev = useCallback((): void => {
    prev()
    resetAutoplay()
  }, [prev, resetAutoplay])

  const handleDot = useCallback(
    (i: number): void => {
      goTo(i)
      resetAutoplay()
    },
    [goTo, resetAutoplay]
  )

  // ── Drag / Swipe ────────────────────────────────────────────────────────────

  // ✅ FIX 2 : extraction de clientX correcte selon le type d'événement React
  const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
    if (e.type.startsWith('touch')) {
      const touch = (e as React.TouchEvent).touches[0] ?? (e as React.TouchEvent).changedTouches[0]
      return touch?.clientX ?? 0
    }
    return (e as React.MouseEvent).clientX
  }

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent): void => {
    setDragging(true)
    setDragStart(getClientX(e))
    setDragDelta(0)
  }

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent): void => {
    if (!dragging) return
    setDragDelta(getClientX(e) - dragStart)
  }

  const onPointerUp = (): void => {
    if (!dragging) return
    if (dragDelta < -DRAG_THRESHOLD) handleNext()
    else if (dragDelta > DRAG_THRESHOLD) handlePrev()
    setDragging(false)
    setDragDelta(0)
  }

  // ── Clavier ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNext, handlePrev])

  // ── Garde ────────────────────────────────────────────────────────────────────

  if (TOTAL === 0) return null

  const active = slides[activeIndex]
  const accent = active.accent ?? DEFAULT_ACCENT
  const bg = active.bg ?? DEFAULT_BG
  const canPrev = loop || activeIndex > 0
  const canNext = loop || activeIndex < TOTAL - 1

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className="pc-carousel"
      style={{
        minHeight: '100%',
        flex: 1,
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Playfair Display', Georgia, serif",
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        // ✅ FIX 4 : zIndex -20 retiré — rendait les événements inaccessibles
      }}
    >
      <style>{GLOBAL_STYLES}</style>

      {/* Fond ambiant */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: bg,
          opacity: 0.18,
          transition: 'background 1s ease',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%,-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          filter: 'blur(60px)',
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          transition: 'background 1s ease',
          zIndex: 0,
        }}
      />

      {/* En-tête */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 10,
          position: 'relative',
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 11,
            marginTop: -0,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: accent,
            transition: 'color 0.6s',
          }}
        >
          Premium Collection
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px,5vw,52px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: -1,
            marginTop: 4,
          }}
        >
          Projets
        </h1>
      </div>

      {/* Stage Coverflow */}
      <div
        className={`pc-stage${dragging ? ' is-dragging' : ''}`}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(280px, 60vw, 400px)',
          perspective: 1400,
          perspectiveOrigin: '50% 50%',
          zIndex: 10,
        }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {slides.map((slide: Slide, i: number) => {
            let offset = i - activeIndex
            if (loop) {
              if (offset > TOTAL / 2) offset -= TOTAL
              if (offset < -TOTAL / 2) offset += TOTAL
            }

            const coverflowStyle = getCoverflowStyle(offset)
            if (!coverflowStyle) return null

            return (
              <div
                key={slide.id}
                className="pc-slide"
                onClick={() => {
                  if (offset !== 0) {
                    if (offset > 0) {
                      handleNext()
                    } else {
                      handlePrev()
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(280px, 85vw, 600px)',
                  height: 'clamp(200px, 55vw, 380px)',
                  marginLeft: 'calc(clamp(280px, 85vw, 600px) * -0.5)',
                  marginTop: 'calc(clamp(200px, 55vw, 380px) * -0.5)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  ...coverflowStyle,
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
                <div className="pc-shine" />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  }}
                />

                {offset === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'clamp(12px, 4vw, 28px)',
                    }}
                  >
                    {slide.year && (
                      <p
                        className="pc-in"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 300,
                          fontSize: 'clamp(9px, 2.5vw, 11px)',
                          letterSpacing: 4,
                          textTransform: 'uppercase',
                          color: slide.accent ?? DEFAULT_ACCENT,
                          marginBottom: 6,
                          animationDelay: '0.05s',
                        }}
                      >
                        {slide.year}
                      </p>
                    )}
                    <h2
                      className="pc-in"
                      style={{
                        fontSize: 'clamp(14px, 4vw, 24px)',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.3,
                        marginBottom: 4,
                        animationDelay: '0.12s',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                      }}
                    >
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p
                        className="pc-in"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 300,
                          fontSize: 'clamp(10px, 2.5vw, 12px)',
                          color: 'rgba(255,255,255,0.85)',
                          letterSpacing: 0.5,
                          animationDelay: '0.2s',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          marginTop: 10,
          zIndex: 20,
          position: 'relative',
        }}
      >
        <button
          className="pc-btn"
          onClick={handlePrev}
          disabled={!canPrev}
          aria-label="Slide précédente"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `1px solid ${accent}44`,
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontSize: 18,
            cursor: canPrev ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            opacity: canPrev ? 1 : 0.3,
          }}
        >
          <ArrowLeftIcon size={18} />
        </button>

        {/* Pagination dots */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {slides.map((_: Slide, i: number) => (
            <div
              key={i}
              className="pc-dot"
              role="button"
              tabIndex={0}
              aria-label={`Aller à la slide ${i + 1}`}
              onClick={() => handleDot(i)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => e.key === 'Enter' && handleDot(i)}
              style={{
                width: i === activeIndex ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeIndex ? accent : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

        <button
          className="pc-btn"
          onClick={handleNext}
          disabled={!canNext}
          aria-label="Slide suivante"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `1px solid ${accent}44`,
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontSize: 18,
            cursor: canNext ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            opacity: canNext ? 1 : 0.3,
          }}
        >
          <ArrowRightIcon size={18} />
        </button>
      </div>

      {/* ✅ FIX 3 : Barre de progression — key sur la barre elle-même */}
      {autoplay && (
        <div
          style={{
            width: 200,
            height: 2,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            marginTop: 20,
            overflow: 'hidden',
            zIndex: 20,
            position: 'relative',
          }}
        >
          <div
            key={`progress-${activeIndex}`}
            className="pc-progress"
            style={
              {
                '--delay': `${autoplayDelay}ms`,
                height: '100%',
                background: accent,
                borderRadius: 2,
                transition: 'background 0.6s ease',
              } as CSSProperties & { '--delay': string }
            }
          />
        </div>
      )}

      {/* Compteur */}
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 3,
          marginTop: 16,
          zIndex: 20,
          position: 'relative',
        }}
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </p>
    </div>
  )
}

export default PremiumCarousel
