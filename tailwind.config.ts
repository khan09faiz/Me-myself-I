import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        background: '#0A0E27',
        foreground: '#E4E4E7',
        card: '#0F1629',
        muted: {
          DEFAULT: '#71717A',
          foreground: '#A1A1AA',
        },
      },
    },
  },
  plugins: [],
}

export default config
