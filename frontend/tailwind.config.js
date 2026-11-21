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
        bg: {
          primary: '#080B10',
          sidebar: '#0A0E14',
          secondary: '#0D121A',
          card: '#111923',
          elevated: '#16202C',
        },
        border: {
          subtle: '#1C2633',
          DEFAULT: '#202B38',
          accent: '#2D3D52',
        },
        text: {
          primary: '#E8EDF5',
          secondary: '#8492A6',
          muted: '#526071',
        },
        teal: {
          accent: '#35D6C5',
          glow: 'rgba(53, 214, 197, 0.15)',
        },
        ai: {
          intelligence: '#8B7CFF',
          glow: 'rgba(139, 124, 255, 0.18)',
        },
        status: {
          healthy: '#35C98A',
          warning: '#F5B942',
          critical: '#FF5263',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'panel': '0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(32, 43, 56, 0.5)',
        'glow-teal': '0 0 20px -4px rgba(53, 214, 197, 0.3)',
        'glow-ai': '0 0 24px -4px rgba(139, 124, 255, 0.35)',
        'glow-critical': '0 0 20px -4px rgba(255, 82, 99, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
