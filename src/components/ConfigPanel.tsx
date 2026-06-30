'use client'

import { FINISH_LABELS, FINISH_HEX } from '@/config/catalog'
import { calculatePrice, formatPrice } from '@/utils/price'
import type { PergolaConfig, FinishType } from '@/types/pergola'

interface ConfigPanelProps {
  config: PergolaConfig
  onChange: (config: PergolaConfig) => void
  /** En móvil el panel se muestra como sheet inferior, controlado desde afuera */
  mobileOpen?: boolean
}

// ─── Slider con etiqueta y valor ─────────────────────────────────────────────
interface SliderRowProps {
  label: string
  unit: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

function SliderRow({ label, unit, value, min, max, step, onChange }: SliderRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900 tabular-nums">
          {value.toFixed(1)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                   accent-gray-800 touch-manipulation"
        style={{ touchAction: 'none' }}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

// ─── Selector de acabados ──────────────────────────────────────────────────
interface FinishSelectorProps {
  value: FinishType
  onChange: (f: FinishType) => void
}

function FinishSelector({ value, onChange }: FinishSelectorProps) {
  const finishes = Object.keys(FINISH_LABELS) as FinishType[]
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">Acabado</span>
      <div className="grid grid-cols-4 gap-2">
        {finishes.map(f => (
          <button
            key={f}
            onClick={() => onChange(f)}
            title={FINISH_LABELS[f]}
            className={`
              flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all
              ${value === f
                ? 'border-gray-800 shadow-md scale-105'
                : 'border-gray-200 hover:border-gray-400'
              }
            `}
          >
            {/* Muestra de color */}
            <div
              className="w-8 h-8 rounded-lg shadow-inner"
              style={{ backgroundColor: FINISH_HEX[f] }}
            />
            <span className="text-xs text-gray-600 leading-tight text-center">
              {FINISH_LABELS[f]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Panel principal ───────────────────────────────────────────────────────
export default function ConfigPanel({ config, onChange, mobileOpen }: ConfigPanelProps) {
  const price = calculatePrice(config)

  function set<K extends keyof PergolaConfig>(key: K, value: PergolaConfig[K]) {
    onChange({ ...config, [key]: value })
  }

  function handleBudgetRequest() {
    const summary = [
      `📐 Dimensiones: ${config.width}m × ${config.depth}m`,
      `📏 Altura: ${config.height}m`,
      `🔲 Lamas: ${config.numLamas} unidades`,
      `🎨 Acabado: ${FINISH_LABELS[config.finish]}`,
      `💶 Precio estimado: ${formatPrice(price)} (IVA incl.)`,
    ].join('\n')

    alert(`Resumen de configuración:\n\n${summary}\n\n✅ En producción esto enviará el presupuesto a tu email.`)
  }

  return (
    <aside
      className={`
        bg-white/95 backdrop-blur-sm border-l border-gray-100 shadow-xl
        flex flex-col
        /* Desktop: columna lateral fija */
        md:w-80 md:h-full md:relative md:translate-y-0
        /* Móvil: sheet inferior que sube */
        fixed bottom-0 left-0 right-0 z-30 rounded-t-2xl
        transition-transform duration-300
        ${mobileOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'}
        md:translate-y-0
      `}
    >
      {/* Handle visible solo en móvil */}
      <div className="md:hidden flex justify-center pt-2.5 pb-1 cursor-grab">
        <div className="w-10 h-1 rounded-full bg-gray-300" />
      </div>

      {/* Precio destacado */}
      <div className="px-5 py-4 bg-gray-900 text-white">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">
          Precio estimado
        </p>
        <p className="text-3xl font-bold tabular-nums leading-none">
          {formatPrice(price)}
        </p>
        <p className="text-xs text-gray-400 mt-1">IVA incluido · Instalación no incluida</p>
      </div>

      {/* Controles de configuración */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        <SliderRow
          label="Ancho"
          unit="m"
          value={config.width}
          min={2}
          max={6}
          step={0.1}
          onChange={v => set('width', v)}
        />
        <SliderRow
          label="Fondo"
          unit="m"
          value={config.depth}
          min={2}
          max={6}
          step={0.1}
          onChange={v => set('depth', v)}
        />
        <SliderRow
          label="Altura"
          unit="m"
          value={config.height}
          min={2}
          max={3.5}
          step={0.1}
          onChange={v => set('height', v)}
        />
        <SliderRow
          label="Número de lamas"
          unit=""
          value={config.numLamas}
          min={5}
          max={20}
          step={1}
          onChange={v => set('numLamas', Math.round(v))}
        />

        <div className="border-t border-gray-100 pt-4">
          <FinishSelector
            value={config.finish}
            onChange={v => set('finish', v)}
          />
        </div>

        {/* Área calculada */}
        <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3">
          Área: {config.width.toFixed(1)} × {config.depth.toFixed(1)} ={' '}
          <span className="font-semibold text-gray-600">
            {(config.width * config.depth).toFixed(1)} m²
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6 pt-3 border-t border-gray-100">
        <button
          onClick={handleBudgetRequest}
          className="
            w-full py-3.5 px-6 rounded-xl font-semibold text-base
            bg-gray-900 text-white
            hover:bg-gray-700 active:scale-95
            transition-all duration-150 shadow-lg
            touch-manipulation
          "
        >
          Pedir presupuesto →
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          Sin compromiso · Respuesta en 24h
        </p>
      </div>
    </aside>
  )
}
