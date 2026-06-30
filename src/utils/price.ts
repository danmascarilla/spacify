import { PRICING } from '@/config/catalog'
import type { PergolaConfig } from '@/types/pergola'

/**
 * Calcula el precio estimado de la pérgola según su configuración.
 * Fórmula: (área × precio/m²) + suplemento acabado
 * Los precios son orientativos para la demo.
 */
export function calculatePrice(config: PergolaConfig): number {
  const area = config.width * config.depth
  const base = area * PRICING.pricePerSqm
  const surcharge = PRICING.finishSurcharge[config.finish]
  return Math.round(base + surcharge)
}

/** Formatea un número como precio en euros */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}
