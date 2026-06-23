'use client'

import { useEffect, useRef } from 'react'
import styles from './CinematicLayer.module.css'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  phase: number
  speed: number
  size: number
  alpha: number
  color: [number, number, number]
}

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let particles: Particle[] = []
    let t = 0

    const WARM_PALETTE: [number, number, number][] = [
      [245, 158, 11],   // amber
      [251, 191, 36],   // gold
      [253, 230, 138],  // pale gold
      [255, 255, 255],  // white
      [147, 197, 253],  // ice blue
      [234, 88, 12],    // ember
    ]

    const init = () => {
      canvas.width = W
      canvas.height = H
      particles = []

      const count = Math.min(180, Math.floor((W * H) / 8000))
      for (let i = 0; i < count; i++) {
        const color = WARM_PALETTE[Math.floor(Math.random() * WARM_PALETTE.length)]
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: Math.random(),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0003 + Math.random() * 0.0006,
          size: 1.5 + Math.random() * 4 * Math.random(),
          alpha: 0.05 + Math.random() * 0.35,
          color,
        })
      }
    }

    const drawGlowDot = (
      x: number, y: number, r: number,
      color: [number, number, number], alpha: number
    ) => {
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
      grd.addColorStop(0,   `rgba(${color[0]},${color[1]},${color[2]},${alpha})`)
      grd.addColorStop(0.3, `rgba(${color[0]},${color[1]},${color[2]},${alpha * 0.4})`)
      grd.addColorStop(1,   `rgba(${color[0]},${color[1]},${color[2]},0)`)
      ctx.beginPath()
      ctx.arc(x, y, r * 4, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
    }

    const render = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x / W - 0.5
      const my = mouseRef.current.y / H - 0.5

      // Vignette overlay
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.5)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        const depth = 0.3 + p.z * 0.7
        const sway = Math.sin(t * p.speed + p.phase) * 30 * depth

        const px = (p.x + mx * 40 * depth + sway) % W
        const py = (p.y + my * 25 * depth + Math.cos(t * p.speed * 0.7 + p.phase) * 15 * depth) % H

        const sxWrapped = ((px % W) + W) % W
        const syWrapped = ((py % H) + H) % H

        const pulse = 0.7 + 0.3 * Math.sin(t * p.speed * 3 + p.phase)
        const r = p.size * depth * pulse
        const a = p.alpha * depth * pulse

        drawGlowDot(sxWrapped, syWrapped, r, p.color, a)
      }

      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(render)
    }

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      init()
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    init()
    render()
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
