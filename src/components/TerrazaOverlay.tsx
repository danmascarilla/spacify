'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { PergolaConfig } from '@/types/pergola'

const PergolaScene = dynamic(() => import('./PergolaScene'), { ssr: false })

interface Transform {
  x: number
  y: number
  scale: number
  rotate: number  // grados
  opacity: number
}

interface TerrazaOverlayProps {
  config: PergolaConfig
  photoUrl: string
  onExit: () => void
}

export default function TerrazaOverlay({ config, photoUrl, onExit }: TerrazaOverlayProps) {
  const [t, setT] = useState<Transform>({ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 0.85 })

  // ── Drag ────────────────────────────────────────────────────────────────────
  const dragging = useRef(false)
  const dragStart = useRef({ mx: 0, my: 0, tx: 0, ty: 0 })

  const onDragStart = useCallback((e: React.PointerEvent) => {
    // Solo el botón principal / un dedo
    if (e.pointerType === 'touch' && e.isPrimary === false) return
    dragging.current = true
    dragStart.current = { mx: e.clientX, my: e.clientY, tx: t.x, ty: t.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [t.x, t.y])

  const onDragMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    setT(prev => ({
      ...prev,
      x: dragStart.current.tx + e.clientX - dragStart.current.mx,
      y: dragStart.current.ty + e.clientY - dragStart.current.my,
    }))
  }, [])

  const onDragEnd = useCallback(() => { dragging.current = false }, [])

  // ── Keyboard shortcuts ───────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onExit])

  const overlaySize = { w: 560, h: 420 }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* ── Foto de fondo ── */}
      <img
        src={photoUrl}
        alt="Tu terraza"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* ── Viñeta sutil para que la pérgola resalte ── */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* ── Canvas 3D flotante y arrastrable ── */}
      <div
        className="absolute cursor-grab active:cursor-grabbing touch-none"
        style={{
          width:  overlaySize.w,
          height: overlaySize.h,
          left: `calc(50% + ${t.x}px)`,
          top:  `calc(50% + ${t.y}px)`,
          transform: `translate(-50%, -50%) scale(${t.scale}) rotate(${t.rotate}deg)`,
          opacity: t.opacity,
          // Sin pointer-events en el canvas de r3f (los interceptaría para OrbitControls)
          // El drag lo manejamos en el wrapper
        }}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        {/* Borde punteado para indicar que es el objeto a posicionar */}
        <div className="absolute inset-0 border-2 border-dashed border-white/40 rounded-lg pointer-events-none z-10" />
        <PergolaScene config={config} transparent />
      </div>

      {/* ── Panel de controles ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl px-5 py-4 flex flex-col gap-3 min-w-[320px] max-w-[90vw]">
          <p className="text-white/60 text-xs text-center uppercase tracking-widest mb-1">
            Arrastra para colocar · Ajusta con los controles
          </p>

          <div className="grid grid-cols-3 gap-3">
            {/* Tamaño */}
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs text-center">Tamaño</label>
              <input
                type="range" min={0.2} max={1.5} step={0.01}
                value={t.scale}
                onChange={e => setT(p => ({ ...p, scale: +e.target.value }))}
                className="accent-white"
              />
            </div>
            {/* Rotación */}
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs text-center">Rotación</label>
              <input
                type="range" min={-45} max={45} step={1}
                value={t.rotate}
                onChange={e => setT(p => ({ ...p, rotate: +e.target.value }))}
                className="accent-white"
              />
            </div>
            {/* Opacidad */}
            <div className="flex flex-col gap-1">
              <label className="text-white/60 text-xs text-center">Opacidad</label>
              <input
                type="range" min={0.2} max={1} step={0.01}
                value={t.opacity}
                onChange={e => setT(p => ({ ...p, opacity: +e.target.value }))}
                className="accent-white"
              />
            </div>
          </div>

          {/* Botón resetear posición + salir */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setT({ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 0.85 })}
              className="flex-1 text-xs text-white/70 border border-white/20 rounded-lg py-2 hover:border-white/40 transition-colors"
            >
              Resetear posición
            </button>
            <button
              onClick={onExit}
              className="flex-1 text-xs bg-white text-black font-semibold rounded-lg py-2 hover:bg-white/90 transition-colors"
            >
              ✕ Salir
            </button>
          </div>
        </div>
      </div>

      {/* Badge ESC en desktop */}
      <div className="absolute top-4 right-4 hidden md:flex items-center gap-1.5 bg-black/50 text-white/60 text-xs px-3 py-1.5 rounded-full pointer-events-none">
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-white/80">ESC</kbd>
        para salir
      </div>
    </div>
  )
}
