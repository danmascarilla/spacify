import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores de acabado de la pérgola
        finish: {
          white: '#F5F5F5',
          anthracite: '#3D3D3D',
          sand: '#C4A882',
          bronze: '#6B4C2A',
        },
      },
    },
  },
  plugins: [],
}

export default config
