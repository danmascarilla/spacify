// Layout para la ruta /demo: bloquea el scroll para que el canvas ocupe
// exactamente el viewport sin desplazamiento indeseado.
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
      {children}
    </div>
  )
}
