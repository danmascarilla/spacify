type LogoSize = 'sm' | 'md' | 'lg'
type LogoVariant = 'dark' | 'light'

interface SpacifyLogoProps {
  size?: LogoSize
  variant?: LogoVariant
}

const SIZE_MAP: Record<LogoSize, { mark: number; text: string; gap: string }> = {
  sm: { mark: 28, text: 'text-base',  gap: 'gap-2'   },
  md: { mark: 36, text: 'text-xl',    gap: 'gap-2.5' },
  lg: { mark: 48, text: 'text-2xl',   gap: 'gap-3'   },
}

export default function SpacifyLogo({ size = 'md', variant = 'dark' }: SpacifyLogoProps) {
  const { mark, text, gap } = SIZE_MAP[size]
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900'

  return (
    <div className={`flex items-center ${gap} select-none`}>
      {/* SVG mark — isometric 3D box */}
      <svg
        width={mark}
        height={Math.round(mark * 34 / 40)}
        viewBox="0 0 40 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top face — lightest */}
        <path d="M20 2 L36 11 L20 20 L4 11 Z" fill="#0F172A" />
        {/* Right face — medium */}
        <path d="M36 11 L36 25 L20 34 L20 20 Z" fill="#1E293B" />
        {/* Left face — darkest */}
        <path d="M4 11 L4 25 L20 34 L20 20 Z" fill="#334155" />
        {/* Edge highlights for depth */}
        <path d="M20 2 L36 11" stroke="#475569" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M20 2 L4 11"  stroke="#475569" strokeWidth="0.5" strokeLinecap="round" />
      </svg>

      {/* Logotype */}
      <span className={`font-bold tracking-tight leading-none ${text} ${textColor}`}>
        Spacify
      </span>
    </div>
  )
}
