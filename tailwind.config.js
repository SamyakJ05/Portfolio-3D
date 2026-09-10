/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080c10',
          card: '#0f172a',
          surface: '#131d31',
          border: '#1e293b',
          teal: '#4f98a3',
          cyan: '#00f0ff',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          emerald: '#10b981',
          neon: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'Cabinet Grotesk', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(79, 152, 163, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.8))' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
