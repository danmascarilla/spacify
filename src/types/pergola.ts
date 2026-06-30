export type FinishType = 'white' | 'anthracite' | 'sand' | 'bronze'

export interface PergolaConfig {
  /** Ancho de la pérgola en metros (eje X). Rango: 2–6 m */
  width: number
  /** Fondo de la pérgola en metros (eje Z). Rango: 2–6 m */
  depth: number
  /** Altura de los postes en metros. Rango: 2–3.5 m */
  height: number
  /** Número de lamas horizontales. Rango: 5–20 */
  numLamas: number
  /** Acabado/color del aluminio */
  finish: FinishType
}
