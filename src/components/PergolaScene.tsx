'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import PergolaModel from './PergolaModel'
import type { PergolaConfig } from '@/types/pergola'

interface PergolaSceneProps {
  config: PergolaConfig
  /** Modo terraza: fondo transparente, sin suelo ni grid */
  transparent?: boolean
}

export default function PergolaScene({ config, transparent = false }: PergolaSceneProps) {
  return (
    <Canvas
      shadows
      // demand = solo renderiza cuando hay cambios (OrbitControls llama
      // invalidate() automáticamente al moverse). Elimina el bucle
      // continuo de ~60fps que causaba el lag.
      frameloop="demand"
      // Limita el pixel ratio: en móviles con pantalla 3x no necesitamos
      // renderizar al triple de resolución
      dpr={[1, 1.5]}
      // Degradación adaptativa: si baja de 30fps, reduce calidad hasta 0.75×
      performance={{ min: 0.75 }}
      camera={{ position: [6, 4, 8], fov: 45 }}
      style={{ background: transparent ? 'transparent' : '#E8E4DE' }}
      gl={{ antialias: true, alpha: transparent }}
    >
      <ambientLight intensity={0.6} color="#FFF5E0" />

      <directionalLight
        position={[8, 12, 5]}
        intensity={2.5}
        color="#FFF8F0"
        castShadow
        // 1024 en vez de 2048: misma calidad visible, ¼ de memoria GPU
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.8} color="#C8DEFF" />

      <Environment preset="apartment" />

      {/* Suelo y grid — solo en modo normal */}
      {!transparent && (
        <>
          <Grid
            position={[0, 0, 0]}
            args={[30, 30]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#B0A898"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#8A8070"
            fadeDistance={20}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.001, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="#D4CEC6" roughness={0.9} metalness={0} />
          </mesh>
        </>
      )}

      <PergolaModel config={config} />

      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={3}
        maxDistance={20}
        target={[0, 1.5, 0]}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
