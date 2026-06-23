'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import CinematicLayer from '@/components/CinematicLayer/CinematicLayer'
import styles from './VideoIntro.module.css'

interface Props {
  videoSrc: string
}

export default function VideoIntro({ videoSrc }: Props) {
  const heroRef       = useRef<HTMLDivElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const bgVideoRef    = useRef<HTMLVideoElement>(null)
  const contentRef    = useRef<HTMLDivElement>(null)
  const taglineRef    = useRef<HTMLSpanElement>(null)
  const firstRef      = useRef<HTMLSpanElement>(null)
  const lastRef       = useRef<HTMLSpanElement>(null)
  const subtitleRef   = useRef<HTMLParagraphElement>(null)
  const scrollRef     = useRef<HTMLButtonElement>(null)
  const soundBadgeRef = useRef<HTMLDivElement>(null)

  const [muted, setMuted]       = useState(true)
  const [playing, setPlaying]   = useState(true)
  const [showBadge, setShowBadge] = useState(true)

  // Auto-hide sound badge
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(false), 4500)
    return () => clearTimeout(t)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    let gsap: typeof import('gsap').gsap | undefined

    const animate = async () => {
      const mod = await import('gsap')
      gsap = mod.gsap

      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out' }
      )

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 16, letterSpacing: '0.45em' },
        { opacity: 1, y: 0, letterSpacing: '0.28em', duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      )

      tl.fromTo(
        firstRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: 'expo.out' },
        '-=0.8'
      )

      tl.fromTo(
        lastRef.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: 'expo.out' },
        '-=1.1'
      )

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.7'
      )

      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      )
    }

    animate()
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    const bg = bgVideoRef.current
    if (!v || !bg) return
    const next = !muted
    v.muted = next
    bg.muted = next
    setMuted(next)
    setShowBadge(false)
  }, [muted])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    const bg = bgVideoRef.current
    if (!v || !bg) return
    if (playing) {
      v.pause()
      bg.pause()
    } else {
      v.play()
      bg.play()
    }
    setPlaying(!playing)
  }, [playing])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className={styles.hero} style={{ opacity: 0 }}>

      {/* ── Ambient blurred background video ── */}
      <div className={styles.bgLayer} aria-hidden="true">
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* ── Primary foreground video ── */}
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div className={styles.gradientTop}    aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.gradientRight}  aria-hidden="true" />

      {/* ── Three.js bokeh layer ── */}
      <CinematicLayer />

      {/* ── Portfolio content ── */}
      <div ref={contentRef} className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          Creative Developer &amp; Visual Engineer
        </span>

        <h1 className={styles.name}>
          <span ref={firstRef} className={styles.nameFirst}>JORDAN</span>
          <span ref={lastRef}  className={styles.nameLast}>BLAKE</span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          Crafting immersive digital experiences at the intersection of
          <br className={styles.br} />
          engineering precision and cinematic visual storytelling.
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls} role="group" aria-label="Video controls">
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          title={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <PauseIcon />
            : <PlayIcon />}
        </button>

        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <MuteIcon /> : <SoundIcon />}
        </button>
      </div>

      {/* ── Sound badge ── */}
      <div
        ref={soundBadgeRef}
        className={`${styles.soundBadge} ${showBadge ? styles.badgeVisible : ''}`}
        aria-hidden="true"
      >
        <span className={styles.soundPulse} />
        Tap for sound
      </div>

      {/* ── Scroll indicator ── */}
      <button
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={scrollToWork}
        aria-label="Scroll to work section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>

    </section>
  )
}

// ── Minimal SVG icons ──────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M1 1.5L13 8L1 14.5V1.5Z" fill="currentColor"/>
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="4" height="14" rx="1" fill="currentColor"/>
      <rect x="9" y="1" width="4" height="14" rx="1" fill="currentColor"/>
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
      <path d="M8 1L3 5H1C0.447 5 0 5.447 0 6V10C0 10.553 0.447 11 1 11H3L8 15V1Z" fill="currentColor"/>
      <line x1="12" y1="5" x2="17" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="5" x2="12" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M8 1L3 5H1C0.447 5 0 5.447 0 6V10C0 10.553 0.447 11 1 11H3L8 15V1Z" fill="currentColor"/>
      <path d="M12 4C13.657 5.343 14.657 7.343 14.657 8C14.657 8.657 13.657 10.657 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 2C17.343 3.829 18.657 5.829 18.657 8C18.657 10.171 17.343 12.171 15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
