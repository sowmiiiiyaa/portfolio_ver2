/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        midnight: {
          900: '#0b0b0f',
          850: '#101116',
          800: '#15171d',
          700: '#20242b',
        },
        electric: '#c8ff4d',
        cyanGlow: '#dfff94',
        softPurple: '#7ee787',
        glass: 'rgba(18, 20, 24, 0.78)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(200, 255, 77, 0.25), 0 24px 80px rgba(0, 0, 0, 0.45)',
        softGlow: '0 0 24px rgba(200, 255, 77, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(200, 255, 77, 0.16), transparent 35%), radial-gradient(circle at 20% 20%, rgba(126, 231, 135, 0.1), transparent 22%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(0.98)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
      animation: {
        floaty: 'floaty 12s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};