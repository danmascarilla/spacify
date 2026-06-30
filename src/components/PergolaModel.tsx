'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { STRUCTURE, FINISH_HEX } from '@/config/catalog'
import type { PergolaConfig } from '@/types/pergola'

// ─── Material de aluminio según acabado ─────────────────────────────────────
type MatProps = { color: string; metalness: number; roughness: number }

const FINISH_MAT: Record<PergolaConfig['finish'], MatProps> = {
  white:      { color: FINISH_HEX.white,      metalness: 0.55, roughness: 0.35 },
  anthracite: { color: FINISH_HEX.anthracite, metalness: 0.70, roughness: 0.25 },
  sand:       { color: FINISH_HEX.sand,       metalness: 0.45, roughness: 0.45 },
  bronze:     { color: FINISH_HEX.bronze,     metalness: 0.60, roughness: 0.30 },
}

function useAluminumMaterial(finish: PergolaConfig['finish']) {
  return useMemo(() => {
    const { color, metalness, roughness } = FINISH_MAT[finish]
    return new THREE.MeshStandardMaterial({ color, metalness, roughness })
  }, [finish])
}

// ─── Pieza genérica: caja con sombras ───────────────────────────────────────
interface BoxPieceProps {
  position: [number, number, number]
  size: [number, number, number]
  material: THREE.Material
}

function BoxPiece({ position, size, material }: BoxPieceProps) {
  return (
    <mesh
      position={position}
      castShadow
      receiveShadow
      material={material}
    >
      <boxGeometry args={size} />
    </mesh>
  )
}

// ─── Componente principal ────────────────────────────────────────────────────
interface PergolaModelProps {
  config: PergolaConfig
}

export default function PergolaModel({ config }: PergolaModelProps) {
  const { width, depth, height, numLamas, finish } = config
  const {
    postWidth,
    mainBeamH, mainBeamW,
    secBeamH, secBeamW,
    lamaH, lamaW,
    numSecBeams,
  } = STRUCTURE

  const mat = useAluminumMaterial(finish)

  /**
   * COORDENADAS:
   * - X = ancho (izquierda ↔ derecha)
   * - Y = alto (arriba ↕)
   * - Z = fondo (cerca ↔ lejos)
   * El centro de la pérgola está en (0, 0, 0) al nivel del suelo.
   */

  // ── Postes (4 esquinas) ──────────────────────────────────────────────────
  // Cada poste está centrado en su esquina, su base toca el suelo (y=0)
  const halfW = width / 2 - postWidth / 2
  const halfD = depth / 2 - postWidth / 2
  const postY = height / 2  // centro del poste en Y

  const posts = [
    [-halfW, postY, -halfD],
    [ halfW, postY, -halfD],
    [-halfW, postY,  halfD],
    [ halfW, postY,  halfD],
  ] as [number, number, number][]

  // ── Vigas principales (frontales/traseras, corren en X) ──────────────────
  // Se apoyan sobre los postes, su parte inferior toca la cima del poste
  const mainBeamY = height + mainBeamH / 2
  const mainBeams = [
    [0, mainBeamY, -(depth / 2 - mainBeamW / 2)],   // frontal
    [0, mainBeamY,  (depth / 2 - mainBeamW / 2)],   // trasera
  ] as [number, number, number][]

  // ── Vigas secundarias (corren en Z, conectan las dos vigas principales) ──
  // Se distribuyen uniformemente a lo ancho, apoyadas sobre las vigas principales
  const secBeamY = mainBeamY + mainBeamH / 2 + secBeamH / 2
  const secBeams = useMemo(() => {
    const beams: [number, number, number][] = []
    // Incluye los extremos y las intermedias
    for (let i = 0; i <= numSecBeams + 1; i++) {
      const x = -width / 2 + (width / (numSecBeams + 1)) * i
      beams.push([x, secBeamY, 0])
    }
    return beams
  }, [width, depth, secBeamY, numSecBeams])

  // ── Lamas (corren en Z, distribuidas a lo ancho) ─────────────────────────
  // Las lamas son las piezas decorativas superiores (el "techo" de la pérgola)
  const lamaY = secBeamY + secBeamH / 2 + lamaH / 2
  const lamas = useMemo(() => {
    const result: [number, number, number][] = []
    // Margen de media lama en cada extremo para que no sobresalgan
    const usableWidth = width - lamaW
    for (let i = 0; i < numLamas; i++) {
      const x = -usableWidth / 2 + (usableWidth / (numLamas - 1)) * i
      result.push([x, lamaY, 0])
    }
    return result
  }, [width, depth, lamaY, numLamas, lamaW])

  return (
    <group>
      {/* ── Postes ── */}
      {posts.map((pos, i) => (
        <BoxPiece
          key={`post-${i}`}
          position={pos}
          size={[postWidth, height, postWidth]}
          material={mat}
        />
      ))}

      {/* ── Vigas principales (eje X) ── */}
      {mainBeams.map((pos, i) => (
        <BoxPiece
          key={`main-beam-${i}`}
          position={pos}
          size={[width, mainBeamH, mainBeamW]}
          material={mat}
        />
      ))}

      {/* ── Vigas secundarias (eje Z) ── */}
      {secBeams.map((pos, i) => (
        <BoxPiece
          key={`sec-beam-${i}`}
          position={pos}
          size={[secBeamW, secBeamH, depth - mainBeamW * 2]}
          material={mat}
        />
      ))}

      {/* ── Lamas (eje Z, encima de vigas secundarias) ── */}
      {lamas.map((pos, i) => (
        <BoxPiece
          key={`lama-${i}`}
          position={pos}
          size={[lamaW, lamaH, depth - mainBeamW * 2]}
          material={mat}
        />
      ))}
    </group>
  )
}
