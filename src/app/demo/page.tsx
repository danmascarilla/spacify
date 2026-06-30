'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import ConfigPanel from '@/components/ConfigPanel'
import TerrazaOverlay from '@/components/TerrazaOverlay'
import SpacifyLogo from '@/components/SpacifyLogo'
import { DEFAULTS } from '@/config/catalog'
import type { PergolaConfig } from '@/types/pergola'

const PergolaScene = dynamic(() => import('@/components/PergolaScene'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#E8E4DE]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Cargando escena 3D…</p>
      </div>
    </div>
  ),
})

export default function DemoPage() {
  const [config, setConfig] = useState<PergolaConfig>(DEFAULTS)
  const [panelOpen, setPanelOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [terrazaMode, setTerrazaMode] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoUrl(url)
    setTerrazaMode(true)
  }

  function exitTerraza() {
    setTerrazaMode(false)
  }

  return (
    <>
      {/* ── Modo terraza: ocupa toda la pantalla por encima de todo ── */}
      {terrazaMode && photoUrl && (
        <TerrazaOverlay
          config={config}
          photoUrl={photoUrl}
          onExit={exitTerraza}
        />
      )}

      <main className="flex h-screen w-screen overflow-hidden bg-gray-100">
        {/* ── Header ── */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2.5 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link href="/">
              <SpacifyLogo size="sm" variant="dark" />
            </Link>
            <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
              DEMO
            </span>
          </div>

          <p className="hidden md:block text-xs text-gray-400">
            Arrastra para rotar · Scroll para zoom
          </p>

          <div className="flex items-center gap-2">
            {/* Botón ver en terraza */}
            <button
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-medium bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              title="Sube una foto de tu terraza y coloca la pérgola encima"
            >
              <span>📸</span>
              <span className="hidden sm:inline">Ver en mi terraza</span>
            </button>

            {/* Toggle panel móvil */}
            <button
              className="md:hidden text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
              onClick={() => setPanelOpen(o => !o)}
            >
              {panelOpen ? 'Ver 3D' : 'Configurar'}
            </button>
          </div>

          {/* Input file oculto */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoSelect}
          />
        </header>

        {/* ── Layout principal ── */}
        <div className="flex-1 pt-[52px] flex flex-col md:flex-row h-full">
          {/* Canvas 3D */}
          <div className="flex-1 relative">
            <PergolaScene config={config} />

            {/* Hint móvil */}
            <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
              Pellizca para zoom · Arrastra para rotar
            </div>

            {/* Hint "ver en terraza" si ya hay foto guardada */}
            {photoUrl && !terrazaMode && (
              <button
                onClick={() => setTerrazaMode(true)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur text-white text-xs px-4 py-2 rounded-full hover:bg-black/80 transition-colors"
              >
                📸 Volver a ver en tu terraza
              </button>
            )}
          </div>

          {/* Panel de configuración */}
          <ConfigPanel
            config={config}
            onChange={setConfig}
            mobileOpen={panelOpen}
          />
        </div>
      </main>
    </>
  )
}
