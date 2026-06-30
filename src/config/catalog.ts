import type { FinishType, PergolaConfig } from '@/types/pergola'

// ─── Precios ────────────────────────────────────────────────────────────────
// Todos los valores aquí son ficticios para la demo. Ajustar con precios reales.

export const PRICING = {
  /** Precio base por metro cuadrado de suelo (ancho × fondo) */
  pricePerSqm: 850,

  /** Suplemento fijo por acabado premium */
  finishSurcharge: {
    white: 0,
    anthracite: 200,
    sand: 120,
    bronze: 280,
  } satisfies Record<FinishType, number>,

  /** IVA incluido en el precio mostrado */
  vatIncluded: true,
}

// ─── Valores por defecto del configurador ───────────────────────────────────
export const DEFAULTS: PergolaConfig = {
  width: 4,
  depth: 3,
  height: 2.5,
  numLamas: 12,
  finish: 'anthracite',
}

// ─── Etiquetas de UI ────────────────────────────────────────────────────────
export const FINISH_LABELS: Record<FinishType, string> = {
  white: 'Blanco',
  anthracite: 'Antracita',
  sand: 'Arena',
  bronze: 'Bronce',
}

export const FINISH_HEX: Record<FinishType, string> = {
  white: '#F0F0F0',
  anthracite: '#3D3D3D',
  sand: '#C4A882',
  bronze: '#6B4C2A',
}

// ─── Dimensiones físicas de las piezas (en metros) ──────────────────────────
// Cambia aquí si quieres ajustar proporciones visuales sin tocar el componente 3D.
export const STRUCTURE = {
  postWidth: 0.10,      // sección del poste (cuadrado)
  mainBeamH: 0.12,      // altura de la viga principal
  mainBeamW: 0.10,      // ancho de la viga principal
  secBeamH: 0.10,       // altura de la viga secundaria
  secBeamW: 0.08,       // ancho de la viga secundaria
  lamaH: 0.03,          // grosor de la lama
  lamaW: 0.12,          // ancho de la lama (vista frontal)
  numSecBeams: 3,       // vigas secundarias fijas (entre los 2 postes laterales)
}
