'use client'
import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let w: number, h: number, loopId: number, particles: Particle[] = []

    const options = {
      particleColor: 'rgba(147,197,253,0.42)',
      lineColor: 'rgba(96,165,250)',
      particleAmount: 48,
      defaultRadius: 0.75,
      variantRadius: 0.65,
      defaultSpeed: 0.08,
      variantSpeed: 0.05,
      linkRadius: 120,
    }

    const baseW = 2800, baseH = 1200
    const basePerimeter = baseW + baseH
    const rgb = options.lineColor.match(/\d+/g)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resizeReset = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    class Particle {
      x: number; y: number; color: string; radius: number
      speed: number; directionAngle: number; vector: { x: number; y: number }
      constructor() {
        this.x = Math.random() * w; this.y = Math.random() * h
        this.color = options.particleColor
        this.radius = options.defaultRadius + Math.random() * options.variantRadius
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed
        this.directionAngle = Math.floor(Math.random() * 360)
        this.vector = { x: Math.cos(this.directionAngle) * this.speed, y: Math.sin(this.directionAngle) * this.speed }
      }
      update() { this.border(); this.x += this.vector.x; this.y += this.vector.y }
      border() {
        if (this.x >= w || this.x <= 0) this.vector.x *= -1
        if (this.y >= h || this.y <= 0) this.vector.y *= -1
        this.x = Math.max(0, Math.min(w, this.x))
        this.y = Math.max(0, Math.min(h, this.y))
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color; ctx.fill()
      }
    }

    const initializeParticles = () => {
      const scale = (w + h) / basePerimeter
      options.particleAmount = Math.min(72, Math.max(28, (w + h) / 78))
      options.defaultSpeed = Math.sqrt(scale) * 0.08
      options.variantSpeed = Math.sqrt(scale) * 0.06
      options.linkRadius = w / 12 + h / 7
      particles = Array.from({ length: options.particleAmount }, () => new Particle())
    }

    const checkDistance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    const linkPoints = (point: Particle, hubs: Particle[]) => {
      hubs.forEach(hub => {
        const dist = checkDistance(point.x, point.y, hub.x, hub.y)
        const opacity = 1 - dist / options.linkRadius
        if (opacity > 0) {
          ctx.lineWidth = 0.35
          ctx.strokeStyle = `rgba(${rgb![0]}, ${rgb![1]}, ${rgb![2]}, ${opacity * 0.22})`
          ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(hub.x, hub.y); ctx.stroke()
        }
      })
    }

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => linkPoints(p, particles))
      particles.forEach(p => { p.update(); p.draw() })
      loopId = requestAnimationFrame(loop)
    }

    resizeReset(); initializeParticles()
    loopId = requestAnimationFrame(loop)
    const handleResize = () => { resizeReset(); initializeParticles() }
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(loopId); window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <>
      {/* Base dark bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, background: '#020617', pointerEvents: 'none' }} />

      {/* Diffuse bloom — wide light spill from below */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '200vw', height: '85vh', zIndex: -9, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(56,130,246,0.45) 0%, rgba(37,99,235,0.28) 25%, rgba(29,78,216,0.14) 50%, transparent 72%)',
        filter: 'blur(40px)',
      }} />

      {/* THE ORB — giant glowing hemisphere */}
      <div style={{
        position: 'fixed',
        bottom: '-38vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '160vw',
        height: '115vh',
        borderRadius: '50%',
        zIndex: -8,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 78%, #dbeafe 0%, #93c5fd 5%, #60a5fa 14%, #3b82f6 26%, #2563eb 40%, #1d4ed8 54%, #1e3a8a 67%, #0f172a 80%, transparent 92%)',
      }} />

      {/* Rim glow — bright white luminous arc */}
      <div style={{
        position: 'fixed',
        bottom: '18vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '140vw',
        height: '4px',
        borderRadius: '50%',
        zIndex: -7,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,1) 0%, rgba(219,234,254,0.9) 15%, rgba(147,197,253,0.6) 40%, transparent 68%)',
        boxShadow: [
          '0 0 30px 12px rgba(255,255,255,0.55)',
          '0 0 70px 30px rgba(186,230,255,0.45)',
          '0 0 130px 65px rgba(96,165,250,0.30)',
          '0 0 220px 110px rgba(59,130,246,0.18)',
        ].join(', '),
        filter: 'blur(1px)',
      }} />

      {/* Second softer rim layer for depth */}
      <div style={{
        position: 'fixed',
        bottom: '14vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150vw',
        height: '80px',
        borderRadius: '50%',
        zIndex: -7,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(147,197,253,0.55) 0%, rgba(96,165,250,0.30) 35%, transparent 65%)',
        filter: 'blur(14px)',
      }} />

      {/* Particles canvas */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0, zIndex: -6,
        width: '100%', height: '100%', pointerEvents: 'none',
      }} />
    </>
  )
}

export default ParticleBackground